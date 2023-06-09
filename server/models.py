from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-posts', '-communities', '-_password_hash', '-communities_created', '-comments')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    dob = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    cover_picture = db.Column(db.String)
    bio = db.Column(db.String)

    posts = db.relationship('Post', backref='user', cascade='all, delete-orphan')
    communities = association_proxy('posts', 'community')
    communities_created = db.relationship('Community', backref='creator', cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='user', cascade='all, delete')

    @validates('username')
    def validate_username(self, key, value):
        existing_user = User.query.filter(User.username == value).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError('Username is already taken.')
        return value

    @property
    def num_posts(self):
        return len(self.posts)
    
    @property
    def num_communities_created(self):
        return len(self.communities_created)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )

    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    serialize_rules = ('-users', '-communities', '-comments')

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    caption = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'))

    comments = db.relationship('Comment', backref='post', cascade='all, delete')


class Community(db.Model, SerializerMixin):
    __tablename__ = 'communities'

    serialize_rules = ('-users', '-posts')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    video_game = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    posts = db.relationship('Post', backref='community', cascade='all, delete')
    users = association_proxy('posts', 'user')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = ('-user_id', '-post_id', '-users.comments', '-users.posts', '-users.communities')

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

class ChatMessage(db.Model, SerializerMixin):
    __tablename__ = 'chat_messages'

    serialize_rules = ('-user', '-community')

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    date_sent = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'), nullable=False)

    user = db.relationship('User', backref='chat_messages')
    community = db.relationship('Community', backref='chat_messages')

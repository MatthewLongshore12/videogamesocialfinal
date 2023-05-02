from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-posts', 'communities', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    # Create validations so someone can't have the same username!
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    # password_confirmation = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    # Create validations so someone has to be 18 years or older!
    dob = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String, nullable=False)

    posts = db.relationship('Post', backref='user')
    communities = association_proxy('posts', 'community')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
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

    serialize_rules = ('-users', '-communities')

    id = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String)
    caption = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey('communities.id'))
    

class Community(db.Model, SerializerMixin):
    __tablename__ = 'communities'

    serialize_rules = ('-users', '-posts')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    video_game = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    posts = db.relationship('Post', backref='community')
    users = association_proxy('Post', 'user')
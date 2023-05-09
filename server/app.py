from flask import Flask, make_response, jsonify, request, session, flash
from flask_restful import Resource, Api
from sqlalchemy.exc import IntegrityError
from flask_migrate import Migrate


from config import app, db, api, bcrypt
from models import User, Community, Post, Comment

# app.secret_key = '\xe5\xa6\x95_\xefg\x1f\x9db`\x1a\x97FN\x87\x8a\xb3<j\xd9B4\xe7'

# secret_key = app.secret_key

# print(f"My app's secret key is: {secret_key}")

class Home(Resource):
    def get(self):
            return 'HomePage'
    
    
class SignUp(Resource):
    def post(self):

        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        dob = request.json['dob']
        profile_picture = request.json['profile_picture']
        cover_picture = request.json['cover_picture']
        bio = request.json['bio']

        user_exists = User.query.filter(User.username == username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(
            username=username,
            email=email,
            _password_hash=hashed_password,
            first_name=first_name,
            last_name=last_name,
            dob=dob,
            profile_picture=profile_picture,
            cover_picture=cover_picture,
            bio=bio
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict()

class Login(Resource):
    def post(self):

        email = request.get_json()['email']
        password = request.get_json()['password']
        user = User.query.filter_by(email = email).first()
        
        if user.authenticate(password) == True:
            session['user_id'] = user.id
            return user.to_dict()

        elif user is None:
            return {'error': 'Invalid email or password'}, 401

        else:
            return {'error', 'Invalid email or password'}, 401

    
class Logout(Resource):
   def delete(self):
        session['user_id'] = None
        return {}, 204

class CheckSession(Resource):

    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return make_response(user.to_dict(), 200)
        else:
            return {'message': '401: Not Authorized'}, 401
    
class Users(Resource):
    def get(self):
        return make_response([u.to_dict() for u in User.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_User = User(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            dob=data['dob'],
            profile_picture=data['profile_picture']
        )
        db.session.add(new_User)
        db.session.commit()
        return {'message': '201, a new user has been added!'}, 201

class UserByID(Resource):
    def get(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404

        return make_response((User.query.filter(User.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404

        data = request.get_json()
        user = User.query.filter(User.id==id).first()
        for key in data.keys():
            setattr(user, key , data[key])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)

    def delete(self, id):
        if id not in [u.id for u in User.query.all()]:
            return {'error': '404, User not Found!'}, 404
        try:
            # maybe add if you want to delete the users communities upon deletion of the user
            # db.session.query(Community).filter(Community.user_id == id).delete()
            user = User.query.filter(User.id==id).first()
            db.session.delete(user)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The user has been deleted'}, 200)

@app.route('/users/<int:id>/posts')
def get_posts_for_users(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404
    posts = user.posts
    return jsonify({'posts': [post.to_dict() for post in posts]})

@app.route('/users/<int:id>/communities')
def get_comms_for_users(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404
    communities = user.communities
    return jsonify({'communities': [community.to_dict() for community in communities]})


class Communities(Resource):
    def get(self):
        return make_response([c.to_dict() for c in Community.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_community = Community(
            name=data['name'],
            description=data['description'],
            video_game=data['video_game'],
            image=data['image'],
            creator_id=data['creator_id']
        )
        db.session.add(new_community)
        db.session.commit()
        return {'message': '201, a new community has been added!'}, 201

class CommunityByID(Resource):
    def get(self, id):
        if id not in [c.id for c in Community.query.all()]:
            return {'error': '404, Community not Found!'}, 404

        return make_response((Community.query.filter(Community.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [c.id for c in Community.query.all()]:
            return {'error': '404, Community not Found!'}, 404

        data = request.get_json()
        community = Community.query.filter(Community.id==id).first()
        for key in data.keys():
            setattr(community, key , data[key])
        db.session.add(community)
        db.session.commit()
        return make_response(community.to_dict(), 200)

    def delete(self, id):
        if id not in [c.id for c in Community.query.all()]:
            return {'error': '404, Community not Found!'}, 404
        try:
            community = Community.query.filter(Community.id==id).first()
            db.session.delete(community)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The community has been deleted'}, 200)
    
@app.route('/communities/<int:comm_id>/users')
def get_community_users(comm_id):
    users = User.query \
        .join(Post, User.id == Post.user_id) \
        .filter(Post.community_id == comm_id) \
        .with_entities(User.username, User.id) \
        .distinct() \
        .all()

    users_data = [{'id': user.id, 'username': user.username} for user in users]

    return jsonify(users_data)

@app.route('/communities/<int:id>/posts')
def get_posts_for_community(id):
    community = Community.query.filter_by(id=id).first()
    if not community:
        return jsonify({'error': 'Community not found.'}), 404
    posts = community.posts
    return jsonify({'posts': [post.to_dict() for post in posts]})
    


class Posts(Resource):
    def get(self):
        return make_response([p.to_dict() for p in Post.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_post = Post(
            image=data['image'],
            caption=data['caption'],
            user_id=data['user_id'],
            community_id=data['community_id']
        )
        db.session.add(new_post)
        db.session.commit()
        return {'message': '201, a new post has been added!'}, 201

class PostByID(Resource):
    def get(self, id):
        if id not in [p.id for p in Post.query.all()]:
            return {'error': '404, Post not Found!'}, 404

        return make_response((Post.query.filter(Post.id==id).first()).to_dict(), 200)

    def patch(self, id):
        if id not in [p.id for p in Post.query.all()]:
            return {'error': '404, Post not Found!'}, 404

        data = request.get_json()
        post = Post.query.filter(Post.id==id).first()
        for key in data.keys():
            setattr(post, key , data[key])
        db.session.add(post)
        db.session.commit()
        return make_response(post.to_dict(), 200)

    def delete(self, id):
        if id not in [p.id for p in Post.query.all()]:
            return {'error': '404, Post not Found!'}, 404
        try:
            post = Post.query.filter(Post.id==id).first()
            db.session.delete(post)
            db.session.commit()
        except:
            db.session.rollback()

        return make_response({'message': 'The post has been deleted'}, 200)
    
class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        return make_response({'comments': [c.to_dict() for c in comments]}, 200)
    
    def post(self): 
        data = request.get_json()
        try: 
            id = session['user_id']

        except KeyError:
            return make_response({'error': 'log in '})

        try:
            new_comment = Comment(
                body=data['body'],
                user_id=id,
                post_id=data['post_id'],
            )
        except ValueError: 
            return make_response({'error': '400: Validation error. Please actually insert a comment'})
        
        db.session.add(new_comment)
        db.session.commit()

        return make_response(new_comment.to_dict(), 200)
    
class CommentsById(Resource):
    def get(self, comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            return make_response(comment.to_dict(), 200)
        else:
            return make_response({'error': 'Comment not found'}, 404)

    def patch(self, comment_id):
        data = request.get_json()
        comment = Comment.query.get(comment_id)
        if not comment:
            return make_response({'error': 'Comment not found'}, 404)
        try:
            if 'body' in data:
                comment.body = data['body']
            db.session.commit()
            return make_response(comment.to_dict(), 200)
        except ValueError:
            return make_response({'error': '400: Validation error. Please actually insert a comment'})

    def delete(self, comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            db.session.delete(comment)
            db.session.commit()
            return make_response({'message': 'Comment successfully deleted'}, 200)
        else:
            return make_response({'error': 'Comment not found'}, 404)
        
@app.route('/posts/<int:post_id>/comments')
def get_post_comments(post_id):
    post = Post.query.get_or_404(post_id)
    comments = Comment.query.filter_by(post=post).all()
    return jsonify([comment.to_dict() for comment in comments])





        
api.add_resource(Comments, '/comments', endpoint='comments')
api.add_resource(CommentsById, '/comments/<int:comment_id>')
api.add_resource(Home, '/')
api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Communities, '/communities')
api.add_resource(CommunityByID, '/communities/<int:id>')
api.add_resource(Posts, '/posts')
api.add_resource(PostByID, '/posts/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
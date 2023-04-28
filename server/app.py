from flask import Flask, make_response, jsonify, request, session, flash
from flask_restful import Resource, Api
from sqlalchemy.exc import IntegrityError
from flask_migrate import Migrate


from config import app, db, api, bcrypt
from models import User, Community, Post

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


        user = User(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            dob=dob
        )

        user.password_hash = password

        print('first')

        try:
            print('here!')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())
            return user.to_dict(), 201

        except IntegrityError:
            print('not, here!')
            return {'error': '422 Unprocessable Entity'}, 422

class Login(Resource):
    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

    
class Logout(Resource):
    def delete(self):
        # Check if the user is logged in
        if 'user_id' not in session:
            return {'message': 'You are not logged in'}, 401

        # Get the user
        user = User.query.filter(User.id == session['user_id']).first()

        # Check if the user exists
        if not user:
            return {'message': 'User not found'}, 404

        # Delete the user
        db.session.delete(user)
        db.session.commit()

        # Clear the session
        session.clear()

        return {'message': 'User deleted successfully'}, 200

class CheckSession(Resource):

    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return make_response(user.to_dict(), 200)
        else:
            return {'message': '401: Not Authorized'}, 401

class ClearSession(Resource):

    def delete(self):

        session['page_views'] = None
        session['user_id'] = None

        return {}, 204
    
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


class Communities(Resource):
    def get(self):
        return make_response([c.to_dict() for c in Community.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_community = Community(
            name=data['name'],
            description=data['description'],
            video_game=data['video_game']
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
    


class Posts(Resource):
    def get(self):
        return make_response([p.to_dict() for p in Post.query.all()], 200)

    def post(self):
        data = request.get_json()
        new_post = Post(
            name=data['name'],
            description=data['description'],
            video_game=data['video_game']
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




        
api.add_resource(Home, '/')
api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')
api.add_resource(Communities, '/communities')
api.add_resource(CommunityByID, '/communities/<int:id>')
api.add_resource(Posts, '/posts')
api.add_resource(PostByID, '/posts/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
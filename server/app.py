from flask import Flask, make_response, jsonify, request, session, flash
from flask_restful import Resource, Api
from sqlalchemy.exc import IntegrityError
from flask_migrate import Migrate


from config import app, db, api, bcrypt
from models import User

class Home(Resource):
    def get(self):
            return 'HomePage'
    
    
class SignUp(Resource):
    def post(self):
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        password_confirmation = request.json['password_confirmation']
        firstname = request.json['first_name']
        lastname = request.json['last_name']
        dob = request.json['dob']

        user_exists = User.query.filter(User.username == username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        hashed_password_confirmation = bcrypt.generate_password_hash(password_confirmation)
        new_user = User(
            username=username,
            email=email,
            _password_hash=hashed_password,
            password_confirmation = hashed_password_confirmation,
            first_name=firstname,
            last_name=lastname,
            dob=dob
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email
        })

class Login(Resource):

    def post(self):

        email = request.get_json().get('email')
        password = request.get_json().get('password')
        user = User.query.filter(User.email == email).first()

        # password = request.get_json()['password']

        # if user.authenticate(password):
        if user is None:
            return {'error': 'Invalid email or password'}, 401
        if not bcrypt.check_password_hash(user._password_hash, password):
            return {'error': 'Invalid email or password'}, 401

        flash("Login Successful!")
        session.permanent = True
        session['user_id'] = user.id
        return jsonify({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name
        })
    
class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return session.get('user_id')

class CheckSession(Resource):

    def get(self):

        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return {}, 401

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
            return {'error': '404, Fan not Found!'}, 404

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




        
api.add_resource(Home, '/')
api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(ClearSession, '/clear', endpoint='clear')
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
from flask import Flask, request, jsonify
from werkzeug.security import check_password_hash
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

MONGO_URI = 'mongodb://localhost:27017/movie'  

client = MongoClient(MONGO_URI)
db = client.movie 
users_collection = db.connect  


def Signin_method():
    username = request.args.get('username')
    password = request.args.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    user = users_collection.find_one({"username": username})
    if user['username']==username and user['password']==password:
        return jsonify({"message":"login Valid"}),200
    else:
        return jsonify({"message":"login Invalid"}),401
    # if user and check_password_hash(user['password'], password):
    #     return jsonify({'message': 'Login successful',"username":username,"password":password,"username":user['username'],"password":user['password']}), 200
    # else:
    #     return jsonify({'message': 'Invalid username or password',"username":username,"password":password,"username":user['username'],"password":user['password'],}), 401


if __name__ == '__main__':
    app.run(debug=True, port=5000)

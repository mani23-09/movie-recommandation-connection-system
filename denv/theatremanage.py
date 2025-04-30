from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017")
db = client.movie
collection = db.connect

def Add_Theatre_admin():
    username = request.args.get("username")
    password = request.args.get("password")
    email = request.args.get("email")
    mobile = request.args.get("mobile")
    theatrename = request.args.get("theatre")
    role = "Theatre Admin"
    imgurl = f"https://api.dicebear.com/7.x/fun-emoji/svg?seed={username}"

    # Check if all required fields are provided
    if not all([username, password, email, mobile, theatrename]):
        return jsonify({"message": "All fields (username, password, email, mobile, theatre) are required"}), 400

    data = {
        "username": username,
        "password": password,
        "email": email,
        "mobile": mobile,
        "role": role,
        "avatar": imgurl,
        "theatre": theatrename,
    }

    # Check if the user already exists
    check1 = collection.find_one({"username": username, "role": role})
    check2 = collection.find_one({"theatre":theatrename})
    if not check1 and not check2:
        result = collection.insert_one(data)
        return jsonify({"message": "Successfully added Theatre Admin"}), 201
    else:
        return jsonify({"message": "Theatre Admin with this username already exists"}), 409


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

uri = "mongodb://localhost:27017"
client = MongoClient(uri)
db = client.movie
collect = db.connect

def SignupMethod():
    user = request.args.get("username")
    passw = request.args.get("password")
    email = request.args.get("email")
    mobile = request.args.get("mobile")
    role = request.args.get("role")
    
    if not user or not passw or not email or not mobile or not role:
        return jsonify({"message": "All fields are required!"}), 400

    existing_user = collect.find_one({"username": user, "role": role})
    
    if existing_user:
        if existing_user.get("role") != role:
            return jsonify({"message": f"Username '{user}' is already taken by a different role. Please select a different role!"}), 400
        else:
            return jsonify({"message": f"Username '{user}' already exists with role '{role}'!"}), 400

    
    avatar_url = f"https://api.dicebear.com/7.x/fun-emoji/svg?seed={user}"

    # Document to insert
    data = {
        "username": user,
        "password": passw,
        "email": email,
        "mobile": mobile,
        "role": role,
        "selmovies": [],
        "avatar": avatar_url  # 🐶 Avatar URL added here
    }

    try:
        user_inserted = collect.insert_one(data)
        if user_inserted:
            return jsonify({"message": "Signup successful!"}), 201
        else:
            return jsonify({"message": "Signup failed, please try again."}), 500
    except Exception as e:
        return jsonify({"message": "An error occurred: " + str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

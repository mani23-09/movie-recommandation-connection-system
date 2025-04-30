from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

uri = "mongodb://localhost:27017"
client = MongoClient(uri)
db = client.movie
collect = db.connect

def SelMovies():
    movie = request.args.get("movie")
    user = request.args.get("user")
    role = request.args.get("role")
    
    if not user or not role or not movie:
        return jsonify({"message": "All fields are required!"}), 400
    
    query = {"username": user, "role": role}
    existing_user = collect.find_one(query)
    
    if existing_user:
        selmovies = existing_user.get("selmovies", [])
        if movie in selmovies:
            return jsonify({"message": "Movie already added"})
        selmovies.append(movie)
        
        if len(selmovies) >20 :
            return jsonify({"message": "your count reached"})
        selmovies = list(set(selmovies))  

        update_result = collect.update_one(
            {"_id": existing_user["_id"]},
            {"$set": {"selmovies": selmovies}}
        )

        if update_result.modified_count > 0:
            return jsonify({"message": "Movie added successfully."})
        else:
            return jsonify({"message": "Movie already selected or update failed."})
    else:
        return jsonify({"message": "User does not exist."}), 404

from flask import request, jsonify

def Get_user_movies():
    user = request.args.get("user")
    role = request.args.get("role")

    if not user or not role:
        return jsonify({"message": "Both 'user' and 'role' fields are required!"}), 400

    query = {"username": user, "role": role}
    existing_user = collect.find_one(query)

    if existing_user:
        return jsonify({"message": existing_user.get("selmovies", [])})
    else:
        return jsonify({"message": "User does not exist."}), 404



def Pop_user_movies():
    movie = request.args.get("movie")
    user = request.args.get("user")
    role = request.args.get("role")
    
    if not user or not role or not movie:
        return jsonify({"message": "All fields are required!"}), 400
    
    query = {"username": user, "role": role}
    existing_user = collect.find_one(query)
    
    if existing_user:
        selmovies = existing_user.get("selmovies", [])
        if movie not in selmovies:
            return jsonify({"message": "Movie does not"})
        selmovies.remove(movie)
        
        if len(selmovies) < 0 :
            return jsonify({"message": "its empty"})
        selmovies = list(set(selmovies))  

        update_result = collect.update_one(
            {"_id": existing_user["_id"]},
            {"$set": {"selmovies": selmovies}}
        )

        if update_result.modified_count > 0:
            return jsonify({"message": "Movie deleted successfully."})
        else:
            return jsonify({"message": "Movie already deleted or update failed."})
    else:
        return jsonify({"message": "User does not exist."}), 404

if __name__ == '__main__':
    app.run(debug=True)

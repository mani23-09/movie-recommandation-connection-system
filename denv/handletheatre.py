from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)


client = MongoClient("mongodb://localhost:27017/")
db = client.movie
collection = db.connect

def Add_movie_t2():
    username = request.args.get("user")

    user = collection.find_one({"username": username, "role": "Theatre Admin"})

    if not user:
        return jsonify({"error": "User not found"}), 404

    the = user.get("theatre")
    if not the:
        return jsonify({"error": "Theatre info not found for user"}), 400

    collect2 = db[the]

    movie_title = request.args.get('movie_title')
    if not movie_title:
        return jsonify({"error": "Missing movie_title parameter"}), 400

    existing_movie = collect2.find_one({"movie_title": movie_title})
    if existing_movie:
        return jsonify({"error": "Movie already exists"}), 409

    try:
        movie_data = {
            "movie_title": movie_title,
            "movie_info": request.args.get('movie_info'),
            "critics_consensus": request.args.get('critics_consensus'),
            "grade": request.args.get('grade'),
            "mood": request.args.get('mood'),
            "genre": request.args.get('genre'),
            "directors": request.args.get('directors'),
            "writers": request.args.get('writers'),
            "cast": request.args.get('cast'),
            "in_theaters_date": request.args.get('in_theaters_date'),
            "on_streaming_date": request.args.get('on_streaming_date'),
            "runtime_in_minutes": int(request.args.get('runtime_in_minutes', 0)),
            "studio_name": request.args.get('studio_name'),
            "tomatometer_status": request.args.get('tomatometer_status'),
            "tomatometer_rating": int(request.args.get('tomatometer_rating', 0)),
            "tomatometer_count": int(request.args.get('tomatometer_count', 0)),
            "audience_rating": int(request.args.get('audience_rating', 0))
        }

        collect2.insert_one(movie_data)
        return jsonify({"message": "Movie inserted successfully!"}), 201

    except Exception as e:
        return jsonify({"error": f"Error inserting movie: {str(e)}"}), 500
def return_movie2():

    username = request.args.get("user")

    user = collection.find_one({"username": username, "role": "Theatre Admin"})

    if not user:
        return jsonify({"error": "User not found"}), 404

    the = user.get("theatre")
    if not the:
        return jsonify({"error": "Theatre info not found for user"}), 400

    collect2 = db[the]

    movie = request.args.get('movie')
    if not movie:
        return jsonify({"error": "Missing movie_title parameter"}), 400

    res = collect2.find_one({"movie_title": movie})

    if res:
        del res["_id"]
        return jsonify({"message": res}), 200
    else:
        return jsonify({"error": "Movie not found"}), 404
    
def Data_list_movie2():
    username = request.args.get("user")

    user = collection.find_one({"username": username, "role": "Theatre Admin"})

    if not user:
        return jsonify({"error": "User not found"}), 404

    the = user.get("theatre")
    if not the:
        return jsonify({"error": "Theatre info not found for user"}), 400

    collect2 = db[the]
    results = [doc["movie_title"] for doc in collect2.find()]
    return jsonify({"message": results})

def Update_movie_t2():
    username = request.args.get("user")
    title = request.args.get("movie_title")
    role = request.args.get("role")

    user = collection.find_one({"username": username, "role": role})

    if not user:
        return jsonify({"error": "User not found"}), 404

    the = user.get("theatre")
    if not the:
        return jsonify({"error": "Theatre info not found for user"}), 400

    collect2 = db[the]

    try:
        movie_data = {
            "movie_info": request.args.get('movie_info'),
            "critics_consensus": request.args.get('critics_consensus'),
            "grade": request.args.get('grade'),
            "mood": request.args.get('mood'),
            "genre": request.args.get('genre'),
            "directors": request.args.get('directors'),
            "writers": request.args.get('writers'),
            "cast": request.args.get('cast'),
            "in_theaters_date": request.args.get('in_theaters_date'),
            "on_streaming_date": request.args.get('on_streaming_date'),
            "runtime_in_minutes": int(request.args.get('runtime_in_minutes')),
            "studio_name": request.args.get('studio_name'),
            "tomatometer_status": request.args.get('tomatometer_status'),
            "tomatometer_rating": int(request.args.get('tomatometer_rating')),
            "tomatometer_count": int(request.args.get('tomatometer_count')),
            "audience_rating": int(request.args.get('audience_rating'))
        }
    except (ValueError, TypeError):
        return jsonify({"message": "Invalid or missing numeric fields"}), 400

    result = collect2.update_one(
        {"movie_title": title},
        {"$set": movie_data}
    )

    if result.matched_count == 0:
        return jsonify({"message": "Movie not found"}), 404
    if result.modified_count> 0:
        return jsonify({"message": "Movie updated successfully!"})
    else:
        return jsonify({"message": "Movie updated unsuccessfully!"}), 200
    
def Delete_movie_t2():
    username = request.args.get("user")
    title = request.args.get("movie_title")

    user = collection.find_one({"username": username, "role": "Theatre Admin"})

    if not user:
        return jsonify({"error": "User not found"}), 404

    the = user.get("theatre")
    if not the:
        return jsonify({"error": "Theatre info not found for user"}), 400

    collect2 = db[the]
    result = collect2.delete_one({"movie_title": request.args.get("title")})
    if result.deleted_count > 0:
        return jsonify({"message": "Successfully deleted"}), 200
    else:
        return jsonify({"message": "Unsuccessful delete"}), 404  # dynamically access the collection by name

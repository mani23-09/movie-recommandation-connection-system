from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client.movie
collection = db.cinema

@app.route('/add-movie', methods=['GET'])
def Add_movie():
    movie_title = request.args.get('movie_title')
    existing_movie = collection.find_one({"movie_title": movie_title})

    if existing_movie:
        return jsonify({"message": "Movie with this title already exists!"}), 409

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
        "runtime_in_minutes": int(request.args.get('runtime_in_minutes')),
        "studio_name": request.args.get('studio_name'),
        "tomatometer_status": request.args.get('tomatometer_status'),
        "tomatometer_rating": int(request.args.get('tomatometer_rating')),
        "tomatometer_count": int(request.args.get('tomatometer_count')),
        "audience_rating": int(request.args.get('audience_rating'))
    }

    collection.insert_one(movie_data)
    return jsonify({"message": "Movie inserted successfully!"}), 200

def Data_list_movie():
    results = [doc["movie_title"] for doc in collection.find()]
    return jsonify({"message": results})


@app.route('/titless', methods=['GET'])
def Data_list_movie2():
    
    results = [doc["movie_title"] for doc in collection.find()]
    return jsonify({"message": results})

@app.route('/delmov', methods=['GET'])
def del_movi():
    title = request.args.get("title")
    result = collection.delete_one({"movie_title": title})
    if result.deleted_count > 0:
        return jsonify({"message": "Successfully deleted"}), 200
    else:
        return jsonify({"message": "Unsuccessful delete"}), 404

@app.route('/returnmovie', methods=['GET'])
def return_movie():
    title = request.args.get("movie")
    movie = collection.find_one({"movie_title": title}, {"_id": 0})
    if movie:
        return jsonify({"message": movie}), 200
    else:
        return jsonify({"message": "Movie not found"}), 404

def update_movie():
    title = request.args.get("movie_title")
    if not title:
        return jsonify({"message": "movie_title is required for update"}), 400

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

    result = collection.update_one(
        {"movie_title": title},
        {"$set": movie_data}
    )

    if result.matched_count == 0:
        return jsonify({"message": "Movie not found"}), 404
    return jsonify({"message": "Movie updated successfully!"}), 200


if __name__ == '__main__':
    app.run(debug=True)

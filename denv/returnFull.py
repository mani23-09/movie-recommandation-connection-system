from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
CORS(app)

uri = "mongodb://localhost:27017"
client = MongoClient(uri)
db = client.movie
collect = db.cinema

@app.route('/movie', methods=['GET'])
def return_movie():
    movie = request.args.get("movie")
    if not movie:
        return jsonify({"error": "No movie title provided"}), 400

    res = collect.find_one({"movie_title": movie})
    if res:
        res['_id'] = str(res['_id'])
        return jsonify({"message": res}), 200
    else:
        return jsonify({"error": "Movie not found"}), 404
def return_movie2():
    movie = request.args.get("movie")
    if not movie:
        return jsonify({"error": "No movie title provided"}), 400

    res = collect.find_one({"movie_title": movie})
    if res:
        res['_id'] = str(res['_id'])
        return jsonify({"message": res}), 200
    else:
        return jsonify({"error": "Movie not found"}), 404
if __name__ == '__main__':
    app.run(debug=True)
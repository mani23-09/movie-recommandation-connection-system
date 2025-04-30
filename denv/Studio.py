from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Change this if using a different host/port
db = client['movie']  # Database name
movies_collection = db['cinema']  # Collection name

def get_movies_by_studio():
    studio_name = request.args.get('studioname')
    if not studio_name:
        return jsonify({"error": "Studio name is required"}), 400

    movies = list(movies_collection.find({"studio_name": studio_name}, {"_id": 0}).limit(25))

    if movies:
        return jsonify(movies), 200
    else:
        return jsonify({"message": "No movies found for this studio"}), 404



if __name__ == '__main__':
    app.run(debug=True)
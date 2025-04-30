from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/movie"  # Connect to "movie" database
mongo = PyMongo(app)

def get_studios():
    pipeline = [
        {"$match": {"studio_name": {"$ne": None}}},  # Exclude null or missing values
        {"$group": {"_id": "$studio_name", "count": {"$sum": 1}}},  # Count movies per studio
        {"$sort": {"count": -1}}, 
        {"$limit": 10}  
    ]
    
    data = mongo.db.cinema.aggregate(pipeline)
    result = [{"studio": studio["_id"], "count": studio["count"]} for studio in data]
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

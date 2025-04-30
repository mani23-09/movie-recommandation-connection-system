from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS
CORS(app)

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/movie"  # Connect to "movie" database
mongo = PyMongo(app)

def get_movies():
    # Define your filters
    query = {}
    
    # Get genre from query parameters
    genre_filter = request.args.get('genre')
    genres_to_check = []
    
    if genre_filter:
        # Split the genre string by commas while keeping spaces around multi-word genres
        genres_to_check = [genre.strip() for genre in genre_filter.split(',')]
        
        # Check the genres from the database to see if they are valid
        distinct_genres = mongo.db.cinema.distinct('genre')
        
        # Filter out invalid genres (those not present in the database)
        genres_to_check = [genre for genre in genres_to_check if genre in distinct_genres]
        
        if genres_to_check:
            # Apply the genre filter, if any valid genres are found
            query['genre'] = {"$in": genres_to_check}
    
    # Additional filters
    query['grade'] = request.args.get('grade')
    query['mood'] = request.args.get('mood')
    
    studio_name_filter = request.args.get('studio_name')
    cast_filter = request.args.get('cast')

    # Build the query dynamically based on provided filters
    if studio_name_filter:
        query["studio_name"] = {"$regex": studio_name_filter, "$options": "i"}
    if cast_filter:
        query["cast"] = {"$regex": cast_filter, "$options": "i"}

    # Fetch data from MongoDB based on the query
    data = mongo.db.cinema.find(query).limit(20)  # Limit to 3 results
    result = []

    for movie in data:
        movie['_id'] = str(movie['_id'])  # Convert ObjectId to string
        result.append({
            "movie_title": movie.get("movie_title"),
            "movie_info": movie.get("movie_info"),
            "critics_consensus": movie.get("critics_consensus"),
            "grade": movie.get("grade"),
            "mood": movie.get("mood"),
            "genre": movie.get("genre"),
            "directors": movie.get("directors"),
            "writers": movie.get("writers"),
            "cast": movie.get("cast"),
            "in_theaters_date": movie.get("in_theaters_date"),
            "on_streaming_date": movie.get("on_streaming_date"),
            "runtime_in_minutes": movie.get("runtime_in_minutes"),
            "studio_name": movie.get("studio_name"),
            "tomatometer_status": movie.get("tomatometer_status"),
            "tomatometer_rating": movie.get("tomatometer_rating"),
            "tomatometer_count": movie.get("tomatometer_count"),
            "audience_rating": movie.get("audience_rating"),
        })

    return jsonify(result)

@app.route('/recommended', methods=['GET'])
def recommended_movies():
    return get_movies()

if __name__ == '__main__':
    app.run(debug=True)

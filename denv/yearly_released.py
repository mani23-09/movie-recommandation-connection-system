from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/') 
db = client['movie'] 
movies_collection = db['cinema'] 
def get_movies_by_year():
   
    t_date = request.args.get('t_date')
    if not t_date:
        return jsonify({"error": "Year (t_date) is required"}), 400
    
    try:
        
        t_date = int(t_date)
    except ValueError:
        return jsonify({"error": "Invalid year format"}), 400

    
    movies = list(movies_collection.find(
        {
            "in_theaters_date": {
                "$regex": f"^{str(t_date)}",  
                "$options": "i" 
            }
        },
        {"_id": 0}  
    ).sort("in_theaters_date", -1))  

    if movies:
        return jsonify(movies), 200
    else:
        return jsonify({"message": f"No movies found for the year {t_date}"}), 404


if __name__ == '__main__':
    app.run(debug=True)

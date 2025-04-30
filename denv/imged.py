from flask import Flask, jsonify, request
from scrape1 import fetch_image  # Make sure fetch_image is properly defined in scrape1.py
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
def img_geted():
    # Safely get the movie parameter from the request query string
    movie_name = request.args.get('movie')

    if not movie_name:
        return jsonify({"error": "Please provide a movie name."}), 400

    try:
        # Call the fetch_image function with the movie name
        result = fetch_image(movie_name)

        if not result:
            return jsonify({"error": "No image found for the provided movie."}), 404

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

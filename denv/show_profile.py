from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/youtube-search', methods=['GET'])
def search_youtube():
    query = request.args.get("query")
    results = []

    if not query:
        return jsonify({"error": "Please provide a search query using '?query=your+search+term'"}), 400

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    search_url = f'https://www.youtube.com/results?search_query={query}'
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    for link in soup.select('a.yt-simple-endpoint.style-scope.ytd-video-renderer'):
        title = link.get('title')
        href = link.get('href')
        if title and href and '/watch' in href:
            video_url = 'https://www.youtube.com' + href
            results.append({
                'title': title,
                'url': video_url
            })

    if not results:
        return jsonify({"message": "No videos found for your search."}), 404

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

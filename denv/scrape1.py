import requests
import re

# Function to fetch an image URL based on a search term
def fetch_image(query):
    user_agent = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36'
    }
    # URL to search for images using the query
    url = f"https://www.google.com/search?q={query}+movie&tbm=isch"

    # Send the GET request to the URL
    response = requests.get(url, headers=user_agent, timeout=10)
    response.raise_for_status()  # Ensure the request was successful
    html_content = response.text

    # Regular expression to extract image URLs (JPEG format)
    pattern = r'\[\"(https://.*?\.jpg)\",[0-9]+,[0-9]+\]'
    images = re.findall(pattern, html_content)
    j=0
    for i in images:
        if '.jpg' not in i:
            images.pop(j)
        j+=1
    img=images[0].split("[")
    res_url=img[len(img)-1][1::]
    return {"url":res_url}

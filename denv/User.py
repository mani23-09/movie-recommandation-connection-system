from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId
import base64

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017")
db = client.movie
collect = db.connect

def User():
    usern = request.args.get("usern")

    if not usern:
        return jsonify({"message": "Username not provided."}), 400

    query = {"username": usern}
    is_user = collect.find_one(query)

    if is_user:
        is_user['_id'] = str(is_user['_id'])  # Convert ObjectId to string
        return jsonify({"message": is_user})
    else:
        return jsonify({"message": "User does not exist."}), 404
def Without_User():
    usern = request.args.get("usern")

    if not usern:
        return jsonify({"message": "Username not provided."}), 400

    query = {"username": {"$ne":usern}}
    result = collect.find(query)
    resp=[]
    if result:
        for u in result:
            u["_id"]=str(u['_id'])
            resp.append(u)
        return jsonify({"message": resp})
    else:
        return jsonify({"message": "User does not exist."}), 404

def Update_User():
    usern = request.args.get("usern")
    rolen = request.args.get("rolen")
    uemail=request.args.get("email")
    uphone=request.args.get("phone")
    upassword=request.args.get("Password")
    uimgurl=request.args.get("imgurl")

    is_user=collect.find_one({"username":usern,"role":rolen})
    update_fields={
        "email": uemail,
        "mobile": uphone,
        "password": upassword,
        "avatar":uimgurl,
    }
    result = collect.update_one(
        {"_id": is_user["_id"]},
        {"$set": update_fields}
    )

    if result.modified_count == 1:
        return jsonify({"message": "User updated successfully."})
    else:
        return jsonify({"message": "No changes made."})

    
if __name__ == "__main__":
    app.run(debug=True)

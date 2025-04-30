from flask import Flask
from imged import img_geted  
from returned import get_movies 
from Cast import get_studios
from flask_cors import CORS
from Studio import get_movies_by_studio
from yearly_released import get_movies_by_year
from singin import *
from signup import *
from sel_movies import *
from show_profile import *
from returnFull import *
from User import *
from movimanage import *
from theatremanage import *
from handletheatre import *

app = Flask(__name__)
CORS(app)
@app.route('/hello', methods=['GET'])
def hello():
    return img_geted()

@app.route('/theatreadd', methods=['GET'])
def TheatreAdd():
    return Add_movie_t2()

@app.route('/delmov2', methods=['GET'])
def delmov2():
    return Delete_movie_t2()

@app.route("/addtheatreadmin",methods=["GET"])
def Add_T_admin():
    return Add_Theatre_admin()

@app.route('/returnmovie',methods=['GET'])
def ret_movi():
    return return_movie()

@app.route('/returnmovie2',methods=['GET'])
def ret_movi2():
    return return_movie2()

@app.route('/getstudio', methods=['GET'])
def studioGet():
    return get_movies_by_studio()


@app.route('/recommanded', methods=['GET'])
def hello2():
    return get_movies()


@app.route('/studio', methods=['GET'])
def recommended_casts():
    return get_studios()

@app.route('/signin', methods=['GET'])
def login():
    return Signin_method()

@app.route('/sel_movies', methods=['GET'])
def SelMov():
    return SelMovies()

@app.route('/getusermovi', methods=['GET'])
def GetMov():
    return Get_user_movies()

@app.route('/popedmovi', methods=['GET'])
def PopMov():
    return Pop_user_movies()

@app.route('/year', methods=['GET'])
def recommended_year():
    return get_movies_by_year()   

@app.route('/titles',methods=["GET"])
def data_titles():
    return Data_list_movie()

@app.route('/titless', methods=['GET'])
def data_titles2():
    return Data_list_movie2()
# @app.route('/api/youtube-search', methods=['GET'])
# def Youtube_s():
#     return search_youtube()

@app.route('/user',methods=['GET'])
def User_user():
    return User()


@app.route('/others',methods=['GET'])
def Other_user():
    return Without_User()

@app.route('/update_movie_t',methods=['GET'])
def Upd_mov():
    return Update_movie_t2()


@app.route('/add-movie', methods=['GET'])
def Append_user():
    return Add_movie()


@app.route('/updateMovie', methods=['GET'])
def Updd_user():
    return update_movie()

@app.route("/updateuser", methods=["GET"])
def Up_user():
    return Update_User()


@app.route('/signup',methods=['GET'])
def signup_method():
    return SignupMethod()

if __name__ == '__main__':
    app.run(debug=True)

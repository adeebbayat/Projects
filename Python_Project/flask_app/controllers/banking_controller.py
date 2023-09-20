from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_app.models.banking_model import Login
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/register/user', methods=['POST'])
def register():
    # if not Login.validate_login(request.form):
    #     return redirect('/')
    # # create the hash
    # pw_hash = bcrypt.generate_password_hash(request.form['password'])
    # print(pw_hash)
    # put the pw_hash into the data dictionary
    data = {
        "first_name":request.form['first_name'],
        "last_name":request.form['last_name'],
        "email": request.form['email'],
        "password" : pw_hash
    }
    # Call the save @classmethod on User
    user_id = Login.save(data)
    # store user id into session
    return redirect("/")
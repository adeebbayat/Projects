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
    if not Login.validate_login(request.form):
        return redirect('/')
    # create the hash
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
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

@app.route('/login', methods=['POST'])
def login():
    # see if the username provided exists in the database
    data = { "email" : request.form["email1"] }
    login_in_db = Login.get_by_login(data)
    # user is not registered in the db
    if not login_in_db:
        flash("Invalid Email/Password")
        return redirect("/")
    if not bcrypt.check_password_hash(login_in_db.password, request.form['password1']):
        # if we get False after checking the password
        flash("Invalid Email/Password")
        return redirect('/')
    # if the passwords matched, we set the user_id into session
    # never render on a post!!!
    session['user_id'] = login_in_db.id
    print(session['user_id'])
    return redirect("/success")

@app.route('/success')
def success():
    balance_in_db = Login.get_account_balance(session['user_id'])
    print(balance_in_db)
    return render_template("home_page.html",balance_in_db=balance_in_db)


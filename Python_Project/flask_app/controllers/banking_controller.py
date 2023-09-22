from flask_app import app
from flask import render_template,redirect,request,session,flash
from flask_app.models.banking_model import Login
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
import math
@app.route('/')
def index():
    
    return render_template("index.html")

@app.route('/register/user', methods=['POST'])
def register():
    if not Login.validate_login(request.form):
        return redirect('/')
    # create the hash
    pw_hash = bcrypt.generate_password_hash(request.form['password'])

    # put the pw_hash into the data dictionary
    data = {
        "first_name":request.form['first_name'],
        "last_name":request.form['last_name'],
        "email": request.form['email'],
        "password" : pw_hash
    }
    # Call the save @classmethod on User
    user_id = Login.save(data)
    data = {
        "user_id":user_id
    }
    balance_id = Login.initial_balance(data)

    # balance_id = Login.initial_balance()
    # store user id into session
    return redirect("/")

@app.route('/login', methods=['POST'])
def login():
    # see if the username provided exists in the database
    data = { "email" : request.form["email1"] }
    login_in_db = Login.get_by_login(data)
    session['first_name'] = login_in_db.first_name
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
    return redirect("/homepage")

@app.route('/homepage')
def homepage():
    if session == {}:
        return redirect('/')
    data=  {
        'user_id':session['user_id']
    }
    balance_in_db = Login.get_account_balance(data)

    data = {
        'user_id':session['user_id']
    }
    transact_data = Login.get_transaction_data(data)

    sender_data = Login.get_sender_name(data)
    print(sender_data)
    receiver_data = Login.get_receiver_name(data)
    print(receiver_data)
    return render_template("home_page.html",balance_in_db=balance_in_db,transact_data=transact_data,user_id = session['user_id'],sender_data=sender_data,receiver_data=receiver_data)

@app.route('/transfer')
def transfer():
    if session == {}:
        return redirect('/')
    data = {
        'id': session['user_id']
    }
    all_users = Login.get_all(data)

    return render_template("transfer.html",all_users = all_users)

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/transfer/<int:id>')
def transfer_to(id):
    data = {
        "id":id
    }
    data2 = {
        'user_id':session['user_id']
    }
    sender_balance = Login.get_account_balance(data2)
    session['balance'] = sender_balance[0]['balance']
    data1 = {
        'user_id':id
    }
    receiver_balance = Login.get_account_balance(data1)
    return render_template("transfer_specific.html",data=data,receiver_balance=receiver_balance)

@app.route('/transfer-to/<int:id>',methods = ['POST'])
def transfer_to_function(id):
    
    if not request.form['amount'].isdigit():
        flash("Invalid Entry")
        return redirect(f'/transfer/{id}')
    
    data = {
        'user_id':session['user_id']
    }
    sender_balance = Login.get_account_balance(data)
    
    if int(sender_balance[0]['balance']) < int(request.form['amount']):
        flash("Insufficient Funds")
        return redirect(f'/transfer/{id}')

    data = {
        'user_id':id
    }
    receiver_balance = Login.get_account_balance(data)
    new_receiver_balance = int(receiver_balance[0]['balance']) + int(request.form['amount'])
    data = {
        'user_id':id,
        'balance':new_receiver_balance
    }
    Login.update_balance(data)

    new_sender_balance = int(sender_balance[0]['balance']) - int(request.form['amount'])
    session['balance'] = new_sender_balance
    data = {
        'user_id':session['user_id'],
        'balance':new_sender_balance
    }

    Login.update_balance(data)

    data = {
        'sender_id':session['user_id'],
        'receiver_id':id,
        'amount' : request.form['amount'],
    }
    transaction = Login.record_transaction(data)
    flash(f"${request.form['amount']} succesfully sent")
    return redirect(f'/transfer/{id}')

@app.route('/deposit')
def deposit():
    data = {
        'user_id':session['user_id']
    }
    user_balance = Login.get_account_balance(data)
    print(user_balance)
    new_user_balance = int(user_balance[0]['balance']) + 100
    print(new_user_balance)
    data = {
        'user_id':session['user_id'],
        'balance':new_user_balance
    }
    Login.update_balance(data)

    return redirect('/homepage')


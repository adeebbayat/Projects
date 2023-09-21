from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

class Login:
    def __init__(self,data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

        self.logins = []

    @classmethod
    def save(cls,data):
        query = """INSERT INTO users (first_name,last_name,email,password) 
        VALUES (%(first_name)s,%(last_name)s,%(email)s,%(password)s);"""
        return connectToMySQL("banking_schema").query_db(query, data)
    
    @classmethod
    def get_by_login(cls,data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL("banking_schema").query_db(query,data)
        print(result)
        # Didn't find a matching user
        if len(result) < 1:
            return False
        return cls(result[0])   
    
    @classmethod
    def get_account_balance(cls,data):
        query = """SELECT * FROM balances
JOIN users ON users.id = balances.user_id WHERE user_id = %(user_id)s"""
        return connectToMySQL("banking_schema").query_db(query,data)


    @staticmethod
    def validate_login(login):
        is_valid = True # we assume this is true
        if len(login['first_name']) < 2:
            flash("First name must be at least 2 characters.")
            is_valid = False
        if len(login['last_name']) < 2:
            flash("Last name must be at least 2 characters.")
            is_valid = False
        if not EMAIL_REGEX.match(login['email']): 
            flash("Invalid email address!")
            is_valid = False
        if len(login['password']) < 8:
            flash("Password must be at least 8 characters.")
            is_valid = False
        if login['conf_password'] != login['password']:
            flash("Password must match")
            is_valid = False
        return is_valid
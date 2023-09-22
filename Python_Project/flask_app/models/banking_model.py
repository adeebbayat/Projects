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
        # Didn't find a matching user
        if len(result) < 1:
            return False
        return cls(result[0])   
    
    @classmethod
    def initial_balance(cls,data):
        query = """INSERT INTO accounts (balance,user_id,created_at)
        VALUES ('100',%(user_id)s,NOW())"""
        return connectToMySQL("banking_schema").query_db(query,data)
    
    @classmethod
    def get_account_balance(cls,data):
        query = """SELECT * FROM accounts
JOIN users ON users.id = accounts.user_id WHERE user_id = %(user_id)s"""
        return connectToMySQL("banking_schema").query_db(query,data)

    @classmethod
    def get_all(cls,data):
        query = "SELECT * FROM users WHERE NOT id = %(id)s"
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
    
    @classmethod
    def record_transaction(cls,data):
        query = """INSERT INTO transactions(sender_id,receiver_id,amount,created_at)
        VALUES (%(sender_id)s,%(receiver_id)s,%(amount)s,NOW())"""
        return connectToMySQL("banking_schema").query_db(query,data)
    
    @classmethod
    def update_balance(cls,data):
        query = """UPDATE accounts
        SET balance = %(balance)s
        WHERE user_id = %(user_id)s"""
        return connectToMySQL("banking_schema").query_db(query,data)
    
    @classmethod
    def get_transaction_data(cls,data):
        query = """SELECT * FROM transactions
        WHERE sender_id = %(user_id)s OR receiver_id = %(user_id)s"""
        return connectToMySQL("banking_schema").query_db(query,data)
    @classmethod
    def get_sender_name(cls,data):
        query = """SELECT transactions.id,users.first_name,users.last_name
FROM transactions 
INNER JOIN users ON transactions.sender_id=users.id
WHERE sender_id = %(user_id)s OR receiver_id = %(user_id)s
ORDER BY id;"""
        return connectToMySQL("banking_schema").query_db(query,data)
    @classmethod
    def get_receiver_name(cls,data):
        query = """SELECT transactions.id,users.first_name,users.last_name
FROM transactions 
INNER JOIN users ON transactions.receiver_id=users.id
WHERE sender_id = %(user_id)s OR receiver_id = %(user_id)s
ORDER BY id;"""
        return connectToMySQL("banking_schema").query_db(query,data)
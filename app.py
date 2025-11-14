from flask import Flask, render_template, redirect, url_for, request
from config import Config 
import os 

# Initialisation de l'app Flask 
app = Flask(__name__)
app.config.from_object(Config)

# Routes du site web 
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/apropos')
def apropos():
    return render_template('a-propos.html')

@app.route('/portfolio')
def portfolio(): 
    return render_template('portfolio.html')

@app.route('/contact')
def contact(): 
    web3forms_key = app.config['WEB3FORMS_ACCESS_KEY']
    return render_template('contact.html', web3forms_key=web3forms_key)

# page non répertorié 
# thanks page des formulaires
@app.route('/thanks')
def thanks():
    return render_template('thanks.html')

# Page du devis 
@app.route('/devis')
def devis():
    web3forms_key = app.config['WEB3FORMS_ACCESS_KEY']
    return render_template('devis.html', web3forms_key=web3forms_key)

# Demarrage de l'application 
if __name__ == '__main__':
    app.run(debug=True)
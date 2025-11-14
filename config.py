import os 
from dotenv import load_dotenv

load_dotenv()

class Config: 
    # securisé l'app Flask 
    SECRET_KEY = os.environ.get('SECRET_KEY') 

    # web3forms -> Envoie des mails a partir des formulaires du site 
    WEB3FORMS_ACCESS_KEY = os.environ.get('WEB3FORMS_ACCESS_KEY')
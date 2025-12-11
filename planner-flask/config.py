import os

class Config:
    MONGODB_USERNAME = os.environ.get('MONGO_INITDB_ROOT_USERNAME') or 'admin'
    MONGODB_PASSWORD = os.environ.get('MONGO_INITDB_ROOT_PASSWORD') or 'adminsecret'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwtsecretkey'
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True
    MONGODB_SETTINGS = { 
        'db': 'planner-pp-dev',
        'host': 'mongodb://localhost:27017/planner-pp-dev',
        'username': Config.MONGODB_USERNAME,
        'password': Config.MONGODB_PASSWORD,
        'connect': False
    }

class TestingConfig(Config):
    TESTING = True
    MONGODB_SETTINGS = { 'db': 'planner-pp-test' }

class ProductionConfig(Config):
    MONGODB_SETTINGS = {
        'host': 'mongodb://<username>:<password>@dsXXXXXX.mlab.com:XXXXX/YOUR_DB_NAME'
    }

config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)
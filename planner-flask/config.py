import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret'
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True
    MONGODB_SETTINGS = { 'db': 'YOUR_DB_NAME' }

class TestingConfig(Config):
    TESTING = True
    MONGODB_SETTINGS = { 'db': 'YOUR_TEST_DB_NAME' }

class ProductionConfig(Config):
    MONGODB_SETTINGS = {
        'host': 'mongodb://<username>:<password>@dsXXXXXX.mlab.com:XXXXX/YOUR_DB_NAME'
    }

config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY
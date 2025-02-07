import motor.motor_asyncio
import motor.motor_tornado


class MongoConnect:
    def __init__(self, db_name='university-data'):
        # https://motor.readthedocs.io/en/stable/examples/authentication.html
        # uri = "mongodb://admin:password@192.168.1.200:27017" # Authentication with password
        uri = "mongodb://192.168.1.200:27017"
        self.client = motor.motor_tornado.MotorClient(uri)
        self.db = self.client[db_name] # Database Name
        
        

    def get_db(self):
        return self.db
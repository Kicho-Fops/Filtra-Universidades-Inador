from typing import Union

from fastapi import FastAPI
from typing_extensions import Annotated
from pydantic.functional_validators import BeforeValidator

from Config.mongoConnect import MongoConnect


app = FastAPI(
    title="University-Filter-9000",
    summary="A simple application which allows ITESM Students to filter their Programa Internacional university list.",)

# Using this sample application developed bu MongoDB
# https://github.com/mongodb-developer/mongodb-with-fastapi/blob/master/app.py#L12

# Connect to MongoDB

db = MongoConnect(db_name='university-data').get_db()
if db is None:
    print("Error connecting to MongoDB")
    exit()
else:
    print("Connected to MongoDB")
    

university_collection = db['rankingFebruary'] # Collection Name


PyObjectId = Annotated[str, BeforeValidator(str)]



@app.get("/")
def read_root():
    return {"API_Version": "V1"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
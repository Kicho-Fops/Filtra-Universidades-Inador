import pymongo
from pymongo import MongoClient
from bson import ObjectId


import pandas as pd


def connectToMongo(db: str, collection: str):
    
    client = MongoClient('192.168.1.200', 27017) # Replace with the ip address of your mongo server and the port
    db = client[db]
    collection = db[collection]
    return collection


def insertData(data: pd.DataFrame, db: str, collection: str) -> str:
    """
    by this step you should have the data cleaned and ready to send to the database
    :param db: is the name of the database you want to connect to
    :param collection: is the name of the collection you want to insert the data into

    """
    
    collection = connectToMongo(db, collection)
    data.reset_index(inplace=True)
    data_dict = data.to_dict("records")
    collection.insert_many(data_dict)
    return "Data inserted into MongoDB with the length of the data being: {len(data)}"


def queryBestUniversities(db: str, collection: str, top: int = 100):
    # Establish a connection to MongoDB
    collection = connectToMongo(db, collection)

    # Define the aggregation pipeline
    pipeline = [
        {
            "$lookup": {
                "from": "rankingFebruary",  # The collection to join
                "localField": "nombre",      # Field from the first collection
                "foreignField": "University_Name",  # Field from the second collection
                "as": "ranking"             # Alias for the resulting joined documents
            }
        },
        {
            "$unwind": "$ranking"  # Unwinds the array created by $lookup
        },
        {
            "$match": {
                "ranking.Rank": {"$lt": top}  # Filters rankingFebruary for Rank < 100, si haces que la siguiente sirva, añade una coma al final
                #"vigencia": {"$gt": "2025-02-01"}  # This dosent work right for some reason and I dont care
            }
        },
        {
            "$sort": {
                "ranking.Rank": 1  # Sorts the results by Rank in ascending order
            }
        },
        {
            "$project": {
                "nombre": 1,
                "ciudad": 1,
                "ranking.Rank": 1,
                "clave": 1,
                #"idioma": 1,
                "vigencia": 1
            }
        }
    ]

    # Execute the aggregation query on the collection
    result = collection.aggregate(pipeline)

    return result
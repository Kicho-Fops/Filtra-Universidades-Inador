from Config.mongoConnect import MongoConnect
from Model.UniversityOfferModel import UniversityOffer
from Model.UniversityResponseModel import UniversityResponse
from typing import List

from Model.UniversityResponseModel import rankingToOfferMapper

from Model.UniversityRankingModel import UniversityRanking

db = MongoConnect(db_name='university-data').get_db()
colOffer = db['februaryCollection']
colRanking = db['rankingFebruary']

class UniversityOfferRepository:
    @staticmethod
    async def insert_offers(offers: List[UniversityOffer]):
        inserted_ids = []

       

        for offer in offers:
            # Check if an entry with the same 'clave' and 'nombre' already exists
            existing_offer = await colOffer.find_one({"clave": offer.clave, "nombre": offer.nombre})
            

            if existing_offer is None:
                result = await colOffer.insert_one(offer.model_dump(by_alias=True))
                inserted_ids.append(str(result.inserted_id))
        
        return {"inserted_ids": inserted_ids, "skipped": len(offers) - len(inserted_ids)}
    
    
    # Reevaluate if this method is necessary
    @staticmethod
    async def get_all_offers():
        offers = []
        await colOffer.find({}).to_list(offers)
        return offers
    
    @staticmethod
    async def get_offer_by_id(offer_id: str):
        offer = await db.find_one({"_id": offer_id})
        return offer
    
    
    # Gets list of offers from the excel and matches with the ranking in the database
    
    @staticmethod
    async def get_compatible_offers(offers: List[UniversityOffer]):
        compatible_offers = []

        for offer in offers:
            matching_universities = await colRanking.find({"University_Name": offer.nombre}).to_list(length=None)
            
            
            for university in matching_universities:
                response = UniversityRanking( # TODO: Change this into an extention funtion if they even exist in python
                    id=university["_id"],
                    rank=int(university["Rank"]),
                    University_Name=university["University_Name"],
                    National_Regional_Rank=str(university["National/Regional Rank"]),
                    Alumni=university["Alumni"],
                    Award=university["Award"],
                    Hici=university["Hici"],
                    NyS=university["N&S"],
                    PUB=university["PUB"],
                    PCP=university["PCP"]
                )
            
                
                compatible_offers.append(rankingToOfferMapper(response, offer))
       
        return compatible_offers

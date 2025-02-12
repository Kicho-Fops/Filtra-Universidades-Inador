import pandas as pd
from io import BytesIO
from fastapi import UploadFile, HTTPException
from Model.UniversityOfferModel import UniversityOffer
from Repository.repositoryOffer import UniversityOfferRepository

class UniversityOfferService:
    @staticmethod
    async def process_excel(file: UploadFile):
        try:
            contents = await file.read()
            df = pd.read_excel(BytesIO(contents))

            # Clean & transform data
            df = UniversityOfferService.transform_data(df)


            

            # Convert DataFrame to list of UniversityOffer objects
            offers = [
                UniversityOffer(
                    clave=row["clave"],
                    pais=row["pais"],
                    ciudad=row["ciudad"],
                    vacantes=row["vacantes"],
                    nombre=row["nombre"],
                    periodo=row["periodo"],
                    costo=int(row["costo"]),
                    moneda=row["moneda"],
                    vigencia=row["vigencia"],
                    idioma=row["idioma"],
                )
                for _, row in df.iterrows()
            ]
            
            

            if offers:
                inserted_ids = await UniversityOfferRepository.insert_offers(offers)
                
                best_universities = await UniversityOfferRepository.get_compatible_offers(offers)
                
                # best_universities_serializable = [
                #     {**university, "_id": str(university["_id"])} for university in best_universities
                # ]
                
                return {"Calculated_universities": best_universities}
            
            return {"message": "No matching universities found"}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    def transform_data(df: pd.DataFrame) -> pd.DataFrame:
        """
        Cleans and transforms the DataFrame:
        - Removes universities that charge their own price (only keeps "MXN")
        - Normalizes university names (keeps only the part before the "-")
        """
        df = df.where(pd.notna(df), None)  # Replace NaN with None
        
        df = df[df["moneda"] == "MXN"]  # Keep only MXN universities
        df["nombre"] = df["nombre"].apply(lambda x: x.split("-")[0].strip())  # Normalize names
        return df
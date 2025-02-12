from fastapi import APIRouter, UploadFile, File
from Service.excelOfferService import UniversityOfferService

excel_controller = APIRouter()

@excel_controller.post("/v1/excel/upload")
async def upload_excel(file: UploadFile = File(...)):
    
    return await UniversityOfferService.process_excel(file)

@excel_controller.get("/v1/excel/offer")
async def get_offer():
    return {"bind z": "+walk"}
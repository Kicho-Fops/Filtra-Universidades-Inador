from pydantic import ConfigDict, BaseModel, Field


from typing import Optional, List
from typing_extensions import Annotated
from bson import ObjectId
import motor.motor_asyncio
from pymongo import ReturnDocument
from pydantic.functional_validators import BeforeValidator

from Model.UniversityRankingModel import UniversityRanking
from Model.UniversityOfferModel import UniversityOffer


PyObjectId = Annotated[str, BeforeValidator(str)]

class UniversityResponse(BaseModel):
    
    clave: str = Field(...)
    pais: str = Field(...)
    rank: int = Field(...)
    ciudad: str = Field(...)
    nombre: str = Field(...)
    vigencia: str = Field(...)
    idioma: str = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "clave": "ITA-5INT-022A",
                "pais": "Italia",
                "rank": 1,
                "ciudad": "Florencia",
                "nombre": "Università degli Studi di Firenze - Intercambio Internacional Tradicional - School of Engineering",
                "vigencia": "05/03/2025",
                "idioma": "Inglés: TOEFL IBT - Test Center 87    o  IELTS 5.5    o  TOEFL INSTITUCIONAL 550    y  Italiano: Comprobante de Nivel B1"
            }
        },
    )
    
def rankingToOfferMapper(UniversityRanking, UniversityOffer):
    return UniversityResponse(
        clave=UniversityOffer.clave,
        pais=UniversityOffer.pais,
        rank=UniversityRanking.rank,
        ciudad=str(UniversityOffer.ciudad),
        nombre=UniversityOffer.nombre,
        vigencia=UniversityOffer.vigencia,
        idioma=UniversityOffer.idioma
    )
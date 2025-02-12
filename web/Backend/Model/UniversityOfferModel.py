from pydantic import ConfigDict, BaseModel, Field


from typing import Optional, List
from typing_extensions import Annotated
from bson import ObjectId
import motor.motor_asyncio
from pymongo import ReturnDocument
from pydantic.functional_validators import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]

class UniversityOffer(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    clave: str = Field(...)
    pais: str = Field(...)
    ciudad: Optional[str]
    vacantes: str = Field(...)
    nombre: str = Field(...)
    periodo: str = Field(...)
    costo: int = Field(...)
    moneda: str = Field(...)
    vigencia: str = Field(...)
    idioma: Optional[str]
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "clave": "ITA-5INT-022A",
                "pais": "Italia",
                "ciudad": "Florencia",
                "vacantes": "Altamente Restringida",
                "nombre": "Università degli Studi di Firenze - Intercambio Internacional Tradicional - School of Engineering",
                "periodo": "Agosto - Diciembre 2025",
                "costo": 0,
                "moneda": "MXN",
                "vigencia": "05/03/2025",
                "idioma": "Inglés: TOEFL IBT - Test Center 87    o  IELTS 5.5    o  TOEFL INSTITUCIONAL 550    y  Italiano: Comprobante de Nivel B1"
            }
        },
    )
    

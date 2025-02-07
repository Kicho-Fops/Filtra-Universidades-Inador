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
    rank: int = Field(...)
    University_Name: str = Field(...)
    National_Regional_Rank: int = Field(...)
    Alumni: float = Field(...)
    Award: float = Field(...)
    Hici: float = Field(...)
    NyS: float = Field(...)
    PUB: float = Field(...)
    PCP: float = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "rank": 1,
                "University_Name": "Harvard University",
                "National_Regional_Rank": 1,
                "Alumni": 100.0,
                "Award": 97.1,
                "Hici": 100,
                "NyS": 100,
                "PUB": 100,
                "PCP": 85.7,
            }
        },
    )
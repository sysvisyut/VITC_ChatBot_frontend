from pydantic import BaseModel
from typing import Optional, List

# class Query(BaseModel):
#     query : str

# class PDFMetaData(BaseModel):
#     collection : str
#     title : Optional[str]
#     description : Optional[str]


class RetrieveRequest(BaseModel):
    query: str

class RetrieveResponse(BaseModel):
    answer: str
    sources: List[dict]
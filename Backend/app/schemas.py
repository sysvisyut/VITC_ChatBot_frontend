from pydantic import BaseModel
from typing import Optional

class Query(BaseModel):
    query : str

class PDFMetaData(BaseModel):
    collection : str
    title : Optional[str]
    description : Optional[str]


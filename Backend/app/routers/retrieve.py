from fastapi import APIRouter, status, File, UploadFile, Form
from ..import schemas, database
from typing import Optional

router = APIRouter(
    prefix = '/retrieve',
    tags = ["Retrieval"]
)

@router.post('/query', status_code=status.HTTP_200_OK)
def send_query(request : schemas.Query):
    return {"query sent"}

@router.post('/ingest', status_code=status.HTTP_200_OK)
async def ingest_pdf(
    collection : str = Form(...),
    title : Optional[str] = Form(None),
    description : Optional[str] = Form(None),
    file : UploadFile = File(...)
):
    metadata = schemas.PDFMetaData(
        collection=collection,
        title=title,
        description=description
    )

    # contents = await file.read()

    return {
        "filename" : file.filename,
        "metdata" : metadata.model_dump()
    }

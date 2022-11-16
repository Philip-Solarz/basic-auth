from fastapi import APIRouter

router = APIRouter()


@router.post("/search")
def search(search_str: str):
    pass

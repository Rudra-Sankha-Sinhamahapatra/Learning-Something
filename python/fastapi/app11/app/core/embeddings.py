from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text: str) -> list[float]:
    return model.encode(text).tolist()

def embed_batch(texts: list[str]) -> list[list[float]]:
    return model.encode(texts).tolist()
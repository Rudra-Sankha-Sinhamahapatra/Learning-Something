
## Enter into db

```
docker exec -it ai_kb_pg psql -U aiuser -d aikb
```

## Start the server

```
uv run uvicorn app.main:app --host 0.0.0.0 --port $(grep PORT .env | cut -d '=' -f2)
```
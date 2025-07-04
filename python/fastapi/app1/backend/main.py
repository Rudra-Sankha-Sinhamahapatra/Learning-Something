from fastapi import FastAPI
import json
import requests

app = FastAPI()

with open("data/users.json") as f:
    users = json.load(f)

@app.get("/")
def read_root():
    return {"message": "Hello, User"}

@app.get("/users")
def get_users():
    return users

@app.get("/users/{user_id}")
def get_user(user_id: int):
    user = next((u for u in users if u["id"] == user_id), None)
    if user:
        return user
    return {"error":"User not found"}

@app.get("/external/posts")
def get_external_posts():
    res = requests.get("https://jsonplaceholder.typicode.com/posts")
    return res.json()


@app.get("/external/posts/{post_id}")
def get_post(post_id: int):
    res = requests.get(f"https://jsonplaceholder.typicode.com/posts/{post_id}")
    if res.status_code == 200:
        return res.json()
    return {"error":"Post not found"}


@app.get("/ping")
def ping():
    return {"ping": "pong!"}
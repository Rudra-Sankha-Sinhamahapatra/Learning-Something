## Signup

```
curl -X POST http://localhost:8008/users/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "yourpassword"}'
```

## Signin

```
curl -X POST http://localhost:8008/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "yourpassword"}'
```


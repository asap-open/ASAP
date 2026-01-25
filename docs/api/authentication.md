# Authentication API

All API endpoints (except authentication endpoints) require a valid JWT token in the `Authorization` header.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Sign Up

Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2026-01-25T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**

- `400` - Username or email already exists
- `400` - Invalid input data

---

### Sign In

Authenticate and receive a JWT token.

**Endpoint:** `POST /auth/signin`

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**

- `401` - Invalid credentials

---

### Logout

Invalidate the current session (client-side token removal).

**Endpoint:** `POST /auth/logout`

**Headers:**

```
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

---

## Using the Token

Include the JWT token in all authenticated requests:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3000/api/profile
```

### Token Structure

The JWT token contains:

- User ID
- Expiration time (7 days by default)

### Token Expiration

Tokens expire after 7 days. When a token expires:

- API returns `401 Unauthorized`
- User must sign in again to get a new token

## Security Best Practices

1. **Store tokens securely**
   - Use httpOnly cookies in production
   - Never expose tokens in URLs
   - Clear tokens on logout

2. **Use HTTPS in production**
   - Tokens should only be sent over secure connections
   - Configure proper SSL/TLS certificates

3. **Rotate tokens regularly**
   - Implement token refresh mechanism
   - Set appropriate expiration times

4. **Validate input**
   - Strong password requirements
   - Email validation
   - Username format validation

## Example: Complete Authentication Flow

```javascript
// Sign up
const signupResponse = await fetch("http://localhost:3000/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "johndoe",
    email: "john@example.com",
    password: "SecurePass123!",
    fullName: "John Doe",
  }),
});

const { token, user } = await signupResponse.json();

// Store token
localStorage.setItem("token", token);

// Use token for authenticated requests
const profileResponse = await fetch("http://localhost:3000/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const profile = await profileResponse.json();

// Logout
await fetch("http://localhost:3000/api/auth/logout", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
});

// Clear token
localStorage.removeItem("token");
```

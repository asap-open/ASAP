# Profile API

Manage user profile information including physical attributes and preferences.

## Base URL

```
http://localhost:3000/api/profile
```

All endpoints require authentication.

---

## Get Profile

Retrieve the current user's profile information.

**Endpoint:** `GET /profile`

**Headers:**

```
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "id": "user-uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "createdAt": "2026-01-25T10:00:00.000Z",
  "profile": {
    "fullName": "John Doe",
    "heightCm": 180,
    "targetWeightKg": 85,
    "latestWeightKg": 90,
    "unitPref": "kg",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "gender": "male"
  }
}
```

**Profile Fields:**

- `fullName`: User's full name
- `heightCm`: Height in centimeters
- `targetWeightKg`: Target body weight
- `latestWeightKg`: Most recent logged weight
- `unitPref`: Unit preference (`kg` or `lbs`)
- `dateOfBirth`: Date of birth
- `gender`: Gender (`male`, `female`, or `other`)

---

## Update Profile

Update user profile information.

**Endpoint:** `PUT /profile`

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "fullName": "John Doe",
  "heightCm": 180,
  "targetWeightKg": 85,
  "unitPref": "kg",
  "dateOfBirth": "1990-01-15",
  "gender": "male"
}
```

**All fields are optional.** Send only the fields you want to update.

**Response:** `200 OK`

```json
{
  "fullName": "John Doe",
  "heightCm": 180,
  "targetWeightKg": 85,
  "latestWeightKg": 90,
  "unitPref": "kg",
  "dateOfBirth": "1990-01-15T00:00:00.000Z",
  "gender": "male"
}
```

**Validation:**

- `unitPref`: Must be `kg` or `lbs`
- `gender`: Must be `male`, `female`, or `other`
- `heightCm`: Must be a positive number
- `targetWeightKg`: Must be a positive number

**Errors:**

- `400` - Invalid enum values
- `400` - Invalid data format
- `401` - Unauthorized

---

## Update Username

Change the user's username.

**Endpoint:** `PUT /profile/username`

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "username": "newusername"
}
```

**Response:** `200 OK`

```json
{
  "id": "user-uuid",
  "username": "newusername",
  "email": "john@example.com"
}
```

**Errors:**

- `400` - Username is required
- `400` - Username already taken
- `401` - Unauthorized

---

## Example Usage

### Get Current Profile

```javascript
const response = await fetch("http://localhost:3000/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const data = await response.json();
console.log(data.profile);
```

### Update Profile

```javascript
const response = await fetch("http://localhost:3000/api/profile", {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    heightCm: 182,
    targetWeightKg: 85,
    gender: "male",
  }),
});

const updatedProfile = await response.json();
```

### Change Username

```javascript
const response = await fetch("http://localhost:3000/api/profile/username", {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "newamazingusername",
  }),
});

const updatedUser = await response.json();
```

## Notes

- Profile is automatically created on user signup
- `latestWeightKg` is updated automatically when logging weight
- Changes to profile data are reflected immediately
- Username changes do not affect the JWT token (re-login not required)

# Sessions API

Create, manage, and track workout sessions.

## Base URL

```
http://localhost:3000/api/sessions
```

All endpoints require authentication.

---

## Create Session

Start a new workout session.

**Endpoint:** `POST /sessions`

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Push Day A",
  "notes": "Feeling strong today",
  "exercises": [
    {
      "globalExerciseId": "exercise-uuid",
      "sets": [
        { "weight": 100, "reps": 10, "notes": "Good form" },
        { "weight": 100, "reps": 9 },
        { "weight": 100, "reps": 8 }
      ]
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "id": "session-uuid",
  "userId": "user-uuid",
  "name": "Push Day A",
  "notes": "Feeling strong today",
  "completedAt": "2026-01-25T10:00:00.000Z",
  "exercises": [...]
}
```

---

## Get User Sessions

Retrieve all sessions for the current user.

**Endpoint:** `GET /sessions`

**Headers:**

```
Authorization: Bearer {token}
```

**Query Parameters:**

- `limit` (optional): Number of sessions to return (default: 50)
- `offset` (optional): Number of sessions to skip (default: 0)

**Response:** `200 OK`

```json
[
  {
    "id": "session-uuid",
    "name": "Push Day A",
    "completedAt": "2026-01-25T10:00:00.000Z",
    "exerciseCount": 5,
    "totalSets": 15
  }
]
```

---

## Get Session Details

Get complete details for a specific session.

**Endpoint:** `GET /sessions/:id`

**Headers:**

```
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "id": "session-uuid",
  "name": "Push Day A",
  "notes": "Great workout",
  "completedAt": "2026-01-25T10:00:00.000Z",
  "exercises": [
    {
      "id": "entry-uuid",
      "exerciseName": "Barbell Bench Press",
      "sets": [
        {
          "id": "set-uuid",
          "weight": 100,
          "reps": 10,
          "notes": "Good form"
        }
      ]
    }
  ]
}
```

---

## Example Usage

```javascript
// Create a session
const session = await fetch("http://localhost:3000/api/sessions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Leg Day",
    exercises: [
      {
        globalExerciseId: "squat-id",
        sets: [
          { weight: 140, reps: 5 },
          { weight: 140, reps: 5 },
          { weight: 140, reps: 5 },
        ],
      },
    ],
  }),
}).then((r) => r.json());

// Get recent sessions
const sessions = await fetch("http://localhost:3000/api/sessions", {
  headers: { Authorization: `Bearer ${token}` },
}).then((r) => r.json());

// Get session details
const details = await fetch(`http://localhost:3000/api/sessions/${sessionId}`, {
  headers: { Authorization: `Bearer ${token}` },
}).then((r) => r.json());
```

---

_More detailed documentation coming soon._

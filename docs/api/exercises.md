# Exercises API

Browse and manage the exercise library.

## Base URL

```
http://localhost:3000/api/exercises
```

All endpoints require authentication.

---

## Get Global Exercises

Retrieve all exercises from the global library.

**Endpoint:** `GET /exercises`

**Headers:**

```
Authorization: Bearer {token}
```

**Query Parameters:**

- `category` (optional): Filter by category (e.g., "chest", "back", "legs")
- `search` (optional): Search by exercise name

**Response:** `200 OK`

```json
[
  {
    "id": "exercise-uuid",
    "name": "Barbell Bench Press",
    "category": "Chest",
    "description": "Compound chest exercise",
    "muscleGroup": ["Chest", "Triceps", "Shoulders"]
  }
]
```

---

## Get Exercise by ID

Get details for a specific exercise.

**Endpoint:** `GET /exercises/:id`

**Headers:**

```
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "id": "exercise-uuid",
  "name": "Barbell Bench Press",
  "category": "Chest",
  "description": "Compound chest exercise",
  "muscleGroup": ["Chest", "Triceps", "Shoulders"]
}
```

---

## Example Usage

```javascript
// Get all exercises
const exercises = await fetch("http://localhost:3000/api/exercises", {
  headers: { Authorization: `Bearer ${token}` },
}).then((r) => r.json());

// Filter by category
const chestExercises = await fetch(
  "http://localhost:3000/api/exercises?category=chest",
  { headers: { Authorization: `Bearer ${token}` } },
).then((r) => r.json());

// Search exercises
const benchVariations = await fetch(
  "http://localhost:3000/api/exercises?search=bench",
  { headers: { Authorization: `Bearer ${token}` } },
).then((r) => r.json());
```

## Categories

Available exercise categories:

- Chest
- Back
- Shoulders
- Arms
- Legs
- Core
- Full Body
- Cardio
- Olympic Lifts

---

_More detailed documentation coming soon._

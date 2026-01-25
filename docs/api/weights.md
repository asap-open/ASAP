# Weight Tracking API

Track and manage body weight logs over time.

## Base URL

```
http://localhost:3000/api/weights
```

All endpoints require authentication.

---

## Log Weight

Record a new body weight measurement.

**Endpoint:** `POST /weights`

**Headers:**

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "weightKg": 85.5,
  "note": "Morning weight, post-workout"
}
```

**Fields:**

- `weightKg` (required): Weight in kilograms
- `note` (optional): Additional notes about the measurement

**Response:** `201 Created`

```json
{
  "id": "weight-log-uuid",
  "userId": "user-uuid",
  "weightKg": 85.5,
  "note": "Morning weight, post-workout",
  "loggedAt": "2026-01-25T10:00:00.000Z"
}
```

**Note:** This also updates the `latestWeightKg` field in your user profile automatically.

**Errors:**

- `400` - Weight is required
- `400` - Weight must be a positive number
- `401` - Unauthorized

---

## Get Weight History

Retrieve all weight logs for the current user, ordered by date (most recent first).

**Endpoint:** `GET /weights/history`

**Headers:**

```
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
[
  {
    "id": "weight-log-uuid-1",
    "userId": "user-uuid",
    "weightKg": 85.5,
    "note": "Morning weight",
    "loggedAt": "2026-01-25T10:00:00.000Z"
  },
  {
    "id": "weight-log-uuid-2",
    "userId": "user-uuid",
    "weightKg": 86.2,
    "note": "After refeed day",
    "loggedAt": "2026-01-18T10:00:00.000Z"
  }
]
```

**Errors:**

- `401` - Unauthorized

---

## Example Usage

### Log a New Weight

```javascript
const response = await fetch("http://localhost:3000/api/weights", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    weightKg: 85.5,
    note: "Morning weight after cardio",
  }),
});

const weightLog = await response.json();
console.log("Logged weight:", weightLog);
```

### Get Weight History

```javascript
const response = await fetch("http://localhost:3000/api/weights/history", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const history = await response.json();
console.log(`Total logs: ${history.length}`);

// Calculate weight change
if (history.length >= 2) {
  const latest = history[0].weightKg;
  const previous = history[1].weightKg;
  const change = latest - previous;
  console.log(`Weight change: ${change > 0 ? "+" : ""}${change.toFixed(1)} kg`);
}
```

### Weekly Weight Tracking

```javascript
// Log weight once per week
const logWeeklyWeight = async (weight, note = "") => {
  const response = await fetch("http://localhost:3000/api/weights", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weightKg: weight,
      note: note || `Week ${new Date().getWeek()} check-in`,
    }),
  });

  return response.json();
};

// Get last 4 weeks of data
const getLast4Weeks = async () => {
  const response = await fetch("http://localhost:3000/api/weights/history", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const history = await response.json();
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  return history.filter((log) => new Date(log.loggedAt) >= fourWeeksAgo);
};
```

## Best Practices

### Consistency

- **Weigh at the same time** - Morning weight (fasted) is most consistent
- **Same conditions** - After using bathroom, before eating/drinking
- **Track regularly** - Weekly is usually sufficient for most goals

### Interpretation

- **Look at trends** - Daily fluctuations are normal (water, food, etc.)
- **Use weekly averages** - More reliable than single measurements
- **Context matters** - Note factors like high-sodium meals, training intensity

### Notes Field Usage

Examples of useful notes:

- "Post-refeed day"
- "After deload week"
- "Morning weight, fasted"
- "Evening weight (unusual)"
- "After vacation"

## Integration with Profile

When you log a weight:

1. A new entry is created in weight_logs table
2. Your profile's `latestWeightKg` is automatically updated
3. The profile page displays this latest weight
4. BMI is recalculated based on the new weight

This means:

- No need to manually update your profile weight
- Always shows your most recent measurement
- Historical data is preserved in weight logs

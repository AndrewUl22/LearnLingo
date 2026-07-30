# Seeding the Realtime Database

The `teachers.json` in this folder matches the shape expected by the app
(`teachers/{id}` nodes in Firebase Realtime Database).

## Option A — Firebase Console (fastest)

1. Open your project in the Firebase Console → Realtime Database.
2. Click the three-dot menu → **Import JSON**.
3. Wrap the array into an object keyed as `teachers`, for example:

```json
{
  "teachers": [ ...contents of teachers.json... ]
}
```

4. Import it. Firebase will auto-generate push IDs for each array item under
   the `teachers` node.

## Option B — REST API (curl)

```bash
curl -X PUT \
  -d @teachers-wrapped.json \
  "https://<YOUR_PROJECT_ID>-default-rtdb.<region>.firebasedatabase.app/teachers.json"
```

Where `teachers-wrapped.json` is an **object** (not array) keyed by any ids,
e.g.:

```json
{
  "teacher_1": { "name": "John", "surname": "Doe", ... },
  "teacher_2": { "name": "Jane", "surname": "Smith", ... }
}
```

## Database rules (development only)

For local development, temporarily allow public read access to `teachers`,
while keeping `users` restricted to the signed-in owner:

```json
{
  "rules": {
    "teachers": {
      ".read": true,
      ".write": false
    },
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

Tighten these before any real production use.

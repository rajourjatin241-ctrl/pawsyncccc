# PawSync Backend Review

## Evidence Summary

All required files exist and were read in full. No test suite was re-run; findings are based solely on static source inspection.

---

## Checklist Results

| # | Requirement | Result |
|---|---|---|
| 1 | server/index.js, routes/*.js, models/*.js, middleware/*.js exist and are syntactically correct | ✅ All present, syntax valid |
| 2 | server/package.json has bcryptjs, cors, dotenv, express, jsonwebtoken, mongoose; no TypeScript | ✅ All six deps present, no TS |
| 3 | seed.js seeds 6 pets matching Gallery fallback; creates admin with bcryptjs | ✅ 6 pets match, bcrypt.hash used |
| 4 | server/.env and server/.env.example exist with correct variables | ✅ Both present, PORT/MONGODB_URI/JWT_SECRET/ADMIN_USERNAME/ADMIN_PASSWORD |
| 5 | src/api.js exports BASE_URL and helpers for all endpoints | ✅ BASE_URL + fetchPets, submitApplication, submitContact, registerNGO, sendChatMessage |
| 6 | AdoptModal, ChatWidget, NGOModal exist and import from ../api | ✅ All three exist; correct import paths |
| 7 | Gallery.jsx uses useEffect + fetch('/api/pets'), shows SkeletonCard while loading, falls back on error | ✅ All three behaviours present |
| 8 | Support.jsx retains items list AND adds contact form posting to /api/contact | ✅ items array and form both present |
| 9 | NGO.jsx has Partner With Us button opening NGOModal | ✅ Button present, state/modal wired |
| 10 | App.jsx imports and renders ChatWidget | ✅ Imported and rendered |
| 11 | vite.config.js proxy: { '/api': 'http://localhost:5000' } | ✅ Present |
| 12 | README.md has setup instructions and API endpoint table | ✅ Both present |

---

## Findings

### BLOCKER 1 — AdoptModal ignores the `onSuccess` prop; Gallery's post-submit state never updates

**File:** `src/components/AdoptModal.jsx` (all lines) vs `src/components/Gallery.jsx` line 66

**Evidence:**  
Gallery passes `onSuccess={() => { setSubmitted(true); setModalOpen(false) }}` to AdoptModal (Gallery.jsx:66). AdoptModal's function signature is `export default function AdoptModal({ pet, onClose })` — `onSuccess` is not destructured. On a successful submission the modal sets its own internal `status === 'success'` state (AdoptModal.jsx line ~32) but never calls `onSuccess`. As a result:
- `setSubmitted(true)` in Gallery is never called, so the "Applied for X!" button state is never shown.
- `setModalOpen(false)` is never called, so the modal stays open with the success message until the user manually closes it via the × button or overlay click.

**Correction:** Add `onSuccess` to AdoptModal's prop destructure and call it after the successful `setStatus('success')`:

```js
// AdoptModal.jsx
export default function AdoptModal({ pet, onClose, onSuccess }) {
  // ...
  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitApplication({ ... })
      setStatus('success')
      onSuccess?.()          // ← add this
    } catch (err) {
      ...
    }
  }
```

---

### BLOCKER 2 — `server/.env` with real credentials is not excluded from git

**File:** `.gitignore` (project root)

**Evidence:**  
`.gitignore` lists `node_modules`, `dist`, `.DS_Store`, `*.local`, `index_old.html`. It does not list `.env` or `server/.env`. The `server/.env` file contains `JWT_SECRET=pawsync_jwt_secret_2024` and `ADMIN_PASSWORD=pawsync2024`. Because `.env` is untracked by `.gitignore`, it will be committed and pushed to any remote repository, exposing the JWT signing secret and admin password.

**Correction:** Add `server/.env` (or `**/.env`) to `.gitignore`:

```
# .gitignore — add:
server/.env
```

The `.env.example` file should be retained (it already is).

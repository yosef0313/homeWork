Recruitment Portal
===================

A React + TypeScript application that displays candidates with real-time, combinable
filters. Data is served from a local JSON Server (mock API) and the UI is built with
Material UI (MUI).

Highlights
----------
- Clean, responsive UI (desktop table + mobile cards)
- Real-time filtering with AND logic (filters work together)
- Filter rules are implemented as a pure function
- Unit tests included (Vitest)
- Optional: TanStack Query for loading/error/caching


Features
--------
Candidates table
- Name
- Email (double-click to copy + visual feedback)
- Position
- Status
- Years of Experience

Filters (AND logic)
- Name                 (text)
- Position             (select)
- Status               (select)
- Years of Experience  (number)

Conditional behavior
- Position is disabled until Name is filled
- Status is disabled until Position is selected
- Years of Experience is always enabled


Tech Stack
----------
- React
- TypeScript
- Vite
- Material UI (MUI)
- JSON Server (mock API)
- TanStack Query 
- Vitest (unit tests)


Getting Started
---------------
1) Install dependencies
   npm install

2) Run the application (recommended)
   npm run start

   React app:      http://localhost:5173
   JSON Server API: http://localhost:3001/candidates

Run separately (optional)
- JSON Server only:
  npm run server

- React dev server only:
  npm run dev


Running Tests
-------------
- Run once:
  npm run test:run

- Watch mode:
  npm run test

- Vitest UI:
  npm run test:ui


Project Structure
-----------------
src/
  components/
    CandidatesTable.tsx
  utils/
    filterCandidates.ts
    filterCandidates.test.ts
  theme/theme.ts
db.json


Notes
-----
- Filtering logic is separated from the UI for better readability and testability.
- TanStack Query improves UX by handling:
  loading states, errors, and caching.

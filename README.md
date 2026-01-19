Recruitment Portal

A React + TypeScript application that displays a list of candidates in a table with real-time, combinable filters.
The data is served from a local JSON Server, and the UI is built using Material UI (MUI).

Filtering logic is implemented as a pure function and covered by unit tests.

FEATURES
- Candidates table including:
  - Name
  - Email
  - Position
  - Status
  - Years of Experience
- Four filter inputs:
  - Text input: Name
  - Select dropdown: Position
  - Select dropdown: Status
  - Number input: Years of Experience
- Conditional filter behavior:
  - Position filter is disabled until Name is filled
  - Status filter is disabled until Position is selected
  - Years of Experience is always enabled
- Real-time filtering while typing/selecting
- Filters are combinable using AND logic
- Reset filters button
- Responsive UI:
  - Table layout on desktop
  - Card layout on mobile
- Double-click an email to copy it to clipboard (with visual feedback)

TECH STACK
- React
- TypeScript
- Vite
- Material UI (MUI)
- JSON Server (mock API)
- TanStack Query (bonus)
- Vitest (unit tests)

------------- GETTING STARTED -------------

Install dependencies:
npm install

Run the application (recommended):
npm run start

React app: http://localhost:5173
JSON Server API: http://localhost:3001/candidates

Run separately (optional):

Start JSON Server only:
npm run server

Start React dev server only:
npm run dev

RUNNING TESTS

Run tests once:
npm run test:run

Run tests in watch mode:
npm run test

Open Vitest UI:
npm run test:ui

PROJECT STRUCTURE

src/
  components/
    CandidatesTable.tsx
  utils/
    filterCandidates.ts
    filterCandidates.test.ts
db.json

NOTES
- Filtering logic is separated from the UI and implemented as a pure function for better testability.
- TanStack Query is used to manage loading states, errors, and caching.


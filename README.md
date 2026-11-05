# Assignment & Review Dashboard

A frontend-only assignment management and review dashboard built with **React (Vite, JavaScript)** and **Tailwind CSS**. Data persists entirely in the browser using `localStorage`.

---

## Features

- **Role Switcher & Mock Authentication:**
  - Fast switcher between 2 Admins (Professors) and 5 Students.
  - Zero backend dependencies; no external router or auth library.
- **Data Isolation:**
  - Each user sees only their relevant data.
  - Admins only see and manage assignments they created.
  - Students only see assignments specifically assigned to them.
- **Student Capabilities:**
  - View assignment cards with title, description, due date, Google Drive link, and status badge.
  - Two-step submission confirmation dialog.
  - Progress summary (e.g., *"3 of 5 submitted"*).
- **Admin Capabilities:**
  - Create, edit, and delete assignments with Google Drive links.
  - Target assignments to all students or select individuals.
  - Real-time student submission status breakdown per assignment.
  - Class completion progress bar.
- **Reliable Local Persistence:**
  - Safe `localStorage` integration with fallback for corrupted data or quota limits.
  - Pre-seeded with sample admins, students, assignments, and submission records.

---

## Tech Stack

- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4
- **State Management:** React Context API & standard hooks (`useState`, `useEffect`)
- **Storage:** Browser `localStorage`

---

## Project Structure

```text
src/
├── components/
│   ├── admin/       # Admin-specific components (assignment forms, class trackers)
│   ├── common/      # Reusable UI elements (navbar, role switcher, modal, progress bars)
│   └── student/     # Student-specific components (assignment list, submission modal)
├── context/         # React Context for global state (auth & dashboard data)
├── data/            # Mock seed data (users, assignments, submissions)
├── hooks/           # Custom React hooks
├── pages/           # Student and Admin dashboard page views
├── utils/           # Helpers (date formatting, ID generation, storage wrappers)
├── App.jsx          # Main application entry and root layout
└── index.css        # Tailwind CSS imports and base styles
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

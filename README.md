# KarLoJi — Assignment & Review Dashboard

**KarLoJi** is a modern, frontend-only assignment management and review dashboard built with **React (Vite, JavaScript)** and **Tailwind CSS**. It provides a role-based experience for Professors (Admins) and Students with complete data isolation, a two-step submission confirmation workflow, class progress tracking, upcoming deadlines timeline, and full persistence in `localStorage`.

Styled with the custom **KarLoJi** theme featuring a deep indigo gradient sidebar, soft lavender ambient backdrop, friendly typography (**Plus Jakarta Sans** and **Caveat** script), circular progress visualization, and responsive card layouts.

---

## 1. Project Overview

The dashboard simulates a complete classroom assignment workflow without requiring an external backend or router:
- **Admin (Professor):**
  - Create, edit, and delete assignments with title, description, due date, and Google Drive resource links.
  - Target assignments to either **All students** or specific **Selected students**.
  - Monitor real-time class submission progress bars (`X / Y submitted`, percentage).
  - Expand individual assignments to view per-student status badges (**Submitted** with timestamp vs. **Not Submitted**).
  - Admins only see and manage assignments they authored (`createdBy === currentUser.id`).
- **Student:**
  - Personalized time-of-day greeting banner (*"Good Morning / Afternoon / Evening, {Name}! 👋"*).
  - View assigned coursework cards with status pills, Google Drive resource links, and due date countdowns/overdue alerts.
  - Submit work through an accessible **two-step confirmation dialog** (*"Yes, I have submitted"* &rarr; *"Are you sure?"*).
  - Track completion stats via an SVG **circular progress ring** showing completion ratio and percentage.
  - Inspect **Upcoming Deadlines** chronologically with status indicators.
  - Students only see assignments specifically targeted to them (`assignedTo.includes(currentUser.id)`).
- **Persistence & Offline Resilience:**
  - All state loads from and syncs to browser `localStorage`.
  - Built-in safe fallbacks, error handling, retry actions, and full data reset back to initial seed data.

---

## 2. Setup Steps

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or `pnpm`

### Installation & Run
```bash
# 1. Clone or navigate to the repository
cd Joineazy

# 2. Install dependencies
npm install

# 3. Start local development server (with HMR)
npm run dev

# 4. Run ESLint checks
npm run lint

# 5. Build for production
npm run build

# 6. Preview production build locally
npm run preview
```

---

## 3. Folder Structure

```text
Joineazy/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminAssignmentCard.jsx   # Assignment card with class stats, expander, edit/delete
│   │   │   ├── AssignmentForm.jsx        # Modal form for create/edit with student targeting
│   │   │   └── StudentStatusList.jsx     # Expandable list of assigned students & status pills
│   │   ├── common/
│   │   │   ├── ConfirmDialog.jsx         # Accessible modal for delete & submission confirmation
│   │   │   ├── EmptyState.jsx            # Standardized empty state with custom action buttons
│   │   │   ├── ErrorMessage.jsx          # Error banner with retry and data reset actions
│   │   │   ├── Header.jsx                # Responsive KarLoJi sidebar (desktop) & top bar (mobile)
│   │   │   ├── LoadingSpinner.jsx        # Animated spinner and skeleton placeholder
│   │   │   └── ProgressBar.jsx           # Reusable completion progress bar (lavender track & green fill)
│   │   └── student/
│   │       ├── AssignmentCard.jsx        # Student card with Drive link, status badge, and submission trigger
│   │       └── ProgressSummary.jsx       # Circular SVG progress ring and completed assignments counter
│   ├── context/
│   │   └── AppContext.jsx                # Global state provider & useApp custom hook
│   ├── data/
│   │   └── seedData.js                   # Mock users (2 admins, 5 students), assignments, and submissions
│   ├── hooks/
│   │   └── useApp.js                     # Hook re-export for modular imports
│   ├── pages/
│   │   ├── AdminDashboard.jsx            # Professor assignment management page
│   │   ├── LoginPage.jsx                 # Role profile selection screen with KarLoJi styling
│   │   └── StudentDashboard.jsx          # Student dashboard with banner, assignments grid, and overview
│   ├── utils/
│   │   ├── helpers.js                    # UUID generator, date formatter, overdue checker, Drive link validator
│   │   └── storage.js                    # Safe localStorage reader and writer with try/catch
│   ├── App.jsx                           # View switcher and layout shell
│   ├── index.css                         # Tailwind CSS v4 setup and KarLoJi design tokens
│   └── main.jsx                          # App root mounting AppProvider
├── index.html                            # App HTML entry with Google Fonts (Plus Jakarta Sans, Caveat)
├── package.json                          # Scripts and project dependencies
├── README.md                             # Documentation and architecture guide
└── vite.config.js                        # Vite bundler configuration
```

---

## 4. Component Architecture

```
                          ┌─────────────────────┐
                          │    AppProvider      │ (AppContext.jsx)
                          └──────────┬──────────┘
                                     │
                               ┌─────▼─────┐
                               │  App.jsx  │
                               └─────┬─────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           │                         │                         │
     [ loading ]                  [ error ]              [ !currentUser ]
           │                         │                         │
     LoadingSpinner             ErrorMessage               LoginPage
                                                               │
                                         ┌─────────────────────┴─────────────────────┐
                                         │  Authenticated Shell (Header.jsx)         │
                                         └─────────────────────┬─────────────────────┘
                                                               │
                             ┌─────────────────────────────────┴─────────────────────────────────┐
                             │                                                                   │
                  [ role === 'admin' ]                                                [ role === 'student' ]
                             │                                                                   │
                    AdminDashboard.jsx                                                  StudentDashboard.jsx
                             │                                                                   │
             ┌───────────────┼───────────────┐                                   ┌───────────────┴───────────────┐
             │               │               │                                   │                               │
    AdminAssignmentCard  AssignmentForm  ConfirmDialog                    GreetingBanner                  AssignmentCard
             │           (Create / Edit)  (Delete)                               │                               │
     ┌───────┴───────┐                                                     ProgressSummary                 ConfirmDialog
     │               │                                                    UpcomingDeadlines               (2-step submit)
ProgressBar  StudentStatusList                                            MotivationalCard
```

### Data Flow & Roles
- **AppContext (`AppProvider`):** Manages `users`, `assignments`, `submissions`, `currentUser`, `loading`, and `error`. Exposes action methods:
  - `login(userId)` / `logout()`
  - `addAssignment(assignmentData)`
  - `updateAssignment(assignmentId, updatedData)`
  - `deleteAssignment(assignmentId)`
  - `markSubmitted(assignmentId)`
  - `retryLoad()` / `resetData()`
- **`App.jsx`:** Controls top-level branching: displays `LoadingSpinner` while initializing, `ErrorMessage` on failure, `LoginPage` when unauthenticated, or renders `Header` alongside the role-specific dashboard.
- **`AdminDashboard`:** Consumes filtered assignments (`createdBy === currentUser.id`), manages Create/Edit modals via `AssignmentForm`, and delegates deletions to `ConfirmDialog`.
- **`StudentDashboard`:** Consumes filtered assignments (`assignedTo.includes(currentUser.id)`), computes progress for `ProgressSummary`, builds an upcoming deadlines timeline, and triggers submission confirmation modals.

---

## 5. Key Design Decisions

1. **Context API for Centralized State Management:**
   - Avoids external dependencies (Redux, Zustand) while maintaining a clean, centralized store.
   - Any component can consume or mutate state via `useApp()` without prop drilling.

2. **Safe `localStorage` Persistence & Fallbacks:**
   - State slices are initialized from `localStorage` with an immediate fallback to `seedData.js`.
   - Any state update synchronizes to browser storage via dedicated `useEffect` hooks.
   - All I/O operations are wrapped in `try/catch` inside `src/utils/storage.js` to guard against quota errors and malformed JSON.

3. **Role-Based Conditional Rendering (Zero Routing Dependencies):**
   - Eliminates `react-router-dom` in favor of declarative, role-driven views based on `currentUser`:
     - `null` &rarr; `<LoginPage />`
     - `'admin'` &rarr; `<AdminDashboard />`
     - `'student'` &rarr; `<StudentDashboard />`

4. **1-Click Profile Switching for Demo Evaluation:**
   - Allows instant switching between professors and students to inspect isolated permissions, real-time submission synchronization, and responsive layouts.

5. **Assignment-Submission Synchronization Logic:**
   - **On Create:** Automatically initializes `'not_submitted'` records for all targeted students.
   - **On Edit:** Compares `assignedTo` updates:
     - Generates `'not_submitted'` records for newly added students.
     - Preserves existing submission statuses and timestamps for students who remain assigned.
     - Prunes submission entries for removed students.
   - **On Delete:** Cascades deletion to remove all associated submission records.

6. **KarLoJi Visual Design System:**
   - Custom palette defined in `src/index.css`: deep indigo (`#140E3A` to `#2A1A6B`), primary purple (`#3B1FA8`), soft lavender background (`#F6F2FF` to `#E9E0FF`), and status tokens.
   - Fully responsive layouts supporting mobile (360px), tablet (768px), and desktop (1280px+).

---

## 6. Demo Credentials & Users List

Select any profile on the sign-in screen to explore the corresponding dashboard:

### Professors / Admins
| Name | Email | Role | Scope |
| :--- | :--- | :--- | :--- |
| **Dr. Alan Turing** | `alan.turing@university.edu` | Admin | Owns Assignments 1 & 2 |
| **Prof. Grace Hopper** | `grace.hopper@university.edu` | Admin | Owns Assignments 3 & 4 |

### Students
| Name | Email | Role | Seeded Assignments |
| :--- | :--- | :--- | :--- |
| **Eleven** | `eleven@student.edu` | Student | Assigned to Assignments 1, 2, 4 |
| **Mike Wheeler** | `mike.wheeler@student.edu` | Student | Assigned to Assignments 1, 2, 3 |
| **Will Byers** | `willbyers@student.edu` | Student | Assigned to Assignments 1, 2, 3 |
| **Steve Harrington** | `steve.harrington@student.edu` | Student | Assigned to Assignments 1, 3, 4 |
| **Lucas Sinclair** | `lucas.sinclair@student.edu` | Student | Assigned to Assignments 1, 3, 4 |

---

## 7. License

MIT License. Designed for demonstration and educational assignment management workflows.

# Assignment & Review Dashboard

A frontend-only assignment management and review dashboard built with **React (Vite, JavaScript)** and **Tailwind CSS**. It provides a role-based experience for Professors (Admins) and Students with complete data isolation, two-step submission workflows, class progress tracking, and full persistence in `localStorage`.

---

## 1. Project Overview

The dashboard simulates a classroom assignment workflow without any backend or external routing dependencies:
- **Admin (Professor):** Create, edit, and delete assignments with Google Drive resource links; assign to all or selected students; view class-wide submission progress bars; inspect per-student submission statuses with timestamps. Admins only see assignments they authored.
- **Student:** View assigned coursework, deadlines, overdue warnings, and Google Drive links; submit assignments through a two-step confirmation modal; track personal completion ratios in real time. Students only see assignments specifically assigned to them.
- **Persistence & Recovery:** All data loads from and persists to browser `localStorage` with automated state synchronization and fallbacks for missing or corrupted storage.

---

## 2. Setup Steps

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server (with HMR)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 3. Folder Structure

```text
src/
├── components/
│   ├── admin/
│   │   ├── AdminAssignmentCard.jsx   # Assignment card with stats, expander, edit/delete
│   │   ├── AssignmentForm.jsx        # Modal form for create/edit with student targeting
│   │   └── StudentStatusList.jsx     # Expandable list of assigned students & statuses
│   ├── common/
│   │   ├── ConfirmDialog.jsx         # Reusable accessible confirmation modal
│   │   ├── EmptyState.jsx            # Standardized empty state presentation
│   │   ├── ErrorMessage.jsx          # Error banner with retry and reset actions
│   │   ├── Header.jsx                # App navigation, active user info & sign out
│   │   ├── LoadingSpinner.jsx        # Animated spinner and skeleton placeholder
│   │   └── ProgressBar.jsx           # Reusable accessible completion progress bar
│   └── student/
│       ├── AssignmentCard.jsx        # Student card with Drive link and submission button
│       └── ProgressSummary.jsx       # Student completion overview ("X of Y submitted")
├── context/
│   └── AppContext.jsx                # Global state provider & useApp custom hook
├── data/
│   └── seedData.js                   # Seed data for users, assignments, and submissions
├── hooks/
│   └── useApp.js                     # Hook re-export for modular imports
├── pages/
│   ├── AdminDashboard.jsx            # Professor assignment management page
│   ├── LoginPage.jsx                 # User profile selection screen
│   └── StudentDashboard.jsx          # Student assignment view page
├── utils/
│   ├── helpers.js                    # Unique ID generator, date formatting, overdue check
│   └── storage.js                    # Safe localStorage reader and writer with try/catch
├── App.jsx                           # Root view switcher and shell layout
├── index.css                         # Tailwind CSS v4 import
└── main.jsx                          # App root with AppProvider wrapper
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
   LoadingSpinner              ErrorMessage                LoginPage
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
    AdminAssignmentCard  AssignmentForm  ConfirmDialog                    ProgressSummary                 AssignmentCard
             │           (Create / Edit)  (Delete)                               │                               │
     ┌───────┴───────┐                                                      ProgressBar                     ConfirmDialog
     │               │                                                                                      (2-step submit)
ProgressBar  StudentStatusList
```

- **AppContext (`AppProvider`):** Manages `users`, `assignments`, `submissions`, `currentUser`, `loading`, and `error`. Exposes action methods (`login`, `logout`, `addAssignment`, `updateAssignment`, `deleteAssignment`, `markSubmitted`, `retryLoad`, `resetData`).
- **`App.jsx`:** Controls top-level branching: displays `LoadingSpinner` while initializing, `ErrorMessage` on failure, `LoginPage` if unauthenticated, or renders `Header` alongside the role-specific dashboard.
- **`AdminDashboard`:** Consumes filtered assignments (`createdBy === currentUser.id`), manages Create/Edit modals via `AssignmentForm`, and delegates deletions to `ConfirmDialog`.
- **`StudentDashboard`:** Consumes filtered assignments (`assignedTo.includes(currentUser.id)`), computes progress for `ProgressSummary`, and passes submission confirmation requests to `ConfirmDialog`.

---

## 5. Key Design Decisions

1. **Context API for State Management:**
   - Avoids third-party state libraries (Redux, Zustand) while maintaining a clean, centralized store.
   - Any component can access or mutate state via `useApp()` without prop drilling.

2. **Safe `localStorage` Persistence:**
   - State slices are initialized from `localStorage` with a fallback to `seedData.js`.
   - Changes are automatically synced via dedicated `useEffect` hooks.
   - All I/O is wrapped in `try/catch` blocks inside `src/utils/storage.js` to guard against quota limits and corrupted JSON.

3. **Role-Based Conditional Rendering (No Router):**
   - Eliminates external routing libraries (`react-router-dom`).
   - The view is driven entirely by `currentUser.role`:
     - `null` &rarr; `<LoginPage />`
     - `'admin'` &rarr; `<AdminDashboard />`
     - `'student'` &rarr; `<StudentDashboard />`

4. **Seeded Mock Profiles (No Backend Auth):**
   - Instant 1-click login allows switching between professors and students to inspect isolated permissions and real-time updates.

5. **Assignment-Submission Synchronization Logic:**
   - **On Create:** Automatically provisions `'not_submitted'` records for all targeted students.
   - **On Edit:** Compares `assignedTo` changes:
     - Generates `'not_submitted'` entries for newly added students.
     - Preserves existing submission statuses and timestamps for students who remain assigned.
     - Prunes submission entries for removed students.
   - **On Delete:** Cascades deletion to remove all associated submission records, keeping `submissions` clean.

---

## 6. Demo Users List

Select any user on the sign-in screen to explore the corresponding dashboard:

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
| **Will Byers** | `will.byers@student.edu` | Student | Assigned to Assignments 1, 2, 3 |
| **Steve Harrington** | `steve.harrington@student.edu` | Student | Assigned to Assignments 1, 3, 4 |
| **Lucas Sinclair** | `lucas.sinclair@student.edu` | Student | Assigned to Assignments 1, 3, 4 |

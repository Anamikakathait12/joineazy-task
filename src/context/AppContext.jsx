import { createContext, useContext, useState, useEffect } from 'react';
import {
  users as seedUsers,
  assignments as seedAssignments,
  submissions as seedSubmissions,
} from '../data/seedData';
import { loadData, saveData } from '../utils/storage';
import { generateId } from '../utils/helpers';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  USERS: 'joineazy_users',
  ASSIGNMENTS: 'joineazy_assignments',
  SUBMISSIONS: 'joineazy_submissions',
  CURRENT_USER: 'joineazy_current_user',
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial load from localStorage (fallback to seedData)
  useEffect(() => {
    let isMounted = true;

    try {
      // Short simulated delay to demonstrate loading state
      const timer = setTimeout(() => {
        if (!isMounted) return;

        try {
          const loadedUsers = loadData(STORAGE_KEYS.USERS, seedUsers);
          // Keep user names/emails synchronized with seed definitions if updated
          const syncedUsers = seedUsers.map((seedU) => {
            const existing = Array.isArray(loadedUsers)
              ? loadedUsers.find((u) => u.id === seedU.id)
              : null;
            return existing ? { ...existing, name: seedU.name, email: seedU.email, role: seedU.role } : seedU;
          });

          const loadedAssignments = loadData(STORAGE_KEYS.ASSIGNMENTS, seedAssignments);
          const loadedSubmissions = loadData(STORAGE_KEYS.SUBMISSIONS, seedSubmissions);
          const loadedCurrentUser = loadData(STORAGE_KEYS.CURRENT_USER, null);

          setUsers(syncedUsers);
          setAssignments(loadedAssignments);
          setSubmissions(loadedSubmissions);
          // If the logged in user was updated, update currentUser as well
          if (loadedCurrentUser) {
            const updatedCurrent = syncedUsers.find((u) => u.id === loadedCurrentUser.id);
            setCurrentUser(updatedCurrent || loadedCurrentUser);
          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        } catch (err) {
          console.error('Error loading data from storage:', err);
          setError('Failed to load application data from localStorage.');
          setLoading(false);
        }
      }, 300);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    } catch (err) {
      console.error('Unexpected initialization error:', err);
      setError('An unexpected error occurred during application initialization.');
      setLoading(false);
    }
  }, []);

  // Persist state to localStorage whenever it changes (only after initial load completes)
  useEffect(() => {
    if (!loading) {
      saveData(STORAGE_KEYS.USERS, users);
    }
  }, [users, loading]);

  useEffect(() => {
    if (!loading) {
      saveData(STORAGE_KEYS.ASSIGNMENTS, assignments);
    }
  }, [assignments, loading]);

  useEffect(() => {
    if (!loading) {
      saveData(STORAGE_KEYS.SUBMISSIONS, submissions);
    }
  }, [submissions, loading]);

  useEffect(() => {
    if (!loading) {
      saveData(STORAGE_KEYS.CURRENT_USER, currentUser);
    }
  }, [currentUser, loading]);

  // Auth actions
  const login = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Assignment actions
  const addAssignment = (data) => {
    const newId = data.id || generateId('asg');
    const assignedTo = Array.isArray(data.assignedTo) ? data.assignedTo : [];

    const newAssignment = {
      ...data,
      id: newId,
      assignedTo,
    };

    setAssignments((prev) => [...prev, newAssignment]);

    // Create 'not_submitted' submission records for each assigned student
    setSubmissions((prev) => {
      const newSubmissions = assignedTo.map((studentId) => ({
        assignmentId: newId,
        studentId,
        status: 'not_submitted',
        submittedAt: null,
      }));
      return [...prev, ...newSubmissions];
    });

    return newAssignment;
  };

  const updateAssignment = (id, data) => {
    setAssignments((prev) =>
      prev.map((asg) => (asg.id === id ? { ...asg, ...data } : asg))
    );

    // Keep submissions in sync if assignedTo has changed
    if (data.assignedTo !== undefined) {
      const newAssignedList = Array.isArray(data.assignedTo) ? data.assignedTo : [];

      setSubmissions((prev) => {
        const otherSubmissions = prev.filter((s) => s.assignmentId !== id);
        const existingForThisAsg = prev.filter((s) => s.assignmentId === id);

        // Keep existing status for remaining students, create 'not_submitted' for newly added,
        // and omit students who were unassigned
        const updatedForThisAsg = newAssignedList.map((studentId) => {
          const existing = existingForThisAsg.find((s) => s.studentId === studentId);
          if (existing) {
            return existing;
          }
          return {
            assignmentId: id,
            studentId,
            status: 'not_submitted',
            submittedAt: null,
          };
        });

        return [...otherSubmissions, ...updatedForThisAsg];
      });
    }
  };

  const deleteAssignment = (id) => {
    // Remove the assignment
    setAssignments((prev) => prev.filter((asg) => asg.id !== id));
    // Remove all associated submissions
    setSubmissions((prev) => prev.filter((s) => s.assignmentId !== id));
  };

  const markSubmitted = (assignmentId, studentId) => {
    const timestamp = new Date().toISOString();

    setSubmissions((prev) => {
      const exists = prev.some(
        (s) => s.assignmentId === assignmentId && s.studentId === studentId
      );

      if (exists) {
        return prev.map((s) =>
          s.assignmentId === assignmentId && s.studentId === studentId
            ? { ...s, status: 'submitted', submittedAt: timestamp }
            : s
        );
      }

      return [
        ...prev,
        {
          assignmentId,
          studentId,
          status: 'submitted',
          submittedAt: timestamp,
        },
      ];
    });
  };

  const value = {
    users,
    assignments,
    submissions,
    currentUser,
    loading,
    error,
    login,
    logout,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    markSubmitted,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}


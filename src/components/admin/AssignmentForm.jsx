import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Helper to convert an ISO date string to datetime-local input format (YYYY-MM-DDTHH:mm)
 */
function toInputDateTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Validates whether a string is a valid HTTP/HTTPS URL
 */
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Modal form for creating and editing assignments.
 *
 * @param {{
 *   isOpen: boolean,
 *   initialData: object | null,
 *   onClose: () => void
 * }} props
 */
export default function AssignmentForm({ isOpen, initialData, onClose }) {
  const { users, currentUser, addAssignment, updateAssignment } = useApp();

  const students = users.filter((u) => u.role === 'student');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [assignMode, setAssignMode] = useState('all'); // 'all' | 'selected'
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [errors, setErrors] = useState({});

  // Reset or pre-fill form fields whenever initialData or isOpen changes
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDueDate(toInputDateTime(initialData.dueDate));
      setDriveLink(initialData.driveLink || '');

      const assigned = Array.isArray(initialData.assignedTo) ? initialData.assignedTo : [];
      const isAll = students.length > 0 && assigned.length === students.length &&
        students.every((s) => assigned.includes(s.id));

      if (isAll) {
        setAssignMode('all');
        setSelectedStudentIds(students.map((s) => s.id));
      } else {
        setAssignMode('selected');
        setSelectedStudentIds(assigned);
      }
    } else {
      // Default blank values for Create mode
      setTitle('');
      setDescription('');
      setDueDate('');
      setDriveLink('');
      setAssignMode('all');
      setSelectedStudentIds(students.map((s) => s.id));
    }

    setErrors({});
  }, [isOpen, initialData, users]);

  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEditMode = Boolean(initialData);

  // Toggle individual student selection
  const handleToggleStudent = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const parsedDate = new Date(dueDate);
      if (isNaN(parsedDate.getTime())) {
        newErrors.dueDate = 'Please enter a valid date and time';
      }
    }

    if (!driveLink.trim()) {
      newErrors.driveLink = 'Drive link is required';
    } else if (!isValidUrl(driveLink.trim())) {
      newErrors.driveLink = 'Drive link must be a valid URL (e.g. https://drive.google.com/...)';
    }

    if (assignMode === 'selected' && selectedStudentIds.length === 0) {
      newErrors.assignedTo = 'Please select at least one student';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const finalAssignedTo =
      assignMode === 'all'
        ? students.map((s) => s.id)
        : selectedStudentIds;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate).toISOString(),
      driveLink: driveLink.trim(),
      assignedTo: finalAssignedTo,
    };

    if (isEditMode) {
      updateAssignment(initialData.id, payload);
    } else {
      addAssignment({
        ...payload,
        createdBy: currentUser?.id,
      });
    }

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assignment-form-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <h3 id="assignment-form-title" className="text-xl font-bold text-slate-900">
            {isEditMode ? 'Edit Assignment' : 'Create New Assignment'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition"
            aria-label="Close form"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="form-title" className="block text-sm font-semibold text-slate-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="form-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              placeholder="e.g. Assignment 1: Distributed Systems Project"
              className={`mt-1.5 block w-full px-3.5 py-2 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="form-description" className="block text-sm font-semibold text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="form-description"
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
              }}
              placeholder="Provide instructions, project requirements, and rubric details..."
              className={`mt-1.5 block w-full px-3.5 py-2 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Due Date & Drive Link Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label htmlFor="form-due-date" className="block text-sm font-semibold text-slate-700">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                id="form-due-date"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: '' }));
                }}
                className={`mt-1.5 block w-full px-3.5 py-2 rounded-lg border text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                  errors.dueDate
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.dueDate}</p>
              )}
            </div>

            {/* Drive Link */}
            <div>
              <label htmlFor="form-drive-link" className="block text-sm font-semibold text-slate-700">
                Drive Link <span className="text-red-500">*</span>
              </label>
              <input
                id="form-drive-link"
                type="url"
                value={driveLink}
                onChange={(e) => {
                  setDriveLink(e.target.value);
                  if (errors.driveLink) setErrors((prev) => ({ ...prev, driveLink: '' }));
                }}
                placeholder="https://drive.google.com/..."
                className={`mt-1.5 block w-full px-3.5 py-2 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                  errors.driveLink
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
              {errors.driveLink && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.driveLink}</p>
              )}
            </div>
          </div>

          {/* Assign To Section */}
          <div className="pt-2 border-t border-slate-100">
            <span className="block text-sm font-semibold text-slate-700 mb-2">
              Assign To <span className="text-red-500">*</span>
            </span>

            <div className="flex items-center gap-6 mb-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="assignMode"
                  value="all"
                  checked={assignMode === 'all'}
                  onChange={() => {
                    setAssignMode('all');
                    if (errors.assignedTo) setErrors((prev) => ({ ...prev, assignedTo: '' }));
                  }}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>All students ({students.length})</span>
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="assignMode"
                  value="selected"
                  checked={assignMode === 'selected'}
                  onChange={() => {
                    setAssignMode('selected');
                    if (errors.assignedTo) setErrors((prev) => ({ ...prev, assignedTo: '' }));
                  }}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>Selected students</span>
              </label>
            </div>

            {/* Checkbox list when 'selected' is active */}
            {assignMode === 'selected' && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg max-h-48 overflow-y-auto space-y-2">
                {students.map((student) => {
                  const isChecked = selectedStudentIds.includes(student.id);
                  return (
                    <label
                      key={student.id}
                      className="flex items-center gap-2.5 p-1.5 hover:bg-slate-100 rounded cursor-pointer transition text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          handleToggleStudent(student.id);
                          if (errors.assignedTo) setErrors((prev) => ({ ...prev, assignedTo: '' }));
                        }}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-medium text-slate-800">{student.name}</span>
                      <span className="text-xs text-slate-400">({student.email})</span>
                    </label>
                  );
                })}
              </div>
            )}

            {errors.assignedTo && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.assignedTo}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isEditMode ? 'Save Changes' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


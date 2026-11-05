import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/helpers';
import ProgressBar from '../common/ProgressBar';
import StudentStatusList from './StudentStatusList';

/**
 * AdminAssignmentCard displays assignment information for professors/admins,
 * including completion progress bar, student status tracking, and Edit/Delete controls.
 *
 * @param {{
 *   assignment: object,
 *   onEdit: (assignment: object) => void,
 *   onDelete: (assignment: object) => void
 * }} props
 */
export default function AdminAssignmentCard({ assignment, onEdit, onDelete }) {
  const { users, submissions } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const students = users.filter((u) => u.role === 'student');
  const assignedList = Array.isArray(assignment.assignedTo) ? assignment.assignedTo : [];
  const totalAssigned = assignedList.length;

  // Calculate submission stats for this assignment
  const submittedCount = submissions.filter(
    (s) =>
      s.assignmentId === assignment.id &&
      assignedList.includes(s.studentId) &&
      s.status === 'submitted'
  ).length;

  const percentage = totalAssigned > 0 ? Math.round((submittedCount / totalAssigned) * 100) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between">
      <div>
        {/* Top Header: Due Date & Student Count */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <span className="text-xs text-slate-500 font-medium">
            Due: {formatDate(assignment.dueDate) || 'No deadline'}
          </span>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 shrink-0">
            {totalAssigned} {totalAssigned === 1 ? 'student' : 'students'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug break-words">
          {assignment.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed break-words">
          {assignment.description || 'No description provided.'}
        </p>

        {/* Drive Link */}
        {assignment.driveLink && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline py-1 min-h-[36px]"
            >
              <span>Open Drive Link</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}

        {/* Class Completion Progress Bar Section */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1 mb-1.5">
            <span className="font-semibold text-slate-700">Class Completion</span>
            <span className="font-medium text-slate-500">
              {submittedCount} of {totalAssigned} submitted ({percentage}%)
            </span>
          </div>
          <ProgressBar value={submittedCount} max={totalAssigned} heightClass="h-2" />
        </div>

        {/* Expandable Student Status Section */}
        <div className="mt-3 pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-full text-left flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-800 py-1.5 min-h-[36px] transition cursor-pointer"
          >
            <span>{isExpanded ? 'Hide students' : 'View students'}</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md">
              {isExpanded ? '▲' : '▼'}
            </span>
          </button>

          {isExpanded && (
            <div className="mt-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 max-h-48 overflow-y-auto">
              <StudentStatusList
                assignment={assignment}
                students={students}
                submissions={submissions}
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Edit & Delete */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(assignment)}
          className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 min-h-[38px] rounded-lg transition focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(assignment)}
          className="px-3.5 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 min-h-[38px] rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

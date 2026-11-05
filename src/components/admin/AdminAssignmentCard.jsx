import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/helpers';
import ProgressBar from '../common/ProgressBar';
import StudentStatusList from './StudentStatusList';

/**
 * AdminAssignmentCard displays assignment information for professors/admins,
 * styled for the KarLoJi theme.
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
    <div className="bg-white/95 border border-[#E3DAFF] border-l-4 border-l-[#3B1FA8] rounded-3xl p-5 shadow-[0_8px_30px_rgba(91,63,208,0.08)] hover:shadow-xl transition-all flex flex-col justify-between">
      <div>
        {/* Top Header: Due Date & Student Count */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <span className="text-xs text-slate-400 font-medium">
            Due: {formatDate(assignment.dueDate) || 'No deadline'}
          </span>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#EDE7FF] text-[#3B1FA8] border border-[#E3DAFF] shrink-0">
            {totalAssigned} {totalAssigned === 1 ? 'student' : 'students'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#1E1B4B] leading-snug break-words">
          {assignment.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed break-words">
          {assignment.description || 'No description provided.'}
        </p>

        {/* Drive Link */}
        {assignment.driveLink && (
          <div className="mt-3 pt-2.5 border-t border-[#F3EEFF]">
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B1FA8] hover:text-[#2E1685] underline py-0.5"
            >
              <span>Open Drive Link</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}

        {/* Class Completion Progress Bar Section */}
        <div className="mt-4 pt-3 border-t border-[#F3EEFF]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1 mb-1.5">
            <span className="font-bold text-[#1E1B4B]">Class Completion</span>
            <span className="font-semibold text-[#3B1FA8]">
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
            className="w-full text-left flex items-center justify-between text-xs font-bold text-[#3B1FA8] hover:text-[#2E1685] py-1.5 min-h-[36px] transition cursor-pointer"
          >
            <span>{isExpanded ? 'Hide students' : 'View students'}</span>
            <span className="text-[10px] bg-[#EDE7FF] text-[#3B1FA8] border border-[#E3DAFF] px-2 py-0.5 rounded-full">
              {isExpanded ? '▲' : '▼'}
            </span>
          </button>

          {isExpanded && (
            <div className="mt-2 p-3 bg-[#F9F7FF] rounded-2xl border border-[#E3DAFF] max-h-48 overflow-y-auto">
              <StudentStatusList
                assignment={assignment}
                students={students}
                submissions={submissions}
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Edit (Outlined Purple) & Delete (Outlined Red) */}
      <div className="mt-5 pt-4 border-t border-[#F3EEFF] flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={() => onEdit(assignment)}
          className="px-4 py-1.5 text-xs font-bold text-[#3B1FA8] bg-white hover:bg-[#EDE7FF] border border-[#3B1FA8] min-h-[36px] rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(assignment)}
          className="px-4 py-1.5 text-xs font-bold text-red-600 bg-white hover:bg-red-50 border border-red-300 min-h-[36px] rounded-full transition focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

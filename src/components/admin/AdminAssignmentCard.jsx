import { formatDate } from '../../utils/helpers';

/**
 * AdminAssignmentCard displays assignment information for professors/admins,
 * including student count, Drive link, and actions to Edit or Delete.
 *
 * @param {{
 *   assignment: object,
 *   onEdit: (assignment: object) => void,
 *   onDelete: (assignment: object) => void
 * }} props
 */
export default function AdminAssignmentCard({ assignment, onEdit, onDelete }) {
  const studentCount = Array.isArray(assignment.assignedTo)
    ? assignment.assignedTo.length
    : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between">
      <div>
        {/* Top Header: Due Date & Student Count */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs text-slate-500 font-medium">
            Due: {formatDate(assignment.dueDate) || 'No deadline'}
          </span>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            {studentCount} {studentCount === 1 ? 'student' : 'students'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {assignment.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {assignment.description || 'No description provided.'}
        </p>

        {/* Drive Link */}
        {assignment.driveLink && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              <span>Open Drive Link</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </div>

      {/* Action Buttons: Edit & Delete */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(assignment)}
          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(assignment)}
          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


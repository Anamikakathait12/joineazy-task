import { formatDate, isOverdue } from '../../utils/helpers';

/**
 * AssignmentCard displays an individual assignment's details, status, Drive link,
 * and an action button to mark as submitted.
 *
 * @param {{
 *   assignment: object,
 *   submission: object,
 *   onMarkSubmitted: (assignment: object) => void
 * }} props
 */
export default function AssignmentCard({ assignment, submission, onMarkSubmitted }) {
  const isSubmitted = submission?.status === 'submitted';
  const overdue = !isSubmitted && isOverdue(assignment.dueDate);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between">
      <div>
        {/* Top Header: Due Date & Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs text-slate-500 font-medium">
            Due: {formatDate(assignment.dueDate) || 'No deadline'}
          </span>

          {isSubmitted ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Submitted
            </span>
          ) : overdue ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
              Overdue
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Not Submitted
            </span>
          )}
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

      {/* Card Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        {isSubmitted ? (
          <p className="text-xs text-emerald-600 font-medium">
            Submitted on {formatDate(submission.submittedAt)}
          </p>
        ) : (
          <button
            type="button"
            onClick={() => onMarkSubmitted(assignment)}
            className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Mark as Submitted
          </button>
        )}
      </div>
    </div>
  );
}


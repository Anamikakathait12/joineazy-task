import { formatDate } from '../../utils/helpers';

/**
 * StudentStatusList lists each student assigned to an assignment with their submission status,
 * styled for the KarLoJi theme.
 *
 * @param {{
 *   assignment: object,
 *   students: Array<object>,
 *   submissions: Array<object>
 * }} props
 */
export default function StudentStatusList({ assignment, students = [], submissions = [] }) {
  const assignedIds = Array.isArray(assignment?.assignedTo) ? assignment.assignedTo : [];

  if (assignedIds.length === 0) {
    return (
      <div className="py-4 px-3 text-center bg-white rounded-2xl border border-dashed border-[#E6DEFF]">
        <p className="text-xs font-bold text-[#1E1B4B]">No students assigned</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Edit this assignment to assign students.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-[#E6DEFF]/60 mt-1">
      {assignedIds.map((studentId) => {
        const student = students.find((u) => u.id === studentId);
        const submission = submissions.find(
          (s) => s.assignmentId === assignment.id && s.studentId === studentId
        );
        const isSubmitted = submission?.status === 'submitted';

        return (
          <li
            key={studentId}
            className="py-2.5 flex items-center justify-between text-xs gap-2"
          >
            <div className="min-w-0">
              <p className="font-bold text-[#1E1B4B] truncate">
                {student?.name || `Student (${studentId})`}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {student?.email || ''}
              </p>
            </div>

            <div className="flex flex-col items-end shrink-0">
              {isSubmitted ? (
                <>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Submitted</span>
                  </span>
                  {submission?.submittedAt && (
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                      {formatDate(submission.submittedAt)}
                    </span>
                  )}
                </>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFEDD5] text-[#C2410C]">
                  Not Submitted
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

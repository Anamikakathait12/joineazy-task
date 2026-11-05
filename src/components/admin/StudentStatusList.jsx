import { formatDate } from '../../utils/helpers';

/**
 * StudentStatusList lists each student assigned to an assignment with their submission status.
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
      <div className="py-4 px-3 text-center bg-white rounded-lg border border-dashed border-slate-200">
        <p className="text-xs font-semibold text-slate-700">No students assigned</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Edit this assignment to assign students.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 mt-2">
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
              <p className="font-semibold text-slate-800 truncate">
                {student?.name || `Student (${studentId})`}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {student?.email || ''}
              </p>
            </div>

            <div className="flex flex-col items-end shrink-0">
              {isSubmitted ? (
                <>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Submitted
                  </span>
                  {submission?.submittedAt && (
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {formatDate(submission.submittedAt)}
                    </span>
                  )}
                </>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
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


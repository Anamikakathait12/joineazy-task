import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProgressSummary from '../components/student/ProgressSummary';
import AssignmentCard from '../components/student/AssignmentCard';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';

export default function StudentDashboard() {
  const { currentUser, assignments, submissions, markSubmitted } = useApp();
  const [pendingAssignment, setPendingAssignment] = useState(null);

  // Filter assignments to only those explicitly assigned to this student
  const studentAssignments = assignments.filter(
    (asg) => Array.isArray(asg.assignedTo) && asg.assignedTo.includes(currentUser?.id)
  );

  // Map each assignment to this student's submission record
  const getStudentSubmission = (assignmentId) => {
    return submissions.find(
      (sub) => sub.assignmentId === assignmentId && sub.studentId === currentUser?.id
    );
  };

  // Count submitted assignments
  const submittedCount = studentAssignments.filter((asg) => {
    const sub = getStudentSubmission(asg.id);
    return sub?.status === 'submitted';
  }).length;

  const totalCount = studentAssignments.length;

  // Step 1: Open the confirmation dialog with the selected assignment
  const handleOpenConfirm = (assignment) => {
    setPendingAssignment(assignment);
  };

  // Step 2: Confirm and submit
  const handleConfirmSubmission = () => {
    if (pendingAssignment && currentUser?.id) {
      markSubmitted(pendingAssignment.id, currentUser.id);
      setPendingAssignment(null);
    }
  };

  // Step 2 Cancel: Dismiss modal without changing state
  const handleCancelSubmission = () => {
    setPendingAssignment(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Title & Greeting */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          My Assignments
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Review your course assignments, access drive resources, and submit your work.
        </p>
      </div>

      {/* Progress Bar Summary */}
      <ProgressSummary total={totalCount} submitted={submittedCount} />

      {/* Assignments Grid or Empty State */}
      {totalCount === 0 ? (
        <EmptyState
          title="No assignments yet"
          description="You don't have any assignments assigned right now. Check back later or contact your professor."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentAssignments.map((assignment) => {
            const submission = getStudentSubmission(assignment.id);
            return (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                submission={submission}
                onMarkSubmitted={handleOpenConfirm}
              />
            );
          })}
        </div>
      )}

      {/* Two-step Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(pendingAssignment)}
        title="Confirm Submission"
        message="Are you sure? This cannot be undone."
        confirmLabel="Yes, submit"
        cancelLabel="Cancel"
        onConfirm={handleConfirmSubmission}
        onCancel={handleCancelSubmission}
      />
    </main>
  );
}

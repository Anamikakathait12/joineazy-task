import { useState } from 'react';
import { useApp } from '../context/AppContext';
import AdminAssignmentCard from '../components/admin/AdminAssignmentCard';
import AssignmentForm from '../components/admin/AssignmentForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';

export default function AdminDashboard() {
  const { currentUser, assignments, deleteAssignment } = useApp();
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Strictly isolate assignments to only those created by the current admin
  const adminAssignments = assignments.filter(
    (asg) => asg.createdBy === currentUser?.id
  );

  // Open form in Create mode
  const handleOpenCreate = () => {
    setEditingAssignment(null);
    setIsFormOpen(true);
  };

  // Open form in Edit mode
  const handleOpenEdit = (assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAssignment(null);
  };

  // Open confirmation modal for deleting
  const handleOpenDeleteConfirm = (assignment) => {
    setAssignmentToDelete(assignment);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      deleteAssignment(assignmentToDelete.id);
      setAssignmentToDelete(null);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setAssignmentToDelete(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Section Heading: "My Assignments" with clipboard icon and "+ Create Assignment" button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E3DAFF]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#EDE7FF] text-[#3B1FA8] flex items-center justify-center shrink-0 shadow-xs">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
              My Assignments
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-medium">
              Manage your created assignments and track class completion in real time.
            </p>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] bg-[#3B1FA8] hover:bg-[#2E1685] text-white text-sm font-bold rounded-full shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      {/* Assignments Grid or Empty State */}
      {adminAssignments.length === 0 ? (
        <EmptyState
          title="Create your first assignment"
          description="You haven't created any course assignments yet. Click below to draft and assign coursework to students."
          actionLabel="Create Assignment"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {adminAssignments.map((assignment) => (
            <AdminAssignmentCard
              key={assignment.id}
              assignment={assignment}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDeleteConfirm}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Assignment Modal Form */}
      <AssignmentForm
        isOpen={isFormOpen}
        initialData={editingAssignment}
        onClose={handleCloseForm}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(assignmentToDelete)}
        title="Delete Assignment"
        message={`Are you sure you want to delete "${assignmentToDelete?.title}"? This action cannot be undone and will permanently remove all associated student submissions.`}
        confirmLabel="Delete Assignment"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
}

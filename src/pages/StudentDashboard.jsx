import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ProgressSummary from '../components/student/ProgressSummary';
import AssignmentCard from '../components/student/AssignmentCard';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { formatDate } from '../utils/helpers';

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

  // Upcoming deadlines (student's unsubmitted assignments sorted by due date, max 3)
  const upcomingDeadlines = useMemo(() => {
    return studentAssignments
      .filter((asg) => {
        const sub = getStudentSubmission(asg.id);
        return sub?.status !== 'submitted';
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  }, [studentAssignments, submissions, currentUser?.id]);

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

  // Dynamic greeting by hour (initialized once on mount)
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    return hour < 12
      ? 'Good Morning'
      : hour < 18
      ? 'Good Afternoon'
      : 'Good Evening';
  });

  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Student';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* ========================================================
          1) GREETING BANNER (Match Image 2)
      ======================================================== */}
      <div className="relative bg-gradient-to-r from-white via-[#F5EDFF] to-[#EAE0FF] border border-[#E3DAFF] rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(91,63,208,0.06)] overflow-hidden">
        {/* Decorative Sparkles */}
        <div className="absolute top-4 right-1/3 text-purple-300 opacity-60 pointer-events-none select-none text-xs" aria-hidden="true">✦</div>
        <div className="absolute bottom-5 left-1/2 text-purple-400 opacity-70 pointer-events-none select-none text-sm" aria-hidden="true">✦</div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1B4B] tracking-tight">
              {greeting},{' '}
              <span className="text-[#3B1FA8]">{firstName}!</span>{' '}
              <span className="inline-block animate-wave" role="img" aria-label="wave">👋</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              &ldquo;Small steps today, big achievements tomorrow!&rdquo;
            </p>

            <div className="mt-5">
              <a
                href="#assignments-section"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E1B4B] hover:bg-[#140E3A] text-white text-xs sm:text-sm font-bold rounded-full transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
              >
                <span>View My Assignments</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Decorative Student & Cat Graphic Banner Block */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 pr-4 select-none pointer-events-none" aria-hidden="true">
            <div className="font-cursive text-2xl text-[#3B1FA8] -rotate-3 mb-1">
              You&apos;ve got this! ♡
            </div>
            {/* Cute Studying Character & Cat SVG */}
            <svg className="w-40 h-28 text-purple-400" viewBox="0 0 160 100" fill="none">
              {/* Laptop screen */}
              <rect x="35" y="45" width="46" height="30" rx="3" fill="#140E3A" />
              <path d="M54 58l4-4 4 4" stroke="#EDE7FF" strokeWidth="2" strokeLinecap="round" />
              <rect x="25" y="75" width="66" height="4" rx="2" fill="#3B1FA8" />
              {/* Student head and hair */}
              <circle cx="95" cy="38" r="16" fill="#FED7AA" />
              <circle cx="106" cy="22" r="9" fill="#1E1B4B" />
              <circle cx="85" cy="24" r="8" fill="#1E1B4B" />
              <path d="M82 36c0-9 6-16 16-16s16 7 16 16v8H82v-8z" fill="#1E1B4B" />
              <circle cx="90" cy="38" r="1.5" fill="#1E1B4B" />
              <circle cx="100" cy="38" r="1.5" fill="#1E1B4B" />
              <path d="M93 43q2 2 4 0" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" />
              {/* Arm leaning */}
              <path d="M96 52c-4 4-8 12-8 23" stroke="#FED7AA" strokeWidth="5" strokeLinecap="round" />
              <path d="M92 75h18" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
              {/* Sleeping Cat */}
              <ellipse cx="128" cy="74" rx="14" ry="10" fill="#FFFFFF" stroke="#E3DAFF" strokeWidth="1.5" />
              <polygon points="120,66 123,60 126,67" fill="#FCE7F3" />
              <polygon points="132,67 135,60 138,66" fill="#FCE7F3" />
              <path d="M124 73q2 2 4 0" stroke="#1E1B4B" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================================
          2) ASSIGNMENTS SECTION (Match Image 2)
      ======================================================== */}
      <section id="assignments-section" aria-labelledby="assignments-heading">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <svg
              className="w-5 h-5 text-[#3B1FA8]"
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
            <h2 id="assignments-heading" className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">
              My Assignments
            </h2>
          </div>

          <span className="text-xs font-bold text-[#3B1FA8] hover:text-[#2E1685] cursor-pointer">
            View All &rarr;
          </span>
        </div>

        {/* Grid or Empty State */}
        {totalCount === 0 ? (
          <EmptyState
            title="No assignments yet"
            description="You don't have any assignments assigned right now. Check back later or contact your professor."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {studentAssignments.map((assignment, index) => {
              const submission = getStudentSubmission(assignment.id);
              return (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  submission={submission}
                  onMarkSubmitted={handleOpenConfirm}
                  iconType={index}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================
          3) BOTTOM ROW 3-COLUMN GRID (Match Image 2)
          a) Your Progress card
          b) Upcoming Deadlines card
          c) Decorative astronaut motivational card
      ======================================================== */}
      <section aria-label="Student Overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {/* Card A: Your Progress */}
        <ProgressSummary total={totalCount} submitted={submittedCount} />

        {/* Card B: Upcoming Deadlines */}
        <div className="bg-white/95 border border-[#E3DAFF] rounded-3xl p-6 shadow-[0_8px_30px_rgba(91,63,208,0.08)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#3B1FA8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-sm font-extrabold text-[#1E1B4B]">
                  Upcoming Deadlines
                </h3>
              </div>
              <span className="text-xs font-bold text-[#3B1FA8]">View All &rarr;</span>
            </div>

            {upcomingDeadlines.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 font-medium">
                🎉 All caught up! No pending deadlines.
              </div>
            ) : (
              <div className="space-y-3.5 mt-2">
                {upcomingDeadlines.map((asg, idx) => {
                  const isFirst = idx === 0;
                  return (
                    <div key={asg.id} className="flex items-center gap-3 text-xs">
                      {/* Timeline Dot */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          isFirst ? 'bg-[#F97316]' : 'bg-[#5B3FD0]'
                        }`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1 truncate">
                        <span className="font-bold text-[#1E1B4B]">
                          {formatDate(asg.dueDate) || 'Soon'}
                        </span>
                        <span className="text-slate-400 mx-1.5">—</span>
                        <span className="text-slate-600 truncate font-medium">
                          {asg.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Card C: Motivational Decorative Astronaut Card */}
        <div
          className="bg-gradient-to-br from-[#140E3A] to-[#24135E] border border-[#2B1B6E] rounded-3xl p-6 shadow-md text-white relative overflow-hidden flex flex-col justify-between min-h-[170px]"
          aria-hidden="true"
        >
          {/* Background Sparkles */}
          <div className="absolute top-3 right-6 text-purple-300 opacity-70 text-xs">✦</div>
          <div className="absolute bottom-10 left-5 text-[#FBBF24] opacity-80 text-xs">✦</div>
          <div className="absolute top-1/2 left-1/3 text-purple-400 opacity-50 text-[10px]">✦</div>

          {/* Cursive Handwriting Message */}
          <div className="relative z-10">
            <p className="font-cursive text-2xl text-pink-200 leading-tight">
              Keep going,
            </p>
            <p className="font-cursive text-2xl text-pink-300 leading-tight flex items-center gap-1.5">
              <span>You&apos;re doing great!</span>
              <span className="text-pink-400 text-xl">♥</span>
            </p>
          </div>

          {/* Astronaut Illustration at Bottom Right */}
          <div className="flex justify-end relative z-10 pointer-events-none select-none">
            <svg className="w-24 h-20" viewBox="0 0 100 80" fill="none">
              {/* Moon surface */}
              <ellipse cx="50" cy="80" rx="60" ry="15" fill="#3B1FA8" opacity="0.3" />
              {/* Laptop */}
              <rect x="25" y="55" width="28" height="18" rx="2" fill="#5B3FD0" />
              <polygon points="37,62 41,62 39,66" fill="#EDE7FF" />
              <rect x="20" y="71" width="38" height="2" rx="1" fill="#EDE7FF" />
              {/* Astronaut helmet */}
              <circle cx="70" cy="40" r="16" fill="#FFFFFF" stroke="#E3DAFF" strokeWidth="2" />
              <ellipse cx="70" cy="40" rx="10" ry="8" fill="#140E3A" />
              <ellipse cx="68" cy="38" rx="3" ry="2" fill="#93C5FD" opacity="0.8" />
              {/* Suit */}
              <rect x="58" y="54" width="24" height="22" rx="6" fill="#FFFFFF" />
              {/* Floating planet */}
              <circle cx="88" cy="18" r="6" fill="#8B5CF6" opacity="0.8" />
              <ellipse cx="88" cy="18" rx="9" ry="2" stroke="#EDE7FF" strokeWidth="1" transform="rotate(-20 88 18)" />
            </svg>
          </div>
        </div>
      </section>

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

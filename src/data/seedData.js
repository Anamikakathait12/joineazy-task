// 2 admins and 5 students
export const users = [
  {
    id: 'admin-1',
    name: 'Dr. Alan Turing',
    email: 'alan.turing@university.edu',
    role: 'admin',
  },
  {
    id: 'admin-2',
    name: 'Prof. Grace Hopper',
    email: 'grace.hopper@university.edu',
    role: 'admin',
  },
  {
    id: 'student-1',
    name: 'Eleven',
    email: 'eleven@student.edu',
    role: 'student',
  },
  {
    id: 'student-2',
    name: 'Mike Wheeler',
    email: 'mike.wheeler@student.edu',
    role: 'student',
  },
  {
    id: 'student-3',
    name: 'Will Byers',
    email: 'willbyers@student.edu',
    role: 'student',
  },
  {
    id: 'student-4',
    name: 'Steve Harrington',
    email: 'steve.harrington@student.edu',
    role: 'student',
  },
  {
    id: 'student-5',
    name: 'Lucas Sinclair',
    email: 'lucas.sinclair@student.edu',
    role: 'student',
  },
];

// 4-5 sample assignments created by admins and assigned to various students
export const assignments = [
  {
    id: 'asg-1',
    title: 'Assignment 1: Turing Machine Simulator',
    description: 'Implement a state-machine based single-tape Turing machine simulator in JavaScript.',
    dueDate: '2026-11-20T23:59:59.000Z',
    driveLink: 'https://drive.google.com/drive/folders/sample-turing-assignment',
    createdBy: 'admin-1',
    assignedTo: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5'],
  },
  {
    id: 'asg-2',
    title: 'Assignment 2: Decidability & Halting Problem Essay',
    description: 'Write a 1500-word essay explaining the proof of undecidability for the Halting Problem.',
    dueDate: '2026-11-01T23:59:59.000Z', // Past date to test overdue / already submitted
    driveLink: 'https://drive.google.com/drive/folders/sample-halting-problem',
    createdBy: 'admin-1',
    assignedTo: ['student-1', 'student-2', 'student-3'],
  },
  {
    id: 'asg-3',
    title: 'Assignment 3: Compiler Intermediate Representation',
    description: 'Design a three-address code IR generator for an arithmetic expression grammar.',
    dueDate: '2026-12-05T18:00:00.000Z',
    driveLink: 'https://drive.google.com/drive/folders/sample-compiler-ir',
    createdBy: 'admin-2',
    assignedTo: ['student-2', 'student-3', 'student-4', 'student-5'],
  },
  {
    id: 'asg-4',
    title: 'Assignment 4: Subroutine Call Stack Analysis',
    description: 'Analyze stack memory layouts and register preservation conventions across ABI standards.',
    dueDate: '2026-12-15T23:59:59.000Z',
    driveLink: 'https://drive.google.com/drive/folders/sample-call-stack',
    createdBy: 'admin-2',
    assignedTo: ['student-1', 'student-4', 'student-5'],
  },
];

// Seeded submissions with a mix of 'submitted' and 'not_submitted'
export const submissions = [
  // For asg-1 (all 5 assigned)
  {
    assignmentId: 'asg-1',
    studentId: 'student-1',
    status: 'submitted',
    submittedAt: '2026-11-03T10:15:00.000Z',
  },
  {
    assignmentId: 'asg-1',
    studentId: 'student-2',
    status: 'submitted',
    submittedAt: '2026-11-04T16:45:00.000Z',
  },
  {
    assignmentId: 'asg-1',
    studentId: 'student-3',
    status: 'not_submitted',
    submittedAt: null,
  },
  {
    assignmentId: 'asg-1',
    studentId: 'student-4',
    status: 'not_submitted',
    submittedAt: null,
  },
  {
    assignmentId: 'asg-1',
    studentId: 'student-5',
    status: 'submitted',
    submittedAt: '2026-11-02T09:30:00.000Z',
  },

  // For asg-2 (student-1, student-2, student-3)
  {
    assignmentId: 'asg-2',
    studentId: 'student-1',
    status: 'submitted',
    submittedAt: '2026-10-30T14:20:00.000Z',
  },
  {
    assignmentId: 'asg-2',
    studentId: 'student-2',
    status: 'not_submitted',
    submittedAt: null,
  },
  {
    assignmentId: 'asg-2',
    studentId: 'student-3',
    status: 'submitted',
    submittedAt: '2026-10-31T20:10:00.000Z',
  },

  // For asg-3 (student-2, student-3, student-4, student-5)
  {
    assignmentId: 'asg-3',
    studentId: 'student-2',
    status: 'submitted',
    submittedAt: '2026-11-01T11:00:00.000Z',
  },
  {
    assignmentId: 'asg-3',
    studentId: 'student-3',
    status: 'not_submitted',
    submittedAt: null,
  },
  {
    assignmentId: 'asg-3',
    studentId: 'student-4',
    status: 'not_submitted',
    submittedAt: null,
  },
  {
    assignmentId: 'asg-3',
    studentId: 'student-5',
    status: 'not_submitted',
    submittedAt: null,
  },

  // For asg-4 (student-1, student-4, student-5)
  {
    assignmentId: 'asg-4',
    studentId: 'student-1',
    status: 'not_submitted',
    submittedAt: null,
  },
  {
    assignmentId: 'asg-4',
    studentId: 'student-4',
    status: 'submitted',
    submittedAt: '2026-11-04T12:00:00.000Z',
  },
  {
    assignmentId: 'asg-4',
    studentId: 'student-5',
    status: 'not_submitted',
    submittedAt: null,
  },
];

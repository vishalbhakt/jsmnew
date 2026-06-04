export const publicCourses = [
  {
    id: 1,
    title: "Primary Learning",
    grade_range: "Class 1-5",
    description: "Foundational literacy, numeracy, language, and activity-led learning.",
  },
  {
    id: 2,
    title: "Middle School Bridge",
    grade_range: "Class 6-8",
    description: "Concept clarity across science, mathematics, social science, and communication.",
  },
  {
    id: 3,
    title: "Secondary Foundation",
    grade_range: "Class 9-10",
    description: "Exam-focused academic support with regular assessments and performance reviews.",
  },
];

export const facilities = [
  {
    id: 1,
    title: "Smart Classrooms",
    description: "Digital boards, structured lesson plans, and focused classroom delivery.",
    icon: "Monitor",
  },
  {
    id: 2,
    title: "Learning Resources",
    description: "PDF notes, assignments, recorded lectures, and revision material.",
    icon: "Library",
  },
  {
    id: 3,
    title: "Progress Tracking",
    description: "Attendance, results, fee status, and announcements available from one portal.",
    icon: "LineChart",
  },
];

export const gallery = [
  { id: 1, title: "Classroom Session", caption: "Interactive mathematics practice." },
  { id: 2, title: "Assessment Review", caption: "Teacher-led performance review." },
  { id: 3, title: "Digital Learning", caption: "Blended notes and video support." },
];

export const dashboardStats = {
  admin: [
    { label: "Students", value: "420", trend: "+18 this term" },
    { label: "Teachers", value: "34", trend: "6 departments" },
    { label: "Fee Collection", value: "86%", trend: "Term 1" },
    { label: "Attendance", value: "93%", trend: "30-day average" },
  ],
  teacher: [
    { label: "Assigned Students", value: "64", trend: "2 classes" },
    { label: "Assignments", value: "12", trend: "4 due this week" },
    { label: "Attendance", value: "95%", trend: "Today" },
    { label: "Pending Reviews", value: "18", trend: "Submissions" },
  ],
  student: [
    { label: "Attendance", value: "94%", trend: "Current month" },
    { label: "Assignments", value: "3", trend: "Pending" },
    { label: "Average Score", value: "86%", trend: "Latest tests" },
    { label: "Fees", value: "1", trend: "Pending plan" },
  ],
};

export const performanceData = [
  { name: "Jan", attendance: 91, results: 78, fees: 65 },
  { name: "Feb", attendance: 94, results: 82, fees: 72 },
  { name: "Mar", attendance: 92, results: 84, fees: 79 },
  { name: "Apr", attendance: 95, results: 86, fees: 83 },
  { name: "May", attendance: 93, results: 88, fees: 86 },
];

export const resourceFallbacks = {
  "/notes/": [
    { id: 1, title: "Algebra Formula Sheet", subject_name: "Mathematics", published_at: "2026-06-03" },
  ],
  "/assignments/": [
    { id: 1, title: "Linear Equations Practice", subject_name: "Mathematics", status: "published" },
  ],
  "/videos/": [
    { id: 1, title: "Introduction to Linear Equations", subject_name: "Mathematics", duration_minutes: 28 },
  ],
  "/attendance-records/": [
    { id: 1, student_name: "Rohan Kumar", status: "present", remarks: "On time" },
  ],
  "/results/": [
    { id: 1, assessment_title: "Unit Test 1", subject_name: "Mathematics", marks_obtained: "43.00", grade: "A" },
  ],
  "/payments/": [
    { id: 1, fee_title: "Term 1 Tuition Fee", amount: "12500.00", status: "pending" },
  ],
  "/students/": [
    { id: 1, user_name: "Rohan Kumar", admission_number: "ADM00001", roll_number: "10A-01" },
  ],
  "/users/": [
    { id: 1, full_name: "JSM Admin", email: "admin@jsmshiksha.local", role: "admin" },
  ],
  "/fee-plans/": [
    { id: 1, title: "Term 1 Tuition Fee", amount: "12500.00", due_date: "2026-07-03" },
  ],
  "/inquiries/": [
    { id: 1, student_name: "Priya Sharma", guardian_name: "Neha Sharma", status: "new" },
  ],
};

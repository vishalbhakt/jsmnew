import { Navigate, Route, Routes } from "react-router-dom";

import DashboardHome from "./dashboard/DashboardHome";
import Profile from "./dashboard/Profile";
import ResourcePage from "./dashboard/ResourcePage";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import About from "./pages/About";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./routes/RequireAuth";

function status(value) {
  return <span className="status-pill">{value || "active"}</span>;
}

function money(value) {
  if (!value) {
    return "-";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

const columns = {
  notes: [
    { key: "title", label: "Title" },
    { key: "subject_name", label: "Subject" },
    { key: "published_at", label: "Published" },
  ],
  assignments: [
    { key: "title", label: "Assignment" },
    { key: "subject_name", label: "Subject" },
    { key: "status", label: "Status", render: (row) => status(row.status) },
  ],
  videos: [
    { key: "title", label: "Lecture" },
    { key: "subject_name", label: "Subject" },
    { key: "duration_minutes", label: "Minutes" },
  ],
  attendance: [
    { key: "student_name", label: "Student" },
    { key: "status", label: "Status", render: (row) => status(row.status) },
    { key: "remarks", label: "Remarks" },
  ],
  results: [
    { key: "assessment_title", label: "Assessment" },
    { key: "subject_name", label: "Subject" },
    { key: "marks_obtained", label: "Marks" },
    { key: "grade", label: "Grade", render: (row) => status(row.grade) },
  ],
  payments: [
    { key: "fee_title", label: "Fee" },
    { key: "amount", label: "Amount", render: (row) => money(row.amount) },
    { key: "status", label: "Status", render: (row) => status(row.status) },
  ],
  students: [
    { key: "user_name", label: "Student" },
    { key: "admission_number", label: "Admission No." },
    { key: "roll_number", label: "Roll No." },
  ],
  users: [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (row) => status(row.role) },
  ],
  fees: [
    { key: "title", label: "Fee Plan" },
    { key: "amount", label: "Amount", render: (row) => money(row.amount) },
    { key: "due_date", label: "Due Date" },
  ],
  cms: [
    { key: "student_name", label: "Student" },
    { key: "guardian_name", label: "Guardian" },
    { key: "status", label: "Status", render: (row) => status(row.status) },
  ],
};

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="admission" element={<Admission />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route
            path="notes"
            element={
              <ResourcePage
                title="Notes"
                description="PDF notes and class resources available to the current role."
                endpoint="/notes/"
                columns={columns.notes}
              />
            }
          />
          <Route
            path="assignments"
            element={
              <ResourcePage
                title="Assignments"
                description="Assignments, due dates, and submission tracking."
                endpoint="/assignments/"
                columns={columns.assignments}
              />
            }
          />
          <Route
            path="videos"
            element={
              <ResourcePage
                title="Video Lectures"
                description="Published video lectures and classroom recordings."
                endpoint="/videos/"
                columns={columns.videos}
              />
            }
          />
          <Route
            path="attendance"
            element={
              <ResourcePage
                title="Attendance"
                description="Attendance records scoped to the signed-in user role."
                endpoint="/attendance-records/"
                columns={columns.attendance}
              />
            }
          />
          <Route
            path="results"
            element={
              <ResourcePage
                title="Results"
                description="Assessment results and published grades."
                endpoint="/results/"
                columns={columns.results}
              />
            }
          />
          <Route
            path="payments"
            element={
              <ResourcePage
                title="Payments"
                description="Fee plans, payment status, and receipts."
                endpoint="/payments/"
                columns={columns.payments}
              />
            }
          />
          <Route
            path="students"
            element={
              <ResourcePage
                title="Students"
                description="Students assigned to the current teacher or visible to admin."
                endpoint="/students/"
                columns={columns.students}
              />
            }
          />
          <Route
            path="users"
            element={
              <ResourcePage
                title="Manage Users"
                description="Admin view for users, roles, and account status."
                endpoint="/users/"
                columns={columns.users}
                kicker="Admin"
              />
            }
          />
          <Route
            path="fees"
            element={
              <ResourcePage
                title="Fees"
                description="Fee plans and collection status."
                endpoint="/fee-plans/"
                columns={columns.fees}
                kicker="Admin"
              />
            }
          />
          <Route
            path="cms"
            element={
              <ResourcePage
                title="CMS Inquiries"
                description="Admission inquiries submitted through the website."
                endpoint="/inquiries/"
                columns={columns.cms}
                kicker="Admin"
              />
            }
          />
          <Route
            path="reports"
            element={
              <ResourcePage
                title="Reports"
                description="Academic result records used for reporting."
                endpoint="/results/"
                columns={columns.results}
                kicker="Admin"
              />
            }
          />
          {/* Missing backend modules */}
          <Route path="classes" element={<ResourcePage title="Class Rooms" description="Manage classes" endpoint="/classes/" kicker="Academics" />} />
          <Route path="subjects" element={<ResourcePage title="Subjects" description="Manage subjects" endpoint="/subjects/" kicker="Academics" />} />
          <Route path="assessments" element={<ResourcePage title="Assessments" description="Manage assessments" endpoint="/assessments/" kicker="Academics" />} />
          <Route path="attendance-sessions" element={<ResourcePage title="Attendance Sessions" description="Manage sessions" endpoint="/attendance-sessions/" kicker="Attendance" />} />
          <Route path="submissions" element={<ResourcePage title="Submissions" description="Manage assignment submissions" endpoint="/submissions/" kicker="Learning" />} />
          <Route path="quizzes" element={<ResourcePage title="Quizzes" description="Manage quizzes" endpoint="/quizzes/" kicker="Learning" />} />
          <Route path="announcements" element={<ResourcePage title="Announcements" description="Manage announcements" endpoint="/announcements/" kicker="Communication" />} />
          <Route path="notifications" element={<ResourcePage title="Notifications" description="Manage notifications" endpoint="/notifications/" kicker="Communication" />} />
          <Route path="activity-logs" element={<ResourcePage title="Activity Logs" description="View activity logs" endpoint="/activity-logs/" kicker="Communication" />} />
          <Route path="pages" element={<ResourcePage title="Pages" description="Manage CMS pages" endpoint="/pages/" kicker="CMS" />} />
          <Route path="cms-courses" element={<ResourcePage title="Courses" description="Manage CMS courses" endpoint="/courses/" kicker="CMS" />} />
          <Route path="cms-facilities" element={<ResourcePage title="Facilities" description="Manage CMS facilities" endpoint="/facilities/" kicker="CMS" />} />
          <Route path="gallery" element={<ResourcePage title="Gallery" description="Manage CMS gallery" endpoint="/gallery/" kicker="CMS" />} />
          <Route path="contact-messages" element={<ResourcePage title="Contact Messages" description="Manage contact messages" endpoint="/contact-messages/" kicker="CMS" />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

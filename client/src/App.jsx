import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SpinnerFullPage from "./components/SpinnerFullPage";
import AppLayout from "./pages/AppLayout";
import Announcement from "./components/Admin/Announcement/Announcement";
import Department from "./components/Admin/Department/Department";
import StudentDashboard from "./components/Students/Dashboard";
import StudentMarks from "./components/Students/Marks";
import StaffLayout from "./pages/StaffLayout";
import StaffDashBoard from "./pages/StaffDashBoard";
import Course from "./components/Admin/Courses/Course";
import Student from "./components/Admin/Student/Student";
import Staff from "./components/Admin/Staff/Staff";
import Teaches from "./components/Admin/Teaches/Teaches";
import Takes from "./components/Admin/Takes/Takes";
const HomePage = lazy(() => import("./pages/Homepage"));
const StudentLogin = lazy(() => import("./pages/StudentLogin"));
const StaffLogin = lazy(() => import("./pages/StaffLogin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Contact = lazy(() => import("./pages/Contact"));
const Layout = lazy(() => import("./pages/Layout"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student" element={<Layout />}>
            <Route index element={<Navigate replace to="signin" />} />
            <Route path="signin" element={<StudentLogin />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="dashboard" />}
              ></Route>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="marks" element={<StudentMarks/>}/>
            </Route>
          </Route>
          <Route path="/staff" element={<Layout />}>
            <Route index element={<Navigate replace to="signin" />} />
            <Route path="signin" element={<StaffLogin />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <StaffLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<StaffDashBoard />} />
            </Route>
          </Route>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Navigate replace to="signin" />} />
            <Route path="signin" element={<AdminLogin />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="student" />} />
              <Route path="student" element={<Student />} />
              <Route path="staff" element={<Staff />} />
              <Route path="teaches" element={<Teaches />} />
              <Route path="takes" element={<Takes />} />
              <Route path="announcement" element={<Announcement />} />
              <Route path="course" element={<Course />} />
              <Route path="department" element={<Department />} />
            </Route>
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

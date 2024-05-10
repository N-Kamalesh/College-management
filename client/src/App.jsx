import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SpinnerFullPage from "./components/SpinnerFullPage";
import AppLayout from "./pages/AppLayout";
import Announcement from "./components/Admin/Announcement/Announcement";
import Department from "./components/Admin/Department/Department";
import StaffLayout from "./pages/StaffLayout";
import StaffDashBoard from "./pages/StaffDashBoard";
import StaffCourses from "./pages/StaffCourses";
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
              element={<ProtectedRoute></ProtectedRoute>}
            ></Route>
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
              <Route index element = {<StaffDashBoard />} />
              <Route path="course" element = {<StaffCourses />} />  
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
              <Route
                path="student"
                element={
                  <h1 className="bg-red-600 text-black text-4xl w-full">
                    dashboard
                  </h1>
                }
              />
              <Route path="announcement" element={<Announcement />} />
              <Route path="department" element={<Department />} />
              <Route
                path="staff"
                element={<h1 className="bg-red-800 w-full">staff</h1>}
              />
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

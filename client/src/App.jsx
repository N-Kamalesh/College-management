import Homepage from "./pages/Homepage";
import StudentRegister from "./pages/StudentResgister";
import StudentLogin from "./pages/StudentLogin";
import StaffLogin from "./pages/StaffLogin";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student" element={<Layout />}>
          <Route index element={<Navigate replace to="signin" />} />
          <Route path="signin" element={<StudentLogin />} />
          <Route path="signup" element={<StudentRegister />} />
          <Route path="app" element={<ProtectedRoute></ProtectedRoute>} />
        </Route>
        <Route path="/staff" element={<Layout />}>
          <Route index element={<Navigate replace to="signin" />} />
          <Route path="signin" element={<StaffLogin />} />
          <Route path="app" element={<ProtectedRoute></ProtectedRoute>} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

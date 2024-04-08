import Homepage from "./pages/Homepage";
import StudentRegister from "./pages/StudentResgister";
import StudentLogin from "./pages/StudentLogin";
import StaffLogin from "./pages/StaffLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student/signin" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentRegister />} />
        <Route path="/staff/signin" element={<StaffLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

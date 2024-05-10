import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function StaffLayout() {
  return (
    <main className="flex w-full">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default StaffLayout;

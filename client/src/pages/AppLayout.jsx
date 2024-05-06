import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <main className="flex w-full">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default AppLayout;

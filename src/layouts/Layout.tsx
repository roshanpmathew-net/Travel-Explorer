// Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../ui-components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
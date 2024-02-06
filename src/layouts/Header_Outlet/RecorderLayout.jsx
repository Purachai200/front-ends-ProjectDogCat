import { Outlet } from "react-router-dom";
import RecorderSidebar from "./Recorder/recorderSidebar";
import AuthNavbar from "./AuthNavbar"

export default function RecorderLayout() {
  return (
    <div style={{ display: "flex" }}>
      <RecorderSidebar />
      <div style={{ flex: 1}}>
        <AuthNavbar/>
        <Outlet />
      </div>
      </div>
  )
}

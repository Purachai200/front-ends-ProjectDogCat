import Header from "./Header";
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

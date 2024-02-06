import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function adminSidebar() {
  const navigate = useNavigate()

  const {logout, user} = useAuth()
  const Logout = async () => {
    await logout()
    navigate('/')
  }
  
  return (
    <div>
      <ul className="menu menu-lg bg-base-200 w-56 rounded-box h-screen">
        <div className="h-20 flex">
          <div className="avatar online p-1">
            <div className="w-16 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="p-2">
            <div className="text-xl">ผู้ดูแลระบบ</div>
            <div className="">{user.first_name}  {user.last_name}</div>
          </div>
        </div>
        <li className="mt-5 font-bold">
          <Link to={'/'}>
            รายชื่อองค์กร
          </Link>
        </li>
        <li className=" font-bold">
          <Link to={'/admin-rec'}>
            รายชื่อผู้บันทึก
          </Link>
        </li>
      <a className="btn btn-outline btn-error mt-auto" onClick={Logout}>ออกจากระบบ</a>
      </ul>
    </div>
  );
}

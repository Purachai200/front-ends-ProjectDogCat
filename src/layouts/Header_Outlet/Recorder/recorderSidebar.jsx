import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function recorderSidebar() {
  const navigate = useNavigate()

  const {logout, user} = useAuth()
  const Logout = async () => {
    navigate("/")
    await logout()
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
            <div className="text-xl">ผู้บันทึกระบบ</div>
            <div className="">{user.username}</div>
            <div className="">{user.first_name}  {user.last_name}</div>
          </div>
        </div>
        <li className="mt-5 text-l">
          <Link to={'/'}>
            ข้อมูล
          </Link>
        </li>
        <li className="text-l">
          <Link to={'/rec-regis'}>
            ลงทะเบียน เพิ่ม - ลด
          </Link>
        </li>
        <li className="text-l">
          <Link to={'/rec-unregis'}>
            สัตว์ที่ไม่ได้ลงทะเบียน เพิ่ม - ลด
          </Link>
        </li>
        <li className="text-l">
          <Link to={'/rec-location'}>
            เพิ่มสถานที่เลี้ยง
          </Link>
        </li>
        <li className="text-l">
          <Link to={'/rec-nature'}>
            เพิ่มลักษณะการเลี้ยง
          </Link>
        </li>
      <a className="btn btn-outline btn-error mt-auto" onClick={Logout}>ออกจากระบบ</a>
      </ul>
    </div>
  );
}

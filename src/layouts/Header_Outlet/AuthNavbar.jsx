import React from "react";
import { Link } from "react-router-dom";

export default function adminNavbar() {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1 justify-end">
        <div className="flex-col">
        <Link to={'/'} className="btn btn-ghost block text-4xl">ระบบจัดการข้อมูลสุนัขและแมว</Link>
        <a className="p-5">Dog & Cat Management System</a>
        </div>
      </div>
      </div>
    </div>
  );
}

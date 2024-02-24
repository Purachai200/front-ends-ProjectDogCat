import React from "react";
import { Link } from "react-router-dom";

export default function adminNavbar() {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1 justify-end">
        <Link to={"/"} className="flex items-center">
          <div>
          <img src="https://res.cloudinary.com/dm6x9ox4t/image/upload/v1708785491/p3w2nlzydr41n9wdh9r8.png" alt="" className="avatar border rounded-full size-20 img-title"/>
          </div>
          <div className="flex-col">
          <div className="btn btn-ghost block text-4xl text-title">
            ระบบจัดการข้อมูลสุนัขและแมว
          </div>
          <div className="p-5 text-title">Dog & Cat Management System</div>
          </div>
        </Link>
      </div>
      </div>
    </div>
  );
}

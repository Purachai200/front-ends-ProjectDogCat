import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="navbar bg-base-100 fixed">
      <div className="flex-1">
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
      <div className="flex-none">
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="dracula"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        <label htmlFor="menu-toggle" className="menu-icon ml-3">
          <FontAwesomeIcon className="text-xl  hover:text-green-400 transition-all" icon={"bars"}/>
        </label>
        <ul className="menu menu-horizontal px-1 responsive">
          <li>
            <Link to={"/recorder-login"}>เข้าสู่ระบบ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

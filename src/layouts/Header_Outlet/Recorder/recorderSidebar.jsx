import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExportExcel from "../../../services/recorder/exportExcel";

export default function RecorderSidebar() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { logout, user, baseUrl } = useAuth();
  const Logout = async () => {
    navigate("/");
    await logout();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(`${baseUrl}/recorder/get/subdistrict`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <ul className="menu menu-lg bg-base-200 w-56 rounded-box h-screen">
          <div className="h-20 flex items-center justify-center">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                value="dark"
              />
              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div className="p-2">
              <div className="text-xl">ผู้บันทึกระบบ</div>
              <div className="">{user.username}</div>
              <div className="">
                {user.first_name} {user.last_name}
              </div>
              <div className="">
                {data.map((item) => (
                  <div key={item.id}>
                    {user.subdistrictId === item.id && (
                      <p>ตำบล {item.sub_district}</p>
                    )}
                  </div>
                ))}
                {!data.some((item) => user.subdistrictId === item.id) && (
                  <p>ไม่พบข้อมูล</p>
                )}
              </div>
            </div>
          </div>
          <li className="mt-5 text-l">
            <Link to={"/"}>ข้อมูล</Link>
          </li>
          <li className="text-l">
            <Link to={"/rec-regis"}>ลงทะเบียน เพิ่ม - ลด</Link>
          </li>
          <li className="text-l">
            <Link to={"/rec-unregis"}>สัตว์ที่ไม่ได้ลงทะเบียน เพิ่ม - ลด</Link>
          </li>
          <li className="text-l">
            <Link to={"/rec-location"}>เพิ่มสถานที่เลี้ยง</Link>
          </li>
          <li className="text-l">
            <Link to={"/rec-nature"}>เพิ่มลักษณะการเลี้ยง</Link>
          </li>
          <li className="text-l">
          <ExportExcel fileName={"Excel Export"}/>
          </li>
          <div className="btn btn-outline btn-error mt-auto" onClick={Logout}>
            ออกจากระบบ
          </div>
        </ul>
      </div>
      <div className="bottom-nav">
        <div className="btm-nav">
          <Link to={"/"}>
            <FontAwesomeIcon className="text-xl hover:text-green-400 transition-all" icon={"home-alt"}/>
          </Link>
          <Link to={"/rec-regis"}>
            <FontAwesomeIcon className="text-xl  hover:text-green-400 transition-all" icon={"address-book"}/>
          </Link>
          <Link to={"/rec-unregis"}>
            <FontAwesomeIcon className="text-xl  hover:text-green-400 transition-all" icon={"dog"}/>
          </Link>
          <Link to={"/rec-location"}>
            <FontAwesomeIcon className="text-xl  hover:text-green-400 transition-all" icon={"location"}/>
          </Link>
          <Link to={"/rec-nature"}>
            <FontAwesomeIcon className="text-xl  hover:text-green-400 transition-all" icon={"leaf"}/>
          </Link>
          <div onClick={Logout}>
            <FontAwesomeIcon className="text-xl text-red-500" icon={"sign-out-alt"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Admin_Register() {
  const {baseUrl} = useAuth();
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",

  })

  const navigate = useNavigate();

  const hdlChange = (e) => {
    setInput( prv => ({...prv, [e.target.name] : e.target.value}))
  }

  const hdlRegister = async (e) => {
    e.preventDefault()
    if(input.password != input.confirmPassword){
      return alert('กรุณายืนยันรหัสผ่านให้ถูกต้อง')
    }
    if(input.password === ""){
      return alert('กรุณากรอกข้อมูล รหัสผ่าน')
    }
    if(input.first_name === "" || input.last_name === "" || input.email === "" || input.username === ""){
      return alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
    try {
      const { confirmPassword, ...postData } = input;
      const rs = await axios.post(`${baseUrl}/auth/register/`, postData)
      navigate('/admin-login')
      alert("Register Success")
    } catch (err) {
      console.log(err.response.data.message)
      if(err.response.data.message === "User already exist."){
        alert("มีชื่อผู้ใช้นี้แล้ว")
      }
      if(err.response.data.message === "Email already exist."){
        alert("มีอีเมล์นี้แล้ว")
      }
    }
  }

  return (
    <div>
      <div className="min-h-0 flex justify-between items-center content-native">
        <div className="container">
          <div className="h-screen p-0 flex flex-col justify-center items-center">
            <div className="text-4xl">ลงทะเบียนผู้ดูแลระบบ</div>
            <div className="text-xl">Admin Register</div>
          </div>
          <div className="-mt-20 mx-5">
            <Link to={"/"} className="btn btn-outline btn-accent">
              ย้อนกลับ
            </Link>
          </div>
        </div>
        <div className="container min-h-screen flex flex-col justify-center items-center">
          <form
            className="mt-5 items-center w-full flex flex-col"
            onSubmit={hdlRegister}
          >
            <input
              type="text"
              name="first_name"
              value={input.first_name}
              onChange={hdlChange}
              placeholder="ชื่อ"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="text"
              name="last_name"
              value={input.last_name}
              onChange={hdlChange}
              placeholder="สกุล"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={hdlChange}
              placeholder="ชื่อผู้ใช้"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={hdlChange}
              placeholder="รหัส"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
              placeholder="ยืนยัน รหัสผ่าน"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={hdlChange}
              placeholder="อีเมล์"
              className="input input-bordered w-full max-w-sm mt-8"
            />
            <button
              type="submit"
              className="btn btn-outline w-full max-w-xs mt-16"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

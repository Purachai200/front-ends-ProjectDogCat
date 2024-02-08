import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function Admin_Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  })
  const { baseUrl, setUser, alertSW } = useAuth()
  const navigate = useNavigate();

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hldLogin = async (e) => {
    e.preventDefault()
    try {
      if(input.username === ""){
        alertSW("มีบางอย่างผิดพลาด","กรุณากรอกชื่อผู้ใช้", "error")
        return;
      }
      if(input.password === ""){
        alertSW("มีบางอย่างผิดพลาด","กรุณากรอกรหัสผ่าน", "error")
        return;
      }
      const rs = await axios.post(`${baseUrl}/auth/login/admin`, input)
      localStorage.setItem('DogAndCattoken', rs.data.token)
      const rsAuth = await axios.get(`${baseUrl}/auth/get-admin`, {
        headers : { Authorization : `Bearer ${rs.data.token}`}
      })
      setUser(rsAuth.data)
      navigate("/")
    } catch (err) {
      console.log(err)
      if(err.response.data.message === "Email or Password is invalid.") {
        alertSW("มีบางอย่างผิดพลาด","ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "error")
      }
    }
  }

  return (
    <div>
      <div className="min-h-0 flex justify-center items-center">
        <div className="container min-h-screen flex flex-col justify-center items-center">
            <div className="text-center">  
            <div className="text-4xl">เข้าสู่ระบบผู้ดูแลระบบ</div>
            <div className="text-xl mt-2">Admin Login</div>
            </div>
            <form className="mt-5 items-center w-full flex flex-col" onSubmit={hldLogin}>
              <input
                type="username"
                placeholder="ชื่อผู้ใช้"
                name="username"
                value={input.username}
                onChange={hdlChange}
                className="input input-bordered w-full max-w-md mt-5"
              />
              <input
                type="password"
                placeholder="รหัสผ่าน"
                name="password"
                value={input.password}
                onChange={hdlChange}
                className="input input-bordered w-full max-w-md mt-8"
              />
              <button
                type="submit"
                className="btn btn-outline w-full max-w-xs mt-28"
              >
                เข้าสู่ระบบ
              </button>
            </form>
            <div className="mt-10">
            <Link to={'/admin-register'} className="underline text-center text-neutral hover:text-success transition-all">ลงทะเบียนผู้ดูแล</Link>
            </div>
          </div>
          
      </div>
      <div className="-mt-20 mx-5">
            <Link to={"/"} className="btn btn-outline btn-accent">
              ย้อนกลับ
            </Link>
          </div>
    </div>
  )
}

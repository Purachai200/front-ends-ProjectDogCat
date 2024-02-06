import { Link, useNavigate } from "react-router-dom";

export default function Admin_Register() {

  const navigate = useNavigate();

  const hdlRegister = async () => {
    try {
      navigate("/admin-login")
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <div className="min-h-0 flex justify-between items-center">
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
              type="username"
              placeholder="ชื่อ"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="username"
              placeholder="สกุล"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="username"
              placeholder="ชื่อผู้ใช้"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="username"
              placeholder="รหัส"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="username"
              placeholder="ยืนยัน รหัสผ่าน"
              className="input input-bordered w-full max-w-sm mt-5"
            />
            <input
              type="password"
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

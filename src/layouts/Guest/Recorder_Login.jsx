import { Link, useNavigate } from "react-router-dom";
import useMockUp from "../../hooks/useMockUp"

export default function Recorder_Login() {
  const navigate = useNavigate()
  const { hdlRecLogin } = useMockUp()

  const hdlLogin = async () => {
    try {
      navigate("/")
      await hdlRecLogin()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <div className="min-h-0 flex justify-between items-center">
        <div className="container">
          <div className="h-screen p-0 flex flex-col justify-center items-center">
            <div className="h-3/4 m-1 carousel carousel-vertical rounded-box">
              <div className="carousel-item h-full w-full">
                <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" />
              </div>
              <div className="carousel-item h-full w-full">
                <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
              </div>
            </div>
          </div>
          <div className="-mt-20 mx-5">
            <Link to={"/"} className="btn btn-outline btn-accent">
              ย้อนกลับ
            </Link>
          </div>
        </div>
        <div className="container min-h-screen flex flex-col justify-center items-center">
            <div className="text-4xl">เข้าสู่ระบบผู้บันทึก</div>
            <div className="text-xl mt-2">Recorder Login</div>
            <form className="mt-5 items-center w-full flex flex-col" onSubmit={hdlLogin}>
              <input
                type="username"
                placeholder="ชื่อผู้ใช้"
                className="input input-bordered w-full max-w-md mt-5"
              />
              <input
                type="password"
                placeholder="รหัสผ่าน"
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
            <Link to={'/admin-login'} className="underline text-center text-neutral hover:text-success transition-all">เป็นผู้ดูแล ?</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

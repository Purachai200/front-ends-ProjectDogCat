import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function Recorder_Login() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const { baseUrl, setUser, alertSW } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      try {
        const result = await axios.get(`${baseUrl}/auth/getNews/New_Img`);
        setNews(result.data);
      } catch (err) {
        console.error(err);
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hldLogin = async (e) => {
    e.preventDefault();
    try {
      if (input.username === "") {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกชื่อผู้ใช้", "error");
        return;
      }
      if (input.password === "") {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกรหัสผ่าน", "error");
        return;
      }
      const rs = await axios.post(`${baseUrl}/auth/login/recorder`, input);
      localStorage.setItem("DogAndCattoken", rs.data.token);
      const rsAuth = await axios.get(`${baseUrl}/auth/get-recorder`, {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      setUser(rsAuth.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "Email or Password is invalid.") {
        alertSW(
          "มีบางอย่างผิดพลาด",
          "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <div className="min-h-0 flex justify-between items-center">
        <div className="container">
          <div className="container h-screen p-0 flex justify-center items-center">
            <div className="h-3/4 m-1 carousel carousel-vertical rounded-box">
              {news.map((row, index) => (
                <div key={index} className="carousel-item h-full w-full">
                  <img src={row.url} />
                </div>
              ))}
            </div>
            {/* <div className="bottom-0 self-start p-2 mt-4">
              <Link to={"/"} className="btn btn-outline btn-accent">
                ย้อนกลับ
              </Link>
            </div> */}
          </div>
        </div>
        <div className="container min-h-screen flex flex-col justify-center items-center">
          <div className="text-4xl">เข้าสู่ระบบผู้บันทึก</div>
          <div className="text-xl mt-2">Recorder Login</div>
          <form
            className="mt-5 items-center w-full flex flex-col"
            onSubmit={hldLogin}
          >
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
            <Link
              to={"/admin-login"}
              className="underline text-center text-neutral hover:text-success transition-all"
            >
              เป็นผู้ดูแล ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

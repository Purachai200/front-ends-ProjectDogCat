/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://express-prisma-projectdogcat.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("DogAndCattoken");
        if (!token) {
          return;
        }
        setLoading(true);
        try {
          const adminResponse = await axios.get(`${baseUrl}/auth/get-admin`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          let userResponse = adminResponse.data;
          setUser(userResponse);
        } catch (err) {
          // console.error(err.message);
        }
        try {
          const recorderResponse = await axios.get(`${baseUrl}/auth/get-recorder`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          let userResponse = recorderResponse.data;
          setUser(userResponse);
        } catch (err) {
          // console.error(err.message);
        }
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    };
  
    fetchData();
  }, []);
  
  

const logout = () => {
  setUser(null);
  localStorage.removeItem("DogAndCattoken");
}

const swalLoading = () => {
  Swal.fire({
    title: 'กำลังโหลด...',
    allowOutsideClick: false,
    willOpen: () => {
      Swal.showLoading();
    },
    timer: 1000,
    showConfirmButton: false
  });
  return null;
}

const alertQuestion = (title, text, func) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "ลบสำเร็จ",
        text: "ลบสิ่งที่คุณเลือกเสร็จสิ้น",
        icon: "success"
      }).then(() => {
        func();
      });
    }
  });
};

const alertSW = (title,text,icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "ตกลง"
  });
}

return (
  <AuthContext.Provider value={{ user, setUser, loading, logout, baseUrl, swalLoading, alertSW, alertQuestion }}>
    {props.children}
  </AuthContext.Provider>
  )
};
export { AuthContextProvider };
export default AuthContext;

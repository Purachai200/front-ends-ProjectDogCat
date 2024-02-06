/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://localhost:8000";

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem("DogAndCattoken");
        if (!token) {
          return;
        }
        const adminResponse = await axios.get(`${baseUrl}/auth/get-admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let userResponse = adminResponse.data;
        if (!userResponse) {
          const recorderResponse = await axios.get(`${baseUrl}/auth/get-recorder`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          userResponse = recorderResponse.data;
        }
        if(!userResponse) {
          userResponse = null
        }
        setUser(userResponse);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

const logout = () => {
  setUser(null);
  localStorage.removeItem("DogAndCattoken");
}

const swalLoading = () => {
  Swal({
    title: 'กำลังโหลด',
    allowEscapeKey: false,
    allowOutsideClick: false,
    loading: () => {
      Swal.showLoading();
    }
  })
}

const alertSW = (title,text,icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "ตกลง"
  });
}

return (
  <AuthContext.Provider value={{ user, setUser, loading, logout, baseUrl, swalLoading, alertSW }}>
    {props.children}
  </AuthContext.Provider>
  )
};
export { AuthContextProvider };
export default AuthContext;

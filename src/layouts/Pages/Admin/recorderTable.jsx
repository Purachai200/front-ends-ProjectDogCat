import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function subdistrictTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false)
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([])
  const [subdistricts, setSubdistricts] = useState([]);

  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    subdistrictId: ""
  });

  const { baseUrl, alertSW, alertQuestion } = useAuth();

  useEffect(() => {
    fetchData();
    fetchSubdistricts();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(`${baseUrl}/admin/get/recorder`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubdistricts = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(`${baseUrl}/admin/get/subdistrict`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubdistricts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create
  const handleChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (
        input.first_name === "" ||
        input.last_name === "" ||
        input.username === "" ||
        input.password === "" ||
        input.confirmPassword === "" ||
        input.subdistrictId === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      if (
        input.password !== input.confirmPassword
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณายืนยันรหัสผ่านให้ถูกต้อง", "error");
        return;
      }
      const { confirmPassword, ...postData } = input;
      await axios.post(`${baseUrl}/admin/recorder`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alertSW("เสร็จสิ้น", "แก้ไขข้อมูลผู้บันทึกเสร็จสิ้น", "success");
      setInput({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        subdistrictId: ""
      })
      fetchData()
      setIsOpen(false);
    } catch (err) {
      console.log(err)
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Update
  const hdlEditChange = (e) => {
    setEditData((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchEditData = async (id) => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(
        `${baseUrl}/admin/get/string/table/recorder/from/id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (
        editData.first_name === "" ||
        editData.last_name === "" ||
        editData.username === "" ||
        editData.password === "" ||
        editData.confirmPassword === "" ||
        editData.subdistrictId === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      if (
        editData.password !== editData.confirmPassword
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณายืนยันรหัสผ่านให้ถูกต้อง", "error");
        return;
      }
      const { id, confirmPassword, subdistrictId,role, ...postData } = editData;
      await axios.patch(
        `${baseUrl}/admin/update-recorder/${editData.id}`,
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alertSW("เสร็จสิ้น", "แก้ไขผู้บันทึกเสร็จสิ้น", "success");
      fetchData();
    } catch (err) {
      console.log(err);
    }
    setEditOpen(false);
  };

  const editClose = () => {
    setEditOpen(false);
  };

    // Delete
    const hdlDelete = async (id) => {
      try {
        const token = localStorage.getItem("DogAndCattoken");
        if (!token) {
          return;
        }
        await axios.delete( `${baseUrl}/admin/delete-recorder/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        })
        fetchData()
      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div>
      {/* Create Form */}
      {isOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">เพิ่มผู้บันทึก</div>
              <div
                className="btn btn-circle btn-outline btn-error"
                onClick={handleClose}
              >
                X
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  name="first_name"
                  value={input.first_name}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สกุล"
                  name="last_name"
                  value={input.last_name}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="email"
                  placeholder="อีเมล์"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="password"
                  placeholder="รหัสผ่าน"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-between">
                <select name="subdistrictId" value={input.subdistrictId} onChange={handleChange}>
                    {subdistricts.map((row, index) => (
                      <option key={index} value={row.id}>{row.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-outline btn-success">
                  ส่ง
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
{/* Edit Form */}
{editOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">แก้ไขผู้บันทึก</div>
              <div
                className="btn btn-circle btn-outline btn-error"
                onClick={editClose}
              >
                X
              </div>
            </div>
            <form onSubmit={editSubmit}>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  name="first_name"
                  value={editData.first_name || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สกุล"
                  name="last_name"
                  value={editData.last_name || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  name="username"
                  value={editData.username || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="email"
                  placeholder="อีเมล์"
                  name="email"
                  value={editData.email || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="password"
                  placeholder="รหัสผ่าน"
                  name="password"
                  value={editData.password || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  name="confirmPassword"
                  value={editData.confirmPassword || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-between">
                <button type="submit" className="btn btn-outline btn-success">
                  ส่ง
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      <div className="overflow-x-auto w-full">
        <div className="flex justify-between">
          <div className="text-2xl">รายชื่อผู้บันทึก</div>
          <div
            className="btn btn-outline btn-success"
            onClick={() => setIsOpen(true)}
          >
            เพิ่ม <FontAwesomeIcon className="text-xl" icon={"plus"}/>
          </div>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>สกุล</th>
              <th>ชื่อผู้ใช้</th>
              <th>อีเมล์</th>
              <th>สังกัด</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.username}</td>
                <td>{row.email}</td>
                <td>
                  {
                    subdistricts.find(
                      (subdistrict) => subdistrict.id === row.subdistrictId
                    )?.name
                  }
                </td>
                <td>
                  <div className="flex justify-between p-2">
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={async () => {
                        await fetchEditData(row.id);
                        setEditOpen(true);
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={"edit"}/>
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() =>
                        alertQuestion(
                          "ต้องการลบไฟล์หรือไม่",
                          "ต้องการลบผู้บันทึกนี้ใช่หรือไม่ ?",
                          async () => {
                            await hdlDelete(row.id);
                          }
                        )
                      }
                    >
                      <FontAwesomeIcon className="text-xl" icon={"trash-alt"}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

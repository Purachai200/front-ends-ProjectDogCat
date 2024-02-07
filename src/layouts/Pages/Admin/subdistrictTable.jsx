import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

export default function SubdistrictTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const [input, setInput] = useState({
    name: "",
    sub_district: "",
    district: "",
    province: "",
    zipcode: "",
  });

  const { baseUrl, alertSW, alertQuestion } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(`${baseUrl}/admin/get/subdistrict`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  // Create

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (
        input.name === "" ||
        input.district === "" ||
        input.sub_district === "" ||
        input.province === "" ||
        input.zipcode === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      await axios.post(`${baseUrl}/admin/subdistrict`, input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alertSW("เสร็จสิ้น", "เพิ่มองค์กรเสร็จสิ้น", "success");
      setInput({
        name: "",
        sub_district: "",
        district: "",
        province: "",
        zipcode: "",
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
    setIsOpen(false);
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
        `${baseUrl}/admin/get/table/subdistrict/from/id/${id}`,
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
        editData.name === "" ||
        editData.district === "" ||
        editData.sub_district === "" ||
        editData.province === "" ||
        editData.zipcode === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      const { id, ...postData } = editData;
      await axios.patch(
        `${baseUrl}/admin/update-subdistrict/${editData.id}`,
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alertSW("เสร็จสิ้น", "เพิ่มองค์กรเสร็จสิ้น", "success");
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
      await axios.delete(`${baseUrl}/admin/delete-subdistrict/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">เพิ่มองค์กร</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleClose}
              >
                X
              </a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อองค์กร"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ตำบล"
                  name="sub_district"
                  value={input.sub_district}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="อำเภอ"
                  name="district"
                  value={input.district}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="จังหวัด"
                  name="province"
                  value={input.province}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-between">
                <input
                  type="text"
                  placeholder="รหัสไปรษณีย์"
                  name="zipcode"
                  value={input.zipcode}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-outline btn-success">
                  ส่ง
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {editOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">แก้ไขข้อมูลองค์กร</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={editClose}
              >
                X
              </a>
            </div>
            <form onSubmit={editSubmit}>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อองค์กร"
                  name="name"
                  value={editData.name || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ตำบล"
                  name="sub_district"
                  value={editData.sub_district || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="อำเภอ"
                  name="district"
                  value={editData.district || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="จังหวัด"
                  name="province"
                  value={editData.province || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-between">
                <input
                  type="text"
                  placeholder="รหัสไปรษณีย์"
                  name="zipcode"
                  value={editData.zipcode || ""}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
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
          <div className="text-2xl">รายชื่อองค์กร</div>
          <button
            className="btn btn-outline btn-success"
            onClick={() => setIsOpen(true)}
          >
            เพิ่ม
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ชื่อองค์กรณ์</th>
              <th>ตำบล</th>
              <th>อำเภอ</th>
              <th>จังหวัด</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="text-l">{row.name}</div>
                  </div>
                </td>
                <td>{row.sub_district}</td>
                <td>{row.district}</td>
                <td>{row.province}</td>
                <td>
                  <div className="flex justify-between p-2">
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={async () => {
                        await fetchEditData(row.id);
                        setEditOpen(true);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() =>
                        alertQuestion(
                          "ต้องการลบไฟล์หรือไม่",
                          "ต้องการลบองค์กรนี้ใช่หรือไม่ ?",
                          async () => {
                            await hdlDelete(row.id);
                          }
                        )
                      }
                    >
                      ลบ
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

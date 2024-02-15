import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Location_Table() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const [input, setInput] = useState({
    name_location: "",
    location: ""
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

      const result = await axios.get(`${baseUrl}/recorder/get/location`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (
        input.name_location === "" ||
        input.location === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      await axios.post(`${baseUrl}/recorder/create-location`, input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alertSW("เสร็จสิ้น", "เพิ่มสถานที่สำเร็จ", "success");
      setInput({
        name_location: "",
        location: ""
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
    setIsAddOpen(false);
  };

  const handleClose = () => {
    // Close the modal
    setIsAddOpen(false);
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
        `${baseUrl}/recorder/get/table/location/from/id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (editData.name_location === "" || editData.location === "") {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      const { id, ...postData } = editData;
      await axios.patch(
        `${baseUrl}/recorder/update-location/${editData.id}`,
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alertSW("เสร็จสิ้น", "แก้ไขข้อมูลสถานที่เสร็จสิ้น", "success");
      fetchData();
    } catch (err) {
      console.log(err);
    }
    setIsEditOpen(false);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  // Delete
  const hdlDelete = async (id) => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      await axios.delete(`${baseUrl}/recorder/delete-location/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* For Add Address */}
      {isAddOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">เพิ่มสัตว์ที่ไม่ได้ลงทะเบียน</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleClose}
              >
                X
              </a>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor=""></label>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อสถานที่"
                  name="name_location"
                  value={input.name_location}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สถานที่"
                  name="location"
                  value={input.location}
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

      {/* For Edit and Open Add Screen Pet Owner */}
      {isEditOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">แก้ไขชื่อสถานที่</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleEditClose}
              >
                X
              </a>
            </div>
            <label htmlFor=""></label>
            <div className="flex gap-4 mt-6">
              <form onSubmit={handleEditSubmit}>
                <label htmlFor=""></label>
                <div className="flex gap-4 mt-6">
                  <input
                    type="text"
                    placeholder="ชื่อสถานที่"
                    name="name_location"
                    value={editData.name_location}
                    onChange={hdlEditChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="สถานที่"
                    name="location"
                    value={editData.location}
                    onChange={hdlEditChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <button type="submit" className="btn btn-outline btn-success">
                    ส่ง <FontAwesomeIcon className="text-xl" icon={"check-circle"}/>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}

      <div className="flex justify-end items-center p-2">
        <a
          className="btn btn-outline btn-success"
          onClick={() => setIsAddOpen(true)}
        >
          เพิ่ม
        </a>
      </div>
      <div className="overflow-x-auto overflow-y-scroll max-h-96 w-full p-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ชื่อสถานที่</th>
              <th>สถานที่</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <th>{row.name_location}</th>
                <td>{row.location}</td>
                <td className="max-w-4">
                  <div className="flex justify- gap-4 ">
                    <a
                      className="btn btn-circle btn-outline btn-warning"
                      onClick={async () => {
                        await fetchEditData(row.id);
                        setIsEditOpen(true);
                      }}
                    >
                      <FontAwesomeIcon className="text-xl" icon={"edit"}/>
                    </a>
                    <a
                      className="btn btn-circle btn-outline btn-error"
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
                      <FontAwesomeIcon className="text-xl" icon={"trash-alt"}/>
                    </a>
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

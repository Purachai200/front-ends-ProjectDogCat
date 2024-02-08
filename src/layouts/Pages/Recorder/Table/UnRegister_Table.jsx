import { useEffect, useState } from "react";
import PetsTable from "./PetsTable";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";

export default function Register_Table() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  const [data, setData] = useState([]);

  const [location, setLocation] = useState([]);

  const [input, setInput] = useState({
    address_moo: "",
    dog_amount: "",
    cat_amount: "",
    name_info: "",
    vaccined: "",
    sterilized: "",
    location_id: "",
  });

  const { baseUrl, alertSW, alertQuestion, user } = useAuth();

  useEffect(() => {
    fetchData();
    fetchLocation();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(
        `${baseUrl}/recorder/getByData/table/unregistered/from/subdistrictId/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLocation = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(`${baseUrl}/recorder/get/location`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocation(result.data);
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
        input.address_moo === "" ||
        input.dog_amount === "" ||
        input.cat_amount === "" ||
        input.name_info === "" ||
        input.sterilized === "" ||
        input.vaccined === "" ||
        input.location_id === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      await axios.post(
        `${baseUrl}/recorder/create-unregister/${user.subdistrictId}`,
        input,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alertSW("เสร็จสิ้น", "แก้ไขข้อมูลผู้บันทึกเสร็จสิ้น", "success");
      setInput({
        address_moo: "",
        dog_amount: "",
        cat_amount: "",
        name_info: "",
        vaccined: "",
        sterilized: "",
        location_id: "",
      });
      fetchData();
      setIsAddOpen(false);
    } catch (err) {
      console.log(err);
    }
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
        `${baseUrl}/recorder/get/table/unregistered/from/id/${id}`,
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
      if (
        editData.address_moo === "" ||
        editData.dog_amount === "" ||
        editData.cat_amount === "" ||
        editData.name_info === "" ||
        editData.sterilized === "" ||
        editData.vaccined === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      const { id, locationId, subdistrictId, ...postData } = editData;
      await axios.patch(
        `${baseUrl}/recorder/update-unregistered/${editData.id}`,
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alertSW("เสร็จสิ้น", "แก้ไขข้อมูลผู้บันทึกเสร็จสิ้น", "success");
      setInput({
        address_moo: "",
        dog_amount: "",
        cat_amount: "",
        name_info: "",
        vaccined: "",
        sterilized: "",
      });
      fetchData();
      setIsEditOpen(false);
    } catch (err) {
      console.log(err);
    }
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
      await axios.delete(`${baseUrl}/recorder/delete-unregistered/${id}`, {
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
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="หมู่ที่"
                  name="address_moo"
                  value={input.address_moo}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="ชื่อผู้ให้ข้อมูล"
                  name="name_info"
                  value={input.name_info}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สุนัขจำนวน"
                  name="dog_amount"
                  value={input.dog_amount}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="แมวจำนวน"
                  name="cat_amount"
                  value={input.cat_amount}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <select name="sterilized" onChange={handleChange}>
                  <option value="" disabled>
                    กรุณาเลือกประวัติการทำหมัน
                  </option>
                  <option value="NOT_STERILIZED">ไม่เคยทำหมัน</option>
                  <option value="STERILIZED">เคยทำหมัน</option>
                </select>
              </div>
              <div className="flex mt-4 gap-4">
                <select
                  name="vaccined"
                  value={input.vaccined}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    กรุณาเลือกประวัติการฉีดวัคซีน
                  </option>
                  <option value="NOT_VACCINED">ไม่เคยฉีดวัคซีน</option>
                  <option value="VACCINED">เคยฉีดวัคซีน</option>
                </select>
                <select
                  name="location_id"
                  value={input.location_id}
                  onChange={handleChange}
                >
                  {location.map((row, index) => (
                    <option key={index} value={row.id}>
                      {row.name_location}
                    </option>
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

      {/* For Edit and Open Add Screen Pet Owner */}
      {isEditOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">แก้ไขสัตว์เลี้ยงที่ไม่ได้ลงทะเบียน</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleEditClose}
              >
                X
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <form onSubmit={handleEditSubmit}>
                <div className="flex gap-4 mt-6">
                  <input
                    type="text"
                    placeholder="หมู่ที่"
                    name="address_moo"
                    value={editData.address_moo}
                    onChange={hdlEditChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                                    <input
                    type="text"
                    placeholder="ชื่อผู้ให้ข้อมูล"
                    name="name_info"
                    value={editData.name_info}
                    onChange={hdlEditChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                                    <select
                    name="vaccined"
                    value={editData.vaccined}
                    onChange={hdlEditChange}
                  >
                    <option value={""} disabled>
                      กรุณาเลือกประวัติการฉีดวัคซีน
                    </option>
                    <option value="NOT_VACCINED">ไม่เคยฉีดวัคซีน</option>
                    <option value="VACCINED">เคยฉีดวัคซีน</option>
                  </select>
                </div>
                <div className="flex mt-4 gap-4">
                  <input
                    type="text"
                    placeholder="สุนัขจำนวน"
                    name="dog_amount"
                    value={editData.dog_amount}
                    onChange={hdlEditChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="แมวจำนวน"
                    name="cat_amount"
                    value={editData.cat_amount}
                    onChange={hdlEditChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <select
                    name="sterilized"
                    onChange={hdlEditChange}
                    value={editData.sterilized}
                  >
                    <option value="" disabled>
                      กรุณาเลือกประวัติการทำหมัน
                    </option>
                    <option value="NOT_STERILIZED">ไม่เคยทำหมัน</option>
                    <option value="STERILIZED">เคยทำหมัน</option>
                  </select>
                </div>
                <div className="flex mt-4 justify-end">
                  <button type="submit" className="btn btn-outline btn-success">
                    ส่ง
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
      <div className="overflow-x-auto overflow-y-scroll max-h-[600px] w-full p-2">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>หมู่ที่</th>
              <th>สถานที่อยู่อาศัย</th>
              <th>ชื่อสถานที่อยู่อาศัย</th>
              <th>จำนวนสุนัข</th>
              <th>จำนวนแมว</th>
              <th>ชื่อผู้ให้ข้อมูล</th>
              <th>ประวัติการฉีดวัคซีน</th>
              <th>ประวัติการทำหมัน</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Map Data Unregister */}
            {data.map((row, index) => (
              <tr key={index}>
                <th>{row.address_moo}</th>
                <td>
                  {
                    location.find((location) => location.id === row.locationId)
                      ?.location
                  }
                </td>
                <td>
                  {
                    location.find((location) => location.id === row.locationId)
                      ?.name_location
                  }
                </td>
                <td>{row.dog_amount}</td>
                <td>{row.cat_amount}</td>
                <td>{row.name_info}</td>
                <td>
                  {row.vaccined === "VACCINED"
                    ? "ได้รับวัคซีน"
                    : "ยังไม่ได้รับวัคซีน"}
                </td>
                <td>
                  {row.sterilized === "STERILIZED"
                    ? "ทำหมันแล้ว"
                    : "ยังไม่ได้ทำหมัน"}
                </td>
                <td className="max-w-4">
                  <div className="flex justify- gap-2 ">
                    <a
                      className="btn btn-circle btn-outline btn-warning"
                      onClick={async () => {
                        await fetchEditData(row.id);
                        setIsEditOpen(true);
                      }}
                    >
                      แก้ไข
                    </a>
                    <a
                      className="btn btn-circle btn-outline btn-error"
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
                      ลบ
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

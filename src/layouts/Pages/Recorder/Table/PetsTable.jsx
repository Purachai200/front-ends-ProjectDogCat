import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { fetchLocation, fetchNature } from "../../../../services/recorder/recorder_fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PetsTable(owner_id) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([])
  const [nature, setNature] = useState([])

  const [editPet, setEditPet] = useState([])

  const { baseUrl, alertSW, alertQuestion, user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const locationData = await fetchLocation(baseUrl, token);
      setLocation(locationData);

      const natureData = await fetchNature(baseUrl, token);
      setNature(natureData);
      const result = await axios.get(
        `${baseUrl}/recorder/getMatch/table/pet/from/petOwnerId/${owner_id.owner_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEditData = async (id) => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const result = await axios.get(
        `${baseUrl}/recorder/get/table/pet/from/id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditPet(result.data);
    } catch (err) {
      console.log(err);
    }
  };

    // Update

    const hdlEditChange = (e) => {
      setEditPet((prevInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value,
      }));
    };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if(
        editPet.name === "" ||
        editPet.type === "" ||
        editPet.gender === "" ||
        editPet.color === "" ||
        editPet.defect === "" ||
        editPet.age === "" ||
        editPet.vaccined === "" ||
        editPet.vaccine_date === "" ||
        editPet.sterilized === "" ||
        editPet.location_id === "" ||
        editPet.nature_id === ""
      ){
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      const { id, petOwnerId, recorderId, ...postData } = editPet;
      await axios.patch(
        `${baseUrl}/recorder/update-pet/${editPet.id}`,
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alertSW("เสร็จสิ้น", "แก้ไขข้อมูลสัตว์เลี้ยงเสร็จสิ้น", "success");
      fetchData()
      setIsEditOpen(false);
    } catch (err) {
      console.log(err)
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
      await axios.delete(`${baseUrl}/recorder/delete-pet/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* For Edit and Open Add Screen Pet Owner */}
      {isEditOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-bottom"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">แก้ไขสัตว์เลี้ยง</div>
              <div
                className="btn btn-circle btn-outline btn-error"
                onClick={handleEditClose}
              >
                X
              </div>
            </div>
            <div className="flex gap-4 mt-6">
            <form onSubmit={handleEditSubmit} className="w-full flex justify-center gap-8">
              <div className="flex gap-4 flex-col">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  value={editPet.name}
                  onChange={hdlEditChange}
                />
                <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                name="type"
                value={editPet.type}
                onChange={hdlEditChange}
                >
                <option value="" disabled>
                    กรุณาเลือกประเภท
                  </option>
                  <option value="DOG">หมา</option>
                  <option value="CAT">แมว</option>
                </select>
                <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                name="gender"
                value={editPet.gender}
                onChange={hdlEditChange}
                >
                  <option value="" disabled>
                    กรุณาเลือกเพศ
                  </option>
                  <option value="MALE">ตัวผู้</option>
                  <option value="FEMALE">ตัวเมีย</option>
                </select>
              </div>
              <div className="flex gap-4 flex-col">
                <input
                  type="text"
                  placeholder="สี"
                  className="input input-bordered w-full max-w-xs"
                  name="color"
                  value={editPet.color}
                  onChange={hdlEditChange}
                />
                <input
                  type="text"
                  placeholder="ลักษณะเฉพาะ"
                  className="input input-bordered w-full max-w-xs"
                  name="defect"
                  value={editPet.defect}
                  onChange={hdlEditChange}
                />
                <input
                  type="text"
                  placeholder="อายุ"
                  className="input input-bordered w-full max-w-xs"
                  name="age"
                  value={editPet.age}
                  onChange={hdlEditChange}
                />
              </div>
            <div className="flex flex-col justify-center gap-4">
              {/* Vaccine */}
                <div className="flex items-center">
                  <div className="text-l">ประวัติการฉีดวัคซีน :</div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                  name="vaccined"
                  value={editPet.vaccined}
                  onChange={hdlEditChange}
                  >
                  <option value="" disabled>
                    กรุณาเลือกประวัติการฉีดวัคซีน
                  </option>
                    <option value="VACCINED">เคยฉีด</option>
                    <option value="NOT_VACCINED">ไม่เคยฉีด</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <div className="text-l">ฉีดครั้งล่าสุดประมาณปี :</div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                  name="vaccine_date"
                  value={editPet.vaccine_date}
                  onChange={hdlEditChange}
                  >
                  <option value="" disabled>
                    กรุณาเลือกปีที่ฉีดวัคซีน
                  </option>
                    <option value="2561">ปี 2561</option>
                    <option value="2562">ปี 2562</option>
                    <option value="2563">ปี 2563</option>
                    <option value="2564">ปี 2564</option>
                  </select>
                </div>
              {/* Location MAP */}
                <div className="flex items-center">
                  <div className="text-l">สถานที่ : </div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                  name="location_id"
                  value={editPet.location_id}
                  onChange={hdlEditChange}
                  >
                  <option value="" disabled>
                    กรุณาเลือกสถานที่เลี้ยงดู
                  </option>
                  {location.map((row, index) => (
                    <option key={index} value={row.id}>
                      {row.name_location}
                    </option>
                  ))}
                  </select>
                </div>
                {/* Nature MAP */}
                <div className="flex items-center">
                  <div className="text-l">ลักษณะการเลี้ยง : </div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                  name="nature_id"
                  value={editPet.nature_id}
                  onChange={hdlEditChange}
                  >
                  <option value="" disabled>
                    กรุณาเลือกลักษณะการเลี้ยง
                  </option>
                  {nature.map((row, index) => (
                    <option key={index} value={row.id}>
                      {row.name_nature}
                    </option>
                  ))}
                  </select>
                </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-l">ประวัติการทำหมัน : </div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                    name="sterilized"
                    value={editPet.sterilized}
                    onChange={hdlEditChange}
                    >
                  <option value="" disabled>
                    กรุณาเลือกประวัติการทำหมัน
                  </option>
                    <option value="STERILIZED">เคยทำหมัน</option>
                    <option value="NOT_STERILIZED">ไม่เคยทำหมัน</option>
                  </select>
                </div>
              </div>
                <button type="submit" className="btn btn-outline btn-success mt-2">
                  ส่ง <FontAwesomeIcon className="text-xl" icon={"check-circle"}/>
                </button>
              </div>
            </form>
          </div>
          </div>
        </dialog>
      )}

      <div className="overflow-x-auto overflow-y-scroll max-h-96 w-full p-2">
        <div className="flex justify-end">
        <button className="btn btn-outline btn-success" onClick={()=>{fetchData()}}>
                  รีเฟรช <FontAwesomeIcon className="text-xl" icon={"refresh"}/>
          </button>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>ประเภท</th>
              <th>เพศ</th>
              <th>สี</th>
              <th>จุดเด่น</th>
              <th>อายุ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Map Pet Data Table */}
            {data.map((row, index) => (
              <tr key={index}>
              <th>{row.name}</th>
              <td>{row.type === "DOG"
                ? "หมา"
                : "แมว"
              }
              </td>
              <td>{row.gender === "MALE"
              ? "ตัวผู้"
              : "ตัวเมีย"
              }</td>
              <td>{row.color}</td>
              <td>{row.defect}</td>
              <td>{row.age} ปี</td>
              <td className="max-w-4">
                <div className="flex justify- gap-4">
                  <div
                    className="btn btn-circle btn-outline btn-warning"
                    onClick={async () => {
                      await fetchEditData(row.id);
                      setIsEditOpen(true);
                    }}
                  >
                    <FontAwesomeIcon className="text-xl" icon={"file-edit"}/>
                  </div>
                  <div className="btn btn-circle btn-outline btn-error"
                  onClick={() =>
                    alertQuestion(
                      "ต้องการลบไฟล์หรือไม่",
                      "ต้องการลบผู้บันทึกนี้ใช่หรือไม่ ?",
                      async () => {
                        await hdlDelete(row.id);
                      }
                    )
                  }><FontAwesomeIcon className="text-xl" icon={"trash-alt"}/></div>
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

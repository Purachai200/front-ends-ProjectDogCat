import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { fetchLocation, fetchNature } from "../../../../services/recorder/recorder_fetch";

export default function PetsTable(owner_id) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([])
  const [nature, setNature] = useState([])

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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    // Close the modal
    setIsEditOpen(false);
  };

  const handleEditClose = () => {
    // Close the modal
    setIsEditOpen(false);
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
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ตำบล"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="ชื่อผู้ให้ข้อมูล"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สุนัขจำนวน"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="แมวจำนวน"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ประวัติการฉีดวัคซีน"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="วัคซีนครั้ล่าสุดประมาณ"
                  className="input input-bordered w-full max-w-xs"
                />
                <select>
                  <option value="someOption">เคยทำหมัน</option>
                  <option value="otherOption">ไม่เคยทำหมัน</option>
                </select>
                <select>
                  <option value="someOption">วัด</option>
                  <option value="otherOption">อนามัย</option>
                </select>
                <button type="submit" className="btn btn-outline btn-success">
                  ส่ง
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
                  รีเฟรชข้อมูล
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
              <td>{row.type}</td>
              <td>{row.gender}</td>
              <td>{row.color}</td>
              <td>{row.defect}</td>
              <td>{row.age}</td>
              <td className="max-w-4">
                <div className="flex justify- gap-4">
                  <a
                    className="btn btn-circle btn-outline btn-warning"
                    onClick={() => setIsEditOpen(true)}
                  >
                    แก้ไข
                  </a>
                  <a className="btn btn-circle btn-outline btn-error">ลบ</a>
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

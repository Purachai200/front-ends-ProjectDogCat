import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";

export default function Nature_Table() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const [input, setInput] = useState({
    name_nature: "",
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

      const result = await axios.get(`${baseUrl}/recorder/get/nature`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(result.data);
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
      if (input.name_nature === "") {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      await axios.post(`${baseUrl}/recorder/create-nature`, input, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alertSW("เสร็จสิ้น", "เพิ่มสถานที่สำเร็จ", "success");
      setInput({
        name_nature: "",
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
    setIsAddOpen(false);
  };

  const handleClose = () => {
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
        `${baseUrl}/recorder/get/table/nature/from/id/${id}`,
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
      if (editData.name_nature === "") {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      const { id, ...postData } = editData;
      await axios.patch(
        `${baseUrl}/recorder/update-nature/${editData.id}`,
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
        await axios.delete(`${baseUrl}/recorder/delete-nature/${id}`, {
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
              <div className="text-2xl">เพิ่มลักษณะการเลี้ยง</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleClose}
              >
                X
              </a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mt-6 justify-between">
                <input
                  type="text"
                  placeholder="ชื่อลักษณะ"
                  name="name_nature"
                  value={input.name_nature}
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
              <div className="text-2xl">แก้ไขลักษณะการเลี้ยง</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleEditClose}
              >
                X
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <form onSubmit={handleEditSubmit}>
                <div className="flex gap-4 mt-6 justify-between">
                  <input
                    type="text"
                    placeholder="ชื่อลักษณะ"
                    name="name_nature"
                    value={editData.name_nature}
                    onChange={hdlEditChange}
                    className="input input-bordered w-full max-w-xs"
                  />
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
      <div className="overflow-x-auto overflow-y-scroll max-h-96 w-full p-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ชื่อลักษณะการเลี้ยง</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <th>{row.name_nature}</th>
                <td className="max-w-4">
                  <div className="flex justify- gap-4 ">
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
                          "ต้องการลบองค์กรนี้ใช่หรือไม่ ?",
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

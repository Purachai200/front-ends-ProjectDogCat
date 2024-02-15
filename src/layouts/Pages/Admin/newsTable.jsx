import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    title: "",
    image: null,
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

      const result = await axios.get(`${baseUrl}/admin/get/New_Img`, {
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

  const handleFileChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (input.title === "") {
        alertSW("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }

      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("image", input.image);

      await axios.post(`${baseUrl}/admin/news`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      alertSW("เสร็จสิ้น", "เพิ่มข่าวสารใหม่สำเร็จ", "success");
      setInput({
        title: "",
        image: null,
      });
      fetchData();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const hdlDelete = async (id) => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      await axios.delete(`${baseUrl}/admin/delete-news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNew = () => {
    setInput({
      title: "",
      image: null,
    });
    setIsOpen(true);
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
              <div className="text-2xl">เพิ่มข่าวสาร</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleClose}
              >
                X
              </a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mt-6 w-full">
                <input
                  type="text"
                  placeholder="หัวข้อ"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className=" file-input w-full max-w-xs"
                  accept="image/*"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-between">
                <button type="submit" className="btn btn-outline btn-success">
                  บันทึก{" "}
                  <FontAwesomeIcon className="text-xl" icon={"check-circle"} />
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      <div className="overflow-x-auto w-full p-3">
        <div className="flex justify-between">
          <div className="text-2xl">ข่าวสาร</div>
          <div className="btn btn-outline btn-success" onClick={handleNew}>
            เพิ่ม <FontAwesomeIcon className="text-xl" icon={"plus"} />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>หัวข้อ</th>
              <th>ภาพปก</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td className="w-24">
                  <img src={item.url} alt="ภาพปก" />
                </td>
                <td>
                  <div className="flex justify-center gap-4 p-2">
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() =>
                        alertQuestion(
                          "ยืนยันการลบข่าวสาร",
                          "คุณต้องการลบข่าวสารนี้ใช่หรือไม่ ?",
                          () => hdlDelete(item.id)
                        )
                      }
                    >
                      <FontAwesomeIcon className="text-xl" icon={"trash-alt"} />
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

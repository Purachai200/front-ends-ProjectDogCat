import { useState } from "react";
import PetsTable from "./PetsTable";

export default function Register_Table() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    // Close the modal
    setIsAddOpen(false);
  };

  const handleClose = () => {
    // Close the modal
    setIsAddOpen(false);
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
            <form onSubmit={handleSubmit}>
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

      <div className="flex justify-between items-center p-2">
      <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
          <option value="moo1">หมู่ 1</option>
          <option value="moo2">หมู่ 2</option>
        </select>
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
              <th>บ้าน</th>
              <th>จำนวนหมา</th>
              <th>จำนวนแมว</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>บ้านห้วยมะทอ</th>
              <td>14</td>
              <td>13</td>
              <td className="max-w-4">
                <div className="flex justify- gap-4 ">
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
            {/* row 1 */}
            <tr>
              <th>บ้านห้วยมะทอ</th>
              <td>14</td>
              <td>13</td>
              <td className="max-w-4">
                <div className="flex justify- gap-4 ">
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
            {/* row 1 */}
            <tr>
              <th>บ้านห้วยมะทอ</th>
              <td>14</td>
              <td>13</td>
              <td className="max-w-4">
                <div className="flex justify- gap-4 ">
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
            {/* row 1 */}
            <tr>
              <th>บ้านห้วยมะทอ</th>
              <td>14</td>
              <td>13</td>
              <td className="max-w-4">
                <div className="flex justify- gap-4 ">
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
            {/* row 1 */}
            <tr>
              <th>บ้านห้วยมะทอ</th>
              <td>14</td>
              <td>13</td>
              <td className="max-w-4">
                <div className="flex justify- gap-4 ">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

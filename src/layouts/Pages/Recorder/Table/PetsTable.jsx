import { useState } from "react";

export default function PetsTable() {
  const [isEditOpen, setIsEditOpen] = useState(false);

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
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>ประเภท</th>
              <th>เพศ</th>
              <th>สี</th>
              <th>อายุ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>ดำ</th>
              <td>หมา</td>
              <td>ตัวผู้</td>
              <td>ขาว</td>
              <td>1.2 ปี</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

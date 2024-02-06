import React, { useState } from "react";

export default function subdistrictTable() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    // Close the modal
    setIsOpen(false);
  };

  const handleClose = () => {
    // Close the modal
    setIsOpen(false);
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
            <a className="btn btn-circle btn-outline btn-error" onClick={handleClose}>
              X
            </a>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor=""></label>
              <div className="flex gap-4 mt-6">
            <input type="text" placeholder="ชื่อองค์กร" className="input input-bordered w-full max-w-xs" />    
            <input type="text" placeholder="ตำบล" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="flex mt-4 gap-4">
            <input type="text" placeholder="อำเภอ" className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="จังหวัด" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="flex mt-4 gap-4 justify-between">
            <input type="text" placeholder="รหัสไปรษณีย์" className="input input-bordered w-full max-w-xs" />
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
          {/* head */}
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
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="text-l">องค์กรบริหารส่วนตำบลหัวหิน</div>
                </div>
              </td>
              <td>หัวหิน</td>
              <td>ห้วยเม็ก</td>
              <td>กาฬสินธุ์</td>
              <th>
                <button className="btn btn-ghost btn-xs">แก้ไข</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs">ลบ</button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="text-l">องค์กรบริหารส่วนตำบลกุดโดน</div>
                </div>
              </td>
              <td>กุดโดน</td>
              <td>ห้วยเม็ก</td>
              <td>กาฬสินธุ์</td>
              <th>
                <button className="btn btn-ghost btn-xs">แก้ไข</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs">ลบ</button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="text-l">องค์กรบริหารส่วนตำบลโนนสะอาด</div>
                </div>
              </td>
              <td>โนนสะอาด</td>
              <td>ห้วยเม็ก</td>
              <td>กาฬสินธุ์</td>
              <th>
                <button className="btn btn-ghost btn-xs">แก้ไข</button>
              </th>
              <th>
                <button className="btn btn-ghost btn-xs">ลบ</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

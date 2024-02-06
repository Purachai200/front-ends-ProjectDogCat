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
              <div className="text-2xl">เพิ่มผู้บันทึก</div>
            <a className="btn btn-circle btn-outline btn-error" onClick={handleClose}>
              X
            </a>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor=""></label>
              <div className="flex gap-4 mt-6">
            <input type="text" placeholder="ชื่อ" className="input input-bordered w-full max-w-xs" />    
            <input type="text" placeholder="สกุล" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="flex mt-4 gap-4">
            <input type="text" placeholder="ชื่อผู้ใช้" className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="อีเมล์" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="flex mt-4 gap-4">
            <input type="text" placeholder="รหัสผ่าน" className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="ยืนยันรหัสผ่าน" className="input input-bordered w-full max-w-xs" />
              </div>
              <div className="flex mt-4 gap-4 justify-end">
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
        <div className="text-2xl">รายชื่อผู้บันทึก</div>
        <div className="btn btn-outline btn-success" onClick={() => setIsOpen(true)}>เพิ่ม</div>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>สกุล</th>
              <th>ชื่อผู้ใช้</th>
              <th>อีเมล์</th>
              <th>สังกัด</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                พิศมัย
              </td>
              <td>
                ลิ้มรส
              </td>
              <td>recorder1</td>
              <td>pissamai@gmail.com</td>
              <td>องค์กรบริหารส่วนตำบลหัวหิน</td>
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
                พิศมัย
              </td>
              <td>
                ลิ้มรส
              </td>
              <td>recorder1</td>
              <td>pissamai@gmail.com</td>
              <td>องค์กรบริหารส่วนตำบลหัวหิน</td>
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
                พิศมัย
              </td>
              <td>
                ลิ้มรส
              </td>
              <td>recorder1</td>
              <td>pissamai@gmail.com</td>
              <td>องค์กรบริหารส่วนตำบลหัวหิน</td>
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

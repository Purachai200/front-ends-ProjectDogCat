import { useState } from "react";
import PetsTable from "./PetsTable";

export default function Register_Table() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPetAddOpen, setIsPetAddOpen] = useState(false);
  const [isOwnerEdit, setIsOwnerEdit] = useState(false);

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

  const handlePetSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    // Close the modal
    setIsPetAddOpen(false);
  };

  const handlePetClose = () => {
    // Close the modal
    setIsPetAddOpen(false);
  };

  const handleOwnerEdit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    // Close the modal
    setIsOwnerEdit(false);
  };

  const handleOwnerClose = () => {
    // Close the modal
    setIsOwnerEdit(false);
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
              <div className="text-2xl">เพิ่มที่อยู่</div>
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
                  placeholder="ชื่อ"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สกุล"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="เลขบัตรประชาชน"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="บ้าน"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="บ้านเลขที่"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-end">
                <input
                  type="text"
                  placeholder="หมู่"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ซอย"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ถนน"
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
          className="modal modal-bottom sm:modal-bottom"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">แก้ไขที่อยู่และเพิ่มสัตว์เลี้ยง</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleEditClose}
              >
                X
              </a>
            </div>
            <label htmlFor=""></label>
            <div className="flex gap-4 mt-6">
              <input
                type="text"
                placeholder="ชื่อ"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
              <input
                type="text"
                placeholder="สกุล"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
              <input
                type="text"
                placeholder="เลขบัตรประชาชน"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
              <input
                type="text"
                placeholder="เบอร์โทรศัพท์"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
            </div>
            <div className="flex mt-4 gap-4">
              <input
                type="text"
                placeholder="บ้าน"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
              <input
                type="text"
                placeholder="บ้านเลขที่"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
              <input
                type="text"
                placeholder="หมู่"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
              <input
                type="text"
                placeholder="ซอย"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
              <input
                type="text"
                placeholder="ถนน"
                className="input input-bordered w-full max-w-xs "
                disabled
              />
            </div>
            <div className="flex mt-4 gap-4 justify-end p-2">
              <button
                type="submit"
                className="btn btn-outline btn-success"
                onClick={() => {
                  setIsOwnerEdit(true);
                }}
              >
                แก้ไขข้อมูลเจ้าของสัตว์เลี้ยง
              </button>
              <button
                type="submit"
                className="btn btn-outline btn-success"
                onClick={() => setIsPetAddOpen(true)}
              >
                เพิ่มสัตว์เลี้ยง
              </button>
            </div>
            <PetsTable />
            <button
              type="submit"
              className="btn btn-outline btn-success mt-2"
              onClick={handleEditSubmit}
            >
              ยืนยัน
            </button>
          </div>
        </dialog>
      )}

      {/* For Add Pet */}
      {isPetAddOpen && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">เพิ่มสัตว์เลี้ยง</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handlePetClose}
              >
                X
              </a>
            </div>
            <form onSubmit={handlePetSubmit}>
              <label htmlFor=""></label>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  className="input input-bordered w-full max-w-xs"
                />
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
                    <option value="1">หมา</option>
                    <option value="2">แมว</option>
                  </select>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
                    <option value="1">ตัวผู้</option>
                    <option value="2">ตัวเมีย</option>
                  </select>
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="สี"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ลักษณะเฉพาะ"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="อายุ"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              {/* Vaccine */}
              <div className="flex mt-4 gap-4">
                <div className="flex items-center">
                  <div className="text-l">ประวัติการฉีดวัคซีน</div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
                    <option value="1">เคยฉีด</option>
                    <option value="2">ไม่เคยฉีด</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <div className="text-l">ฉีดครั้งล่าสุดประมาณปี</div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
                    <option value="1">ปี 2561</option>
                    <option value="2">ปี 2562</option>
                  </select>
                </div>
              </div>
              {/* Location */}
              <div className="flex mt-4 gap-4">
                <div className="flex items-center">
                  <div className="text-l">สถานที่ : </div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
                    <option value="1">บ้าน</option>
                    <option value="2">นา</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <div className="text-l">ลักษณะการเลี้ยง : </div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
                    <option value="1">เลี้ยงแบบปล่อย</option>
                    <option value="2">เลี้ยงแบบปิด</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-l">ประวัติการทำหมัน : </div>
                  <select className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300">
                    <option value="Sterlized">เคยทำหมัน</option>
                    <option value="UnSterlized">ไม่เคยทำหมัน</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-outline btn-success">
                  ส่ง
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* For Edit Pet Owner */}
      {isOwnerEdit && (
        <dialog
          id="add_modal"
          className="modal modal-bottom sm:modal-middle"
          open
        >
          <div className="modal-box">
            <div className="flex justify-between item-center">
              <div className="text-2xl">แก้ไขที่อยู่</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleOwnerClose}
              >
                X
              </a>
            </div>
            <form onSubmit={handleOwnerEdit}>
              <label htmlFor=""></label>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สกุล"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="เลขบัตรประชาชน"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="บ้าน"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="บ้านเลขที่"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-end">
                <input
                  type="text"
                  placeholder="หมู่"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ซอย"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ถนน"
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
              <th>บ้านแลขที่</th>
              <th>บ้าน</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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
            {/* row 1 */}
            <tr>
              <th>148</th>
              <td>ห้วยมะทอ</td>
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

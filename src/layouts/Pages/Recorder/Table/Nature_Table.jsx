import { useState } from "react";

export default function Nature_Table() {
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
            <label htmlFor=""></label>
            <div className="flex gap-4 mt-6">
            <form onSubmit={handleEditSubmit}>
            <div className="flex gap-4 mt-6 justify-between">
                <input
                  type="text"
                  placeholder="ชื่อลักษณะ"
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
            {/* row 1 */}
            <tr>
              <th>เลี้ยงแบบปล่อย</th>
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
              <th>เลี้ยงแบบปิด</th>
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

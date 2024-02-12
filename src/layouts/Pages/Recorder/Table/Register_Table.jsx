import { useEffect, useState } from "react";
import PetsTable from "./PetsTable";
import useAuth from "../../../../hooks/useAuth";
import {
  fetchAddress,
  fetchLocation,
  fetchNature,
} from "../../../../services/recorder/recorder_fetch";
import axios from "axios";

export default function Register_Table() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPetAddOpen, setIsPetAddOpen] = useState(false);
  const [isOwnerEdit, setIsOwnerEdit] = useState(false);

  const [location, setLocation] = useState([]);
  const [nature, setNature] = useState([]);
  const [address, setAddress] = useState([]);

  const [addressData, setAddressData] = useState([]);
  const [petOwner, setPetOwner] = useState([]);

  const [address_input, setAddress_input] = useState({
    house_name: "",
    house_number: "",
    moo: "",
    soi: "",
    street: "",
  });

  const [petOwner_input, setPetOwner_input] = useState({
    first_name: "",
    last_name: "",
    identity_number: "",
    tel: "",
  });

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
      const addressData = await fetchAddress(baseUrl, token);
      setAddress(addressData);

      const locationData = await fetchLocation(baseUrl, token);
      setLocation(locationData);

      const natureData = await fetchNature(baseUrl, token);
      setNature(natureData);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchEditPetOwner = async (addressId) => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      const result1 = await axios.get(
        `${baseUrl}/recorder/get/table/pet_owner/from/addressId/${addressId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result2 = await axios.get(
        `${baseUrl}/recorder/get/table/address/from/id/${addressId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return setPetOwner(result1.data), setAddressData(result2.data);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // Create
  const handleAddressChange = (e) => {
    setAddress_input((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePetOwnerChange = (e) => {
    setPetOwner_input((prevInput) => ({
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
      if (
        address_input.house_name === "" ||
        address_input.house_number === "" ||
        address_input.moo === "" ||
        address_input.soi === "" ||
        address_input.street === "" ||
        petOwner_input.first_name === "" ||
        petOwner_input.last_name === "" ||
        petOwner_input.identity_number === "" ||
        petOwner_input.tel === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      const addressResponse = await axios.post(
        `${baseUrl}/recorder/create-address/`,
        address_input,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(addressResponse);
      const addressId = addressResponse.data.id;

      if (!addressId) {
        alertSW("มีบางอย่างผิดพลาด", "ไม่สามารถสร้างที่อยู่ได้", "error");
        return;
      }

      await axios.post(
        `${baseUrl}/recorder/create-pet-owner/${addressId}`,
        petOwner_input,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alertSW("เสร็จสิ้น", "แก้ไขข้อมูลผู้บันทึกเสร็จสิ้น", "success");
      setAddress_input({
        house_name: "",
        house_number: "",
        moo: "",
        soi: "",
        street: "",
      });
      setPetOwner_input({
        first_name: "",
        last_name: "",
        identity_number: "",
        tel: "",
      });
      fetchData();
      setIsAddOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setIsAddOpen(false);
  };

  // Update Address And Pet Owner

  const hdlEditChange = (e) => {
    setAddressData((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));

    setPetOwner((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
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
    setIsPetAddOpen(false);
  };

  const handleOwnerEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (!addressData || !petOwner) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }

      // Address 
      const {
        id: address_Id,
        subdistrictId,
        recorderId,
        first_name,
        last_name,
        identity_number,
        tel,
        ...addressDa
      } = addressData;

      // Pet Owner
      const {
        id: petOwnerId,
        addressId,
        house_number,
        house_name,
        moo,
        soi,
        street,
        recorderId: petOwnerRecorderId,
        ...petOwnerDa
      } = petOwner;

      await axios.patch(
        `${baseUrl}/recorder/update-address/${addressData.id}`,
        addressDa,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await axios.patch(
        `${baseUrl}/recorder/update-petOwner/${petOwner.id}`,
        petOwnerDa,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEditPetOwner(addressData.id);
      fetchData();
      handleOwnerClose()
      alertSW("เสร็จสิ้น", "แก้ไขข้อมูลผู้บันทึกเสร็จสิ้น", "success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOwnerClose = () => {
    setIsOwnerEdit(false);
  };

  const handlePetOwnerDelete = async (id) => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      await axios.delete(`${baseUrl}/recorder/delete-address/${id}`, {
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
              <div className="text-2xl">เพิ่มที่อยู่</div>
              <a
                className="btn btn-circle btn-outline btn-error"
                onClick={handleClose}
              >
                X
              </a>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  name="first_name"
                  value={petOwner_input.first_name}
                  onChange={handlePetOwnerChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สกุล"
                  name="last_name"
                  value={petOwner_input.last_name}
                  onChange={handlePetOwnerChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="เลขบัตรประชาชน"
                  name="identity_number"
                  value={petOwner_input.identity_number}
                  onChange={handlePetOwnerChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  name="tel"
                  value={petOwner_input.tel}
                  onChange={handlePetOwnerChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="บ้าน"
                  name="house_name"
                  value={address_input.house_name}
                  onChange={handleAddressChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="บ้านเลขที่"
                  name="house_number"
                  value={address_input.house_number}
                  onChange={handleAddressChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-end">
                <input
                  type="text"
                  placeholder="หมู่"
                  name="moo"
                  value={address_input.moo}
                  onChange={handleAddressChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ซอย"
                  name="soi"
                  value={address_input.soi}
                  onChange={handleAddressChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ถนน"
                  name="street"
                  value={address_input.street}
                  onChange={handleAddressChange}
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
            <div className="flex gap-4 mt-6">
              <input
                type="text"
                placeholder="ชื่อ"
                name="first_name"
                value={petOwner.first_name}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
              <input
                type="text"
                placeholder="สกุล"
                name="last_name"
                value={petOwner.last_name}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
              <input
                type="text"
                placeholder="เลขบัตรประชาชน"
                name="identity_number"
                value={petOwner.identity_number}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
              <input
                type="text"
                placeholder="เบอร์โทรศัพท์"
                name="tel"
                value={petOwner.tel}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
            </div>
            <div className="flex mt-4 gap-4">
              <input
                type="text"
                placeholder="บ้าน"
                name="house_name"
                value={addressData.house_name}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
              <input
                type="text"
                placeholder="บ้านเลขที่"
                name="house_number"
                value={addressData.house_number}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
              <input
                type="text"
                placeholder="หมู่"
                name="moo"
                value={addressData.moo}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
              <input
                type="text"
                placeholder="ซอย"
                name="soi"
                value={addressData.soi}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
              />
              <input
                type="text"
                placeholder="ถนน"
                value={addressData.street}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                
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
            <PetsTable owner_id={petOwner.id}/>
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
                onClick={async () => {
                  await fetchEditPetOwner(addressData.id);
                  handleOwnerClose(false);
                }}
              >
                X
              </a>
            </div>
            <form onSubmit={handleOwnerEdit}>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  name="first_name"
                  value={petOwner.first_name}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="สกุล"
                  name="last_name"
                  value={petOwner.last_name}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="เลขบัตรประชาชน"
                  name="identity_number"
                  value={petOwner.identity_number}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  name="tel"
                  value={petOwner.tel}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="บ้าน"
                  name="house_name"
                  value={addressData.house_name}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="บ้านเลขที่"
                  name="house_number"
                  value={addressData.house_number}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex mt-4 gap-4 justify-end">
                <input
                  type="text"
                  placeholder="หมู่"
                  name="moo"
                  value={addressData.moo}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ซอย"
                  name="soi"
                  value={addressData.soi}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="ถนน"
                  name="street"
                  value={addressData.street}
                  onChange={hdlEditChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-outline btn-success">
                  แก้ไข
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
      <div className="overflow-x-auto overflow-y-scroll max-h-[600px] w-full p-2">
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
            {/* Map Data Registered */}
            {address.map((row, index) => (
              <tr key={index}>
                <th>{row.house_number}</th>
                <td>{row.house_name}</td>
                <td className="max-w-4">
                  <div className="flex justify- gap-4 ">
                    <a
                      className="btn btn-circle btn-outline btn-warning"
                      onClick={async () => {
                        await fetchEditPetOwner(row.id);
                        setIsEditOpen(true);
                      }}
                    >
                      แก้ไข
                    </a>
                    <a className="btn btn-circle btn-outline btn-error" onClick={() =>
                        alertQuestion(
                          "ต้องการลบไฟล์หรือไม่",
                          "ต้องการลบผู้บันทึกนี้ใช่หรือไม่ ?",
                          async () => {
                            await handlePetOwnerDelete(row.id);
                          }
                        )
                      }>ลบ</a>
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

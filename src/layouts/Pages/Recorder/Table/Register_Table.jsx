import { useEffect, useState } from "react";
import PetsTable from "./PetsTable";
import useAuth from "../../../../hooks/useAuth";
import {
  fetchAddress,
  fetchLocation,
  fetchNature,
} from "../../../../services/recorder/recorder_fetch";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  const [selectedMoo, setSelectedMoo] = useState([]);

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

  const [pet, setPet] = useState({
    name: "",
    type: "",
    gender: "",
    color: "",
    defect: "",
    age: "",
    vaccined: "",
    vaccine_date: "",
    sterilized: "",
    location_id: "",
    nature_id: "",
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

  const checkDuplicateIdentityNumber = async (identityNumber) => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return false;
      }
  
      const response = await axios.get(
        `${baseUrl}/recorder/getMatchString/table/pet_owner/from/identity_number/${identityNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      return response.data; // ส่งค่า exists กลับเพื่อตรวจสอบภายในฟังก์ชัน handleSubmit
    } catch (error) {
      console.error("Error checking duplicate identity number:", error);
      return false;
    }
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
        alertSW(
          "มีบางอย่างผิดพลาด",
          "กรุณากรอกข้อมูลให้ครบถ้วน",
          "error"
        );
        return;
      }
  
      const isDuplicate = await checkDuplicateIdentityNumber(
        petOwner_input.identity_number
      );
  
      if (isDuplicate.length === 1) {
        alertSW(
          "มีบางอย่างผิดพลาด",
          "เลขบัตรประชาชนนี้มีอยู่ในระบบแล้ว",
          "error"
        );
        return;
      }
  
      const addressResponse = await axios.post(
        `${baseUrl}/recorder/create-address/`,
        address_input,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const addressId = addressResponse.data.id;
  
      if (!addressId) {
        alertSW("มีบางอย่างผิดพลาด", "ไม่สามารถสร้างที่อยู่ได้", "error");
        return;
      }
  
      const petOwnerResponse = await axios.post(
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
    setIsEditOpen(false);
  };

  // Create Pet Submit

  const hdlPetChange = (e) => {
    setPet((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePetSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }
      if (
        pet.name === "" ||
        pet.type === "" ||
        pet.gender === "" ||
        pet.color === "" ||
        pet.defect === "" ||
        pet.age === "" ||
        pet.vaccined === "" ||
        pet.vaccine_date === "" ||
        pet.sterilized === "" ||
        pet.location_id === "" ||
        pet.nature_id === ""
      ) {
        alertSW("มีบางอย่างผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
        return;
      }
      await axios.post(`${baseUrl}/recorder/create-pet/${petOwner.id}`, pet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alertSW("เสร็จสิ้น", "สร้างข้อมูลสัตวเลี้ยงเสร็จสิ้น", "success");
      setPet({
        name: "",
        type: "",
        gender: "",
        color: "",
        defect: "",
        age: "",
        vaccined: "",
        vaccine_date: "",
        sterilized: "",
        location_id: "",
        nature_id: "",
      });
      setIsPetAddOpen(false);
      fetchData();
    } catch (err) {
      console.log(err);
    }
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
      handleOwnerClose();
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
              <div
                className="btn btn-circle btn-outline btn-error"
                onClick={handleClose}
              >
                X
              </div>
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
              <div
                className="btn btn-circle btn-outline btn-error"
                onClick={handleEditClose}
              >
                X
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <input
                type="text"
                placeholder="ชื่อ"
                name="first_name"
                value={petOwner.first_name}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
              <input
                type="text"
                placeholder="สกุล"
                name="last_name"
                value={petOwner.last_name}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
              <input
                type="text"
                placeholder="เลขบัตรประชาชน"
                name="identity_number"
                value={petOwner.identity_number}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
              <input
                type="text"
                placeholder="เบอร์โทรศัพท์"
                name="tel"
                value={petOwner.tel}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
            </div>
            <div className="flex mt-4 gap-4">
              <input
                type="text"
                placeholder="บ้าน"
                name="house_name"
                value={addressData.house_name}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
              <input
                type="text"
                placeholder="บ้านเลขที่"
                name="house_number"
                value={addressData.house_number}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
              <input
                type="text"
                placeholder="หมู่"
                name="moo"
                value={addressData.moo}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
              <input
                type="text"
                placeholder="ซอย"
                name="soi"
                value={addressData.soi}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
              />
              <input
                type="text"
                placeholder="ถนน"
                value={addressData.street}
                className="input input-bordered w-full max-w-xs text-black bg-gray-200 pointer-events-none"
                readOnly
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
                แก้ไขข้อมูลเจ้าของสัตว์เลี้ยง <FontAwesomeIcon className="text-xl" icon={"edit"}/>
              </button>
              <button
                type="submit"
                className="btn btn-outline btn-success"
                onClick={() => setIsPetAddOpen(true)}
              >
                เพิ่มสัตว์เลี้ยง <FontAwesomeIcon className="text-xl" icon={"dog"}/>
              </button>
            </div>
            <PetsTable owner_id={petOwner.id} />
            <button
              type="submit"
              className="btn btn-outline btn-success mt-2"
              onClick={handleEditSubmit}
            >
              ยืนยัน <FontAwesomeIcon className="text-xl" icon={"check-circle"}/>
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
              <div
                className="btn btn-circle btn-outline btn-error"
                onClick={handlePetClose}
              >
                X
              </div>
            </div>
            <form onSubmit={handlePetSubmit}>
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="ชื่อ"
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  value={pet.name}
                  onChange={hdlPetChange}
                />
                <select
                  className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                  name="type"
                  value={pet.type}
                  onChange={hdlPetChange}
                >
                  <option value="" disabled>
                    กรุณาเลือกประเภท
                  </option>
                  <option value="DOG">หมา</option>
                  <option value="CAT">แมว</option>
                </select>
                <select
                  className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                  name="gender"
                  value={pet.gender}
                  onChange={hdlPetChange}
                >
                  <option value="" disabled>
                    กรุณาเลือกเพศ
                  </option>
                  <option value="MALE">ตัวผู้</option>
                  <option value="FEMALE">ตัวเมีย</option>
                </select>
              </div>
              <div className="flex mt-4 gap-4">
                <input
                  type="text"
                  placeholder="สี"
                  className="input input-bordered w-full max-w-xs"
                  name="color"
                  value={pet.color}
                  onChange={hdlPetChange}
                />
                <input
                  type="text"
                  placeholder="ลักษณะเฉพาะ"
                  className="input input-bordered w-full max-w-xs"
                  name="defect"
                  value={pet.defect}
                  onChange={hdlPetChange}
                />
                <input
                  type="text"
                  placeholder="อายุ"
                  className="input input-bordered w-full max-w-xs"
                  name="age"
                  value={pet.age}
                  onChange={hdlPetChange}
                />
              </div>
              <div className="flex flex-col justify-center p-2">
                {/* Vaccine */}
                <div className="flex items-center">
                  <div className="text-l">ประวัติการฉีดวัคซีน :</div>
                  <select
                    className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                    name="vaccined"
                    value={pet.vaccined}
                    onChange={hdlPetChange}
                  >
                    <option value="" disabled>
                      กรุณาเลือกประวัติการฉีดวัคซีน
                    </option>
                    <option value="VACCINED">เคยฉีด</option>
                    <option value="NOT_VACCINED">ไม่เคยฉีด</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <div className="text-l">ฉีดครั้งล่าสุดประมาณปี :</div>
                  <select
                    className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                    name="vaccine_date"
                    value={pet.vaccine_date}
                    onChange={hdlPetChange}
                  >
                    <option value="" disabled>
                      กรุณาเลือกปีที่ฉีดวัคซีน
                    </option>
                    <option value="2561">ปี 2561</option>
                    <option value="2562">ปี 2562</option>
                    <option value="2563">ปี 2563</option>
                    <option value="2564">ปี 2564</option>
                  </select>
                </div>
                {/* Location MAP */}
                <div className="flex items-center">
                  <div className="text-l">สถานที่ : </div>
                  <select
                    className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                    name="location_id"
                    value={pet.location_id}
                    onChange={hdlPetChange}
                  >
                    <option value="" disabled>
                      กรุณาเลือกสถานที่เลี้ยงดู
                    </option>
                    {location.map((row, index) => (
                      <option key={index} value={row.id}>
                        {row.name_location}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Nature MAP */}
                <div className="flex items-center">
                  <div className="text-l">ลักษณะการเลี้ยง : </div>
                  <select
                    className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                    name="nature_id"
                    value={pet.nature_id}
                    onChange={hdlPetChange}
                  >
                    <option value="" disabled>
                      กรุณาเลือกลักษณะการเลี้ยง
                    </option>
                    {nature.map((row, index) => (
                      <option key={index} value={row.id}>
                        {row.name_nature}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-l">ประวัติการทำหมัน : </div>
                    <select
                      className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
                      name="sterilized"
                      value={pet.sterilized}
                      onChange={hdlPetChange}
                    >
                      <option value="" disabled>
                        กรุณาเลือกประวัติการทำหมัน
                      </option>
                      <option value="STERILIZED">เคยทำหมัน</option>
                      <option value="NOT_STERILIZED">ไม่เคยทำหมัน</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline btn-success mt-2"
                >
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
              <div
                className="btn btn-circle btn-outline btn-error"
                onClick={async () => {
                  await fetchEditPetOwner(addressData.id);
                  handleOwnerClose(false);
                }}
              >
                X
              </div>
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
        <select
          className="p-2 bg-base-100 rounded-box transition-all hover:bg-base-300"
          onChange={(event) => setSelectedMoo(event.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            กรุณาเลือกหมู่เพื่อกรอง
          </option>
          {[...new Set(address.map((row) => row.moo))].map((moo, index) => (
            <option key={index} value={moo}>
              หมู่ {moo}
            </option>
          ))}
        </select>

        <div
          className="btn btn-outline btn-success"
          onClick={() => setIsAddOpen(true)}
        >
          เพิ่ม
          <FontAwesomeIcon icon={"plus"}/>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-scroll max-h-[450px] w-full p-2 table-native">
        {selectedMoo.length === 0 ? (
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
              {address
                .sort((a, b) => a.house_number.localeCompare(b.house_number))
                .map((row, index) => (
                  <tr key={index}>
                    <th>{row.house_number}</th>
                    <td>{row.house_name}</td>
                    <td className="max-w-4">
                      <div className="flex justify- gap-4 ">
                        <div
                          className="btn btn-circle btn-outline btn-warning"
                          onClick={async () => {
                            await fetchEditPetOwner(row.id);
                            setIsEditOpen(true);
                          }}
                        >
                          <FontAwesomeIcon className="text-xl" icon={"edit"}/>
                        </div>
                        <div
                          className="btn btn-circle btn-outline btn-error"
                          onClick={() =>
                            alertQuestion(
                              "ต้องการลบหรือไม่",
                              "ต้องการลบบ้านเลขที่นี้ใช่หรือไม่ ?",
                              async () => {
                                await handlePetOwnerDelete(row.id);
                              }
                            )
                          }
                        >
                          <FontAwesomeIcon className="text-xl" icon={"trash-alt"}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
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
              {address
                .filter((row) => row.moo === selectedMoo)
                .sort((a, b) => a.house_number.localeCompare(b.house_number))
                .map((row, index) => (
                  <tr key={index}>
                    <th>{row.house_number}</th>
                    <td>{row.house_name}</td>
                    <td className="max-w-4">
                      <div className="flex justify- gap-4 ">
                        <div
                          className="btn btn-circle btn-outline btn-warning"
                          onClick={async () => {
                            await fetchEditPetOwner(row.id);
                            setIsEditOpen(true);
                          }}
                        >
                          <FontAwesomeIcon className="text-xl" icon={"edit"}/>
                        </div>
                        <div
                          className="btn btn-circle btn-outline btn-error"
                          onClick={() =>
                            alertQuestion(
                              "ต้องการลบหรือไม่",
                              "ต้องการลบบ้านเลขที่นี้ใช่หรือไม่ ?",
                              async () => {
                                await handlePetOwnerDelete(row.id);
                              }
                            )
                          }
                        >
                          <FontAwesomeIcon className="text-xl" icon={"trash-alt"}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

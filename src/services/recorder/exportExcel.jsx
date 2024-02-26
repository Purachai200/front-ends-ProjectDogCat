import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import useAuth from "../../hooks/useAuth";
import {
  fetchAddress,
  fetchLocation,
  fetchNature,
  fetchPet,
  fetchPetOwner,
  fetchSubAddress,
} from "./recorder_fetch";

const ExcelData = [
  {
    "ชื่อ-นามสกุล": "",
    หมายเลขบัตรประชาชน: "",
    เบอร์โทรศัพท์: "",
    บ้านเลขที่: "",
    หมู่ที่: "",
    ตำบล: "",
    อำเภอ: "",
    จังหวัด: "",
    ซอย: "",
    ถนน: "",
  },
];

const ExportExcel = ({ fileName }) => {
  const { baseUrl, user } = useAuth();

  const [address, setAddress] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [pet, setPet] = useState([]);
  const [location, setLocation] = useState([]);
  const [nature, setNature] = useState([]);

  const [isExporting, setIsExporting] = useState(false);

  const [excelData, setExcelData] = useState(ExcelData);

  useEffect(() => {
    fetchData();
    setIsExporting(true);
  }, []);

  useEffect(() => {
    if (ownerData.length > 0) {
      fetchPetData();
    }
  }, [ownerData]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const addressData = await fetchAddress(baseUrl, token);
      setAddress(addressData);

      const petOwnerData = await fetchPetOwner(baseUrl, token, addressData);
      setOwnerData(petOwnerData);

      const subdistrictAddress = await fetchSubAddress(baseUrl, token, user);
      setSubdistrict(subdistrictAddress);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPetData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const addressData = await fetchAddress(baseUrl, token);
      const petOwnerData = await fetchPetOwner(baseUrl, token, addressData);
      const petData = await fetchPet(baseUrl, token, petOwnerData);

      const locationData = await fetchLocation(baseUrl, token); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล location
      const natureData = await fetchNature(baseUrl, token); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล nature

      const locationMap = new Map(
        locationData.map((location) => [location.id, location])
      );
      const natureMap = new Map(
        natureData.map((nature) => [nature.id, nature])
      );

      if (
        petData &&
        petData.length > 0 &&
        petOwnerData &&
        petOwnerData.length > 0
      ) {
        setPet(petData);
        const petOwnerMap = new Map(
          ownerData.flat(1).map((owner) => [owner.id, owner])
        );

        const addressMap = new Map(
          addressData.map((address) => [address.id, address])
        );

        const excelData = petData.map((pet) => {
          const petOwner = petOwnerMap.get(pet.petOwnerId);
          console.log(subdistrict);
          // console.log(petOwner);
          if (petOwner && petOwner.addressId) {
            const address = addressMap.get(petOwner.addressId);
            if (address) {
              return {
                "ชื่อ-นามสกุล": `${petOwner.first_name} ${petOwner.last_name}`,
                หมายเลขบัตรประชาชน: petOwner.identity_number,
                เบอร์โทรศัพท์: petOwner.tel,
                บ้านเลขที่: address.house_number || "",
                หมู่ที่: address.moo || "",
                ตำบล:
                  subdistrict && subdistrict.length > 0
                    ? subdistrict[0].sub_district || ""
                    : "",
                อำเภอ:
                  subdistrict && subdistrict.length > 0
                    ? subdistrict[0].district || ""
                    : "",
                จังหวัด:
                  subdistrict && subdistrict.length > 0
                    ? subdistrict[0].province || ""
                    : "",
                ซอย: address.soi || "",
                ถนน: address.street || "",
                ประเภทสัตว์เลี้ยง: `${pet.type === "DOG" ? "หมา" : "แมว"}`,
                ชื่อสัตว์เลี้ยง: pet.name,
                เพศ: `${pet.gender === "MALE" ? "ผู้" : "เมีย"}`,
                สี: pet.color,
                ประวัติการฉีดวัคซีน: `${
                  pet.vaccined === "VACCINED" ? "เคยฉีด" : "ไม่เคยฉีด"
                }`,
                วัคซีนครั้งล่าสุดประมาณ: pet.vaccine_date,
                การทำหมัน: `${
                  pet.sterilized === "STERILIZED"
                    ? "ทำหมันแล้ว"
                    : "ยังไม่ทำหมัน"
                }`,
                อายุ: `${pet.age} ปี`,
                ลักษณะการเลี้ยง: pet.natureId,
                สถานที่เลี้ยง: pet.locationId,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        });

        setExcelData(excelData.filter((data) => data !== null));
        console.log(excelData);
      } else {
        console.log("No pet data found.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ตั้งเวลาหยุดนับถอยหลัง
  setTimeout(() => {
    setIsExporting(false);
  }, 10000);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div
      className={`btn btn-outline border-green-400 text-green-400 ${isExporting ? "disabled" : ""}`}
      onClick={exportToExcel}
      disabled={isExporting}
    >
      {isExporting ? `กำลังโหลด` : "ส่งออก"}
    </div>
  );
};

export default ExportExcel;

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
  fetchUnregister,
} from "./recorder_fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExcelData = [
  {
    ข้อมูลเจ้าของสัตว์เลี้ยง: {
      "ชื่อ-สกุล": "",
      หมายเลขบัตรประชาชน: "",
      เบอร์โทรศัพท์: "",
      ที่อยู่: {
        หมู่: "",
        ตำบล: "",
        อำเภอ: "",
        จังหวัด: "",
        ซอย: "",
        ถนน: "",
      },
    },
  },
  {
    ข้อมูลสัตว์เลี้ยง: {
      ประเภทสัตว์เลี้ยง: "",
      ชื่อสัตว์เลี้ยง: "",
      เพศ: "",
      สี: "",
      ประวัติการฉีดวัคซีน: "",
      วัคซีนครั้งล่าสุดประมาณ: "",
      การทำหมัน: "",
      อายุ: "",
      ลักษณะการเลี้ยง: "",
      สถานที่เลี้ยง: "",
    },
  },
];

const ExcelUnreg = {
  "แขวง / ตำบล": "",
  หมู่ที่: "",
  สถานที่อยู่อาศัย: "",
  ชื่อสถานที่อยู่อาศัย: "",
  ผู้ให้ข้อมูล: "",
  "สุนัข (จำนวน)": "",
  "แมว (จำนวน)": "",
  ประวัติการฉีควัคชีน: "",
  การทำหมัน: "",
};

const ExportExcel = ({ fileName }) => {
  const { baseUrl, questionAlert, user } = useAuth();

  const [address, setAddress] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [pet, setPet] = useState([]);

  const [location, setLocation] = useState([]);
  const [nature, setNature] = useState([]);

  const [isExporting, setIsExporting] = useState(false);

  const [excelUnreg, setExcelUnreg] = useState(ExcelUnreg);
  const [excelData, setExcelData] = useState(ExcelData);

  useEffect(() => {
    fetchData();
    setIsExporting(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExporting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ownerData.length > 0) {
      fetchPetData();
      fetchUnregistered();
    }
  }, [ownerData]);

  const hdlRefresh = async () => {
    try {
      fetchData();
      setIsExporting(true);

      const timer = setTimeout(() => {
        setIsExporting(false);
      }, 10000);

      return () => clearTimeout(timer);

      if (ownerData.length > 0) {
        fetchPetData();
        fetchUnregistered();
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const subdistrictAddress = await fetchSubAddress(baseUrl, token, user);
      setSubdistrict(subdistrictAddress);

      const addressData = await fetchAddress(baseUrl, token);
      setAddress(addressData);

      const petOwnerData = await fetchPetOwner(baseUrl, token, addressData);
      setOwnerData(petOwnerData);
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

      const locationData = await fetchLocation(baseUrl, token);
      const natureData = await fetchNature(baseUrl, token);

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
          const location = locationMap.get(pet.locationId);
          const nature = natureMap.get(pet.natureId);
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
                ลักษณะการเลี้ยง: nature.name_nature,
                สถานที่เลี้ยง: location.name_location,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        });

        setExcelData(excelData.filter((data) => data !== null));
        // console.log(excelData);
      } else {
        console.log("No pet data found.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUnregistered = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const locationData = await fetchLocation(baseUrl, token);
      const petData = await fetchUnregister(baseUrl, token);

      const locationMap = new Map(
        locationData.map((location) => [location.id, location])
      );

      if (petData && petData.length > 0) {
        const excelData = petData.map((pet) => {
          const location = locationMap.get(pet.locationId);
          return {
            "แขวง / ตำบล":
              subdistrict && subdistrict.length > 0
                ? subdistrict[0].sub_district || ""
                : "",
            หมู่ที่: pet.address_moo,
            สถานที่อยู่อาศัย: location ? location.location : "",
            ชื่อสถานที่อยู่อาศัย: location ? location.name_location : "",
            ผู้ให้ข้อมูล: pet.name_info,
            "สุนัข (จำนวน)": pet.dog_amount,
            "แมว (จำนวน)": pet.cat_amount,
            ประวัติการฉีควัคชีน: `${
              pet.vaccined === "VACCINED" ? "เคยฉีด" : "ไม่เคยฉีด"
            }`,
            การทำหมัน: `${
              pet.sterilize === "STERILIZED" ? "ทำหมันแล้ว" : "ยังไม่ทำหมัน"
            }`,
          };
        });

        setExcelUnreg(excelData.filter((data) => data !== null));
        // console.log(excelData)
      } else {
        console.log("No pet data found.");
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    if (excelData && excelData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(excelData);
      XLSX.utils.book_append_sheet(wb, ws, "สัตว์มีเจ้าของ");
    }

    if (excelUnreg && excelUnreg.length > 0) {
      const ws2 = XLSX.utils.json_to_sheet(excelUnreg);
      XLSX.utils.book_append_sheet(wb, ws2, "สัตว์ไม่มีเจ้าของ");
    }

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      <div
        className={`btn btn-outline hover:border-green-400 text-green-400 ${
          isExporting ? "disabled" : ""
        }`}
        onClick={() =>
          questionAlert(
            "ต้องการดาวน์โหลดหรือไม่",
            "ดาวน์โหลดข้อมูลหรือไม่ ?",
            exportToExcel,
            "ดาวน์โหลดเสร็จสิ้น",
            "ดาวน์โหลดเสร็จสิ้น"
          )}
        disabled={isExporting}
      >
        {isExporting ? `กำลังโหลด` : "ส่งออก"}
      </div>
      <div className="btn btn-outline hover:border-green-400 text-green-400" onClick={hdlRefresh}>
        <FontAwesomeIcon className="text-xl" icon={"refresh"} />
      </div>
    </div>
  );
};

export default ExportExcel;
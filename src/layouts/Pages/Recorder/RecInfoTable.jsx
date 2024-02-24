import { useEffect, useState } from "react";
import {
  fetchAllAddress,
  fetchAllPet,
  fetchAllPetOwner,
} from "../../../services/recorder/recorder_fetch";
import useAuth from "../../../hooks/useAuth";

export default function RecInfoTable() {
  const [selectedMoo, setSelectedMoo] = useState([]);
  const [address, setAddress] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [pet, setPet] = useState([]);

  const { baseUrl } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("DogAndCattoken");
      if (!token) {
        return;
      }

      const petOwnerData = await fetchAllPetOwner(baseUrl, token);
      setOwnerData(petOwnerData);

      const addressData = await fetchAllAddress(baseUrl, token);
      setAddress(addressData);

      const petData = await fetchAllPet(baseUrl, token);
      setPet(petData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content-native">
      <div className="flex justify-between items-center mb-3">
        <div className="text-xl">ตารางข้อมูลเจ้าของสัตว์</div>
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
      </div>
      <div className="overflow-x-auto overflow-y-scroll max-h-[600px] w-full p-2">
        {selectedMoo.length === 0 ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>บ้านแลขที่</th>
                <th>ชื่อ - สกุล</th>
                <th>จำนวนหมา</th>
                <th>จำนวนแมว</th>
              </tr>
            </thead>
            <tbody>
              {/* Map Data Registered */}
              {ownerData
                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                .map((row, index) => (
                  <tr key={index}>
                    <td>
                      {address.map((item, index) => {
                        if (item.id === row.addressId) {
                          return <p key={index}>{item.house_number}</p>;
                        }
                      })}
                    </td>
                    <td>
                      {row.first_name} {row.last_name}
                    </td>
                    <td className="text-center">
                      {
                        pet.filter(
                          (item) =>
                            item.petOwnerId === row.id && item.type === "DOG"
                        ).length
                      }
                    </td>
                    <td className="text-center">
                      {
                        pet.filter(
                          (item) =>
                            item.petOwnerId === row.id && item.type === "CAT"
                        ).length
                      }
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
                <th>ชื่อ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Map Data Registered */}
              {ownerData
                .filter((owner) => {
                  const addressOfOwner = address.find(
                    (addr) => addr.id === owner.addressId
                  );
                  return addressOfOwner && addressOfOwner.moo === selectedMoo;
                })
                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                .map((owner, index) => (
                  <tr key={index}>
                    <td>
                      {address.map((item, index) => {
                        if (item.id === owner.addressId) {
                          return <p key={index}>{item.house_number}</p>;
                        }
                      })}
                    </td>
                    <td>
                      {owner.first_name} {owner.last_name}
                    </td>
                    <td className="text-center">
                      {
                        pet.filter(
                          (item) =>
                            item.petOwnerId === owner.id && item.type === "DOG"
                        ).length
                      }
                    </td>
                    <td className="text-center">
                      {
                        pet.filter(
                          (item) =>
                            item.petOwnerId === owner.id && item.type === "CAT"
                        ).length
                      }
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

import { useEffect, useState } from "react";
import {
  fetchAddress,
  fetchPet,
  fetchPetOwner,
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

      const petData = await fetchPet(baseUrl, token, ownerData);
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
      <div className="overflow-x-auto overflow-y-scroll max-h-[450px] w-full p-2 table-native">
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
              {ownerData.map((owners, index) =>
                owners.map((row, rowIndex) => {
                  let numDogs = 0;
                  let numCats = 0;
                  pet.forEach((item) => {
                    if (item.petOwnerId === row.id) {
                      if (item.type === "DOG") numDogs++;
                      else if (item.type === "CAT") numCats++;
                    }
                  });
                  return (
                    <tr key={`${index}-${rowIndex}`}>
                      <td>
                        {address
                          .filter((item) => item.id === row.addressId)
                          .map((item, addressIndex) => (
                            <p key={addressIndex}>{item.house_number}</p>
                          ))}
                      </td>
                      <td>
                        {row.first_name} {row.last_name}
                      </td>
                      <td className="text-center">{numDogs}</td>
                      <td className="text-center">{numCats}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        ) : (
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
                .filter((owners) =>
                  owners.some((owner) => {
                    const addressOfOwner = address.find(
                      (addr) => addr.id === owner.addressId
                    );
                    return addressOfOwner && addressOfOwner.moo === selectedMoo;
                  })
                )
                .sort((a, b) => {
                  const aMoo = address.find(
                    (addr) => addr.id === a[0].addressId
                  ).moo;
                  const bMoo = address.find(
                    (addr) => addr.id === b[0].addressId
                  ).moo;
                  return aMoo.localeCompare(bMoo);
                })
                .map((owners, index) =>
                  owners.map((row, rowIndex) => {
                    let numDogs = 0;
                    let numCats = 0;
                    pet.forEach((item) => {
                      if (item.petOwnerId === row.id) {
                        if (item.type === "DOG") numDogs++;
                        else if (item.type === "CAT") numCats++;
                      }
                    });
                    return (
                      <tr key={`${index}-${rowIndex}`}>
                        <td>
                          {address
                            .filter((item) => item.id === row.addressId)
                            .map((item, addressIndex) => (
                              <p key={addressIndex}>{item.house_number}</p>
                            ))}
                        </td>
                        <td>
                          {row.first_name} {row.last_name}
                        </td>
                        <td className="text-center">{numDogs}</td>
                        <td className="text-center">{numCats}</td>
                      </tr>
                    );
                  })
                )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

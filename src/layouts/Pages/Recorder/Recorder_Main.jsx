import { useEffect, useState } from "react";
import RecInfoTable from "./RecInfoTable";
import useAuth from "../../../hooks/useAuth";
import {
  fetchAddress,
  fetchPet,
  fetchPetOwner,
  fetchUnregister,
} from "../../../services/recorder/recorder_fetch";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function Recorder_Main() {
  ChartJS.register(ArcElement, Tooltip);

  const [pet, setPet] = useState([]);
  const [address, setAddress] = useState([])
  const [ownerData, setOwnerData] = useState([])
  const [unregister, setUnregister] = useState([]);

  const { baseUrl, alertSW, alertQuestion, user } = useAuth();

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

      const unregisterData = await fetchUnregister(baseUrl, token);
      setUnregister(unregisterData);

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

  const dogData = {
    labels: [
      "ได้รับวัคซีนแล้ว",
      "ยังไม่ได้รับวัคซีน",
      "ทำหมันแล้ว",
      "ยังไม่ได้ทำหมัน",
    ],
    datasets: [
      {
        label: "สุนัข",
        data: [
          pet.filter(
            (item) => item.type === "DOG" && item.vaccined === "VACCINED"
          ).length,
          pet.filter(
            (item) => item.type === "DOG" && item.vaccined === "NOT_VACCINED"
          ).length,
          pet.filter(
            (item) => item.type === "DOG" && item.sterilized === "STERILIZED"
          ).length,
          pet.filter(
            (item) =>
              item.type === "DOG" && item.sterilized === "NOT_STERILIZED"
          ).length,
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
          "rgb(0, 200, 100)",
          "rgb(255, 100, 0)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const catData = {
    labels: [
      "ได้รับวัคซีนแล้ว",
      "ยังไม่ได้รับวัคซีน",
      "ทำหมันแล้ว",
      "ยังไม่ได้ทำหมัน",
    ],
    datasets: [
      {
        label: "แมว",
        data: [
          pet.filter(
            (item) => item.type === "CAT" && item.vaccined === "VACCINED"
          ).length,
          pet.filter(
            (item) => item.type === "CAT" && item.vaccined === "NOT_VACCINED"
          ).length,
          pet.filter(
            (item) => item.type === "CAT" && item.sterilized === "STERILIZED"
          ).length,
          pet.filter(
            (item) =>
              item.type === "CAT" && item.sterilized === "NOT_STERILIZED"
          ).length,
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
          "rgb(0, 200, 100)",
          "rgb(255, 100, 0)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const unregData = {
    labels: ["หมา", "แมว"],
    datasets: [
      {
        label: "ไม่ได้ลงทะเบียน",
        data: [
          unregister.reduce((total, item) => total + item.dog_amount, 0),
          unregister.reduce((total, item) => total + item.cat_amount, 0),
        ],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(0, 200, 100)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="max-w-full p-2 justify-center items-center transition-all ">
      <div className="min-h-0 flex h-full justify-between content-native">
        <div className="container h-full p-0 ">
          <RecInfoTable />
        </div>
        <div className="container h-full p-0 flex flex-col gap-8 justify-center items-center">
          <div className="container h-[200px] w-[90%] outline outline-1 rounded-box p-2">
            <div className="text-3xl text-center">ปริมาณสุนัขที่ลงทะเบียน</div>
            <div className="flex flex-row justify-center items-center gap-6">
              <div className="flex flex-col">
                <div className="text-xl">
                  สุนัขที่ลงทะเบียน :{" "}
                  {pet.filter((item) => item.type === "DOG").length} ตัว
                </div>
                <div>
                  สุนัขที่ได้รับวัคซีน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "DOG" && item.vaccined === "VACCINED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div>
                  สุนัขที่ได้ทำหมัน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "DOG" && item.sterilized === "STERILIZED"
                    ).length
                  }{" "}
                  ตัว
                </div>
              </div>
              <div className="max-w-32">
                <Doughnut data={dogData} />
              </div>
            </div>
          </div>
          <div className="container h-[200px] w-[90%] outline outline-1 rounded-box p-2">
            <div className="text-3xl text-center">ปริมาณแมวที่ลงทะเบียน</div>
            <div className="flex flex-row justify-center items-center gap-6">
              <div className="flex flex-col">
                <div className="text-xl">
                  สุนัขที่ลงทะเบียน :{" "}
                  {pet.filter((item) => item.type === "CAT").length} ตัว
                </div>
                <div>
                  สุนัขที่ได้รับวัคซีน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "CAT" && item.vaccined === "VACCINED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div>
                  สุนัขที่ได้ทำหมัน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "CAT" && item.sterilized === "STERILIZED"
                    ).length
                  }{" "}
                  ตัว
                </div>
              </div>
              <div className="max-w-32">
                <Doughnut data={catData} />
              </div>
            </div>
          </div>
          <div className="container h-[200px] w-[90%] outline outline-1 rounded-box p-2">
            <div className="text-center">
              <div className="text-3xl">ปริมาณสัตว์ที่ไม่ได้ลงทะเบียน</div>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  จำนวนสุนัข :{" "}
                  {unregister.reduce(
                    (total, item) => total + item.dog_amount,
                    0
                  )}
                </div>
                <div className="text-center">
                  จำนวนแมว :{" "}
                  {unregister.reduce(
                    (total, item) => total + item.cat_amount,
                    0
                  )}
                </div>
              </div>
              <div className=" flex justify-center">
                <div className="max-w-32">
                  <Doughnut data={unregData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

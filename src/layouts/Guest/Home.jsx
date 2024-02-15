import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


export default function Home() {

  ChartJS.register(ArcElement, Tooltip);
  const [pet, setPet] = useState([]);
  const [unregister, setUnregister] = useState([]);
  const [news, setNews] = useState([]);

  const { baseUrl } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        try {
          const result = await axios.get(
            `${baseUrl}/auth/getPet/pet`
          );
          setPet(result.data);
        } catch (err) {
          console.error(err);
          return [];
        }

        try {
          const result = await axios.get(
            `${baseUrl}/auth/getNews/New_Img`
          );
          setNews(result.data);
        } catch (err) {
          console.error(err);
          return [];
        }

        try {
          const result = await axios.get(
            `${baseUrl}/auth/getUnreg/unregistered`
          );
          setUnregister(result.data);
        } catch (err) {
          console.error(err);
          return [];
        }
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
    <div className="min-h-0 flex justify-between items-center">
      <div className="container">
        <div className="container h-screen p-0 flex justify-center items-center">
          <div className="h-3/4 m-1 carousel carousel-vertical rounded-box">
            {news.map((row, index) => (
            <div key={index} className="carousel-item h-full w-full">
              <img src={row.url} />
            </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container h-screen p-0 flex flex-col gap-8 justify-center items-center ">
        <div className="container h-[200px] w-[90%] outline outline-1 rounded-box p-2">
          <div className="text-3xl text-center">ปริมาณสุนัขที่ลงทะเบียน</div>
          <div className="flex flex-row justify-center items-center gap-6">
              <div className="flex flex-col">
                <div className="text-xl">
                  สุนัขที่ลงทะเบียน :{" "}
                  {pet.filter((item) => item.type === "DOG").length} ตัว
                </div>
                <div className="text-green-700">
                  สุนัขที่ได้รับวัคซีน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "DOG" && item.vaccined === "VACCINED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div className="text-red-500">
                  สุนัขที่ไม่ได้รับวัคซีน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "DOG" && item.vaccined === "NOT_VACCINED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div className="text-green-700">
                  สุนัขที่ได้ทำหมัน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "DOG" && item.sterilized === "STERILIZED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div className="text-red-500">
                  สุนัขที่ไม่ได้ทำหมัน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "DOG" && item.sterilized === "NOT_STERILIZED"
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
                  แมวที่ลงทะเบียน :{" "}
                  {pet.filter((item) => item.type === "CAT").length} ตัว
                </div>
                <div className="text-green-700">
                  แมวที่ได้รับวัคซีน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "CAT" && item.vaccined === "VACCINED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div className="text-red-500">
                  แมวที่ไม่ได้รับวัคซีน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "CAT" && item.vaccined === "NOT_VACCINED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div className="text-green-700">
                  แมวที่ได้ทำหมัน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "CAT" && item.sterilized === "STERILIZED"
                    ).length
                  }{" "}
                  ตัว
                </div>
                <div className="text-red-500">
                  แมวที่ไม่ได้ทำหมัน :{" "}
                  {
                    pet.filter(
                      (item) =>
                        item.type === "CAT" && item.sterilized === "NOT_STERILIZED"
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
          <div className="text-3xl text-center">ปริมาณแมวที่ลงทะเบียน</div>
          <div className="flex justify-center gap-4">
                <div className="text-center text-blue-500">
                  จำนวนสุนัข :{" "}
                  {unregister.reduce(
                    (total, item) => total + item.dog_amount,
                    0
                  )}
                </div>
                <div className="text-center text-green-500">
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
  );
}

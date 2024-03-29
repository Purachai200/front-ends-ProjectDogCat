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
      const petResult = await axios.get(`${baseUrl}/auth/getPet/pet`);
      if (Array.isArray(petResult.data)) {
        setPet(petResult.data);
      } else {
        console.error("Pet data is not an array:", petResult.data);
        setPet([]);
      }
  
      const newsResult = await axios.get(`${baseUrl}/auth/getNews/New_Img`);
      if (Array.isArray(newsResult.data)) {
        setNews(newsResult.data);
      } else {
        console.error("News data is not an array:", newsResult.data);
        setNews([]);
      }
  
      const unregResult = await axios.get(`${baseUrl}/auth/getUnreg/unregistered`);
      if (Array.isArray(unregResult.data)) {
        setUnregister(unregResult.data);
      } else {
        console.error("Unregister data is not an array:", unregResult.data);
        setUnregister([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const dogData = {
    
    labels: [
      "ได้รับวัคซีนแล้ว",
      "ยังไม่ได้รับวัคซีน",
      "ทำหมันแล้ว",
      "ยังไม่ได้ทำหมัน",
    ],
    datasets: [],
  };

  try {
    try {
      if (Array.isArray(pet) && pet.length > 0) {
      } else {
        // console.error("Pet data is not a valid array:", pet);
      }
    } catch (error) {
      // console.error("Error processing pet data:", error);
    }
    if (pet.length > 0) {
      dogData.datasets.push({
        label: "สุนัข",
        data: [
          pet.filter((item) => item.type === "DOG" && item.vaccined === "VACCINED").length,
          pet.filter((item) => item.type === "DOG" && item.vaccined === "NOT_VACCINED").length,
          pet.filter((item) => item.type === "DOG" && item.sterilized === "STERILIZED").length,
          pet.filter((item) => item.type === "DOG" && item.sterilized === "NOT_STERILIZED").length,
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
          "rgb(0, 200, 100)",
          "rgb(255, 100, 0)",
        ],
        hoverOffset: 4,
      });
    }
  } catch (error) {
    console.error("Error at dog data:", error);
  }

  const catData = {
    labels: [
      "ได้รับวัคซีนแล้ว",
      "ยังไม่ได้รับวัคซีน",
      "ทำหมันแล้ว",
      "ยังไม่ได้ทำหมัน",
    ],
    datasets: [],
  };

  try {
    try {
      if (Array.isArray(pet) && pet.length > 0) {
      } else {
        // console.error("Pet data is not a valid array:", pet);
      }
    } catch (error) {
      // console.error("Error processing pet data:", error);
    }
    if (pet.length > 0) {
      catData.datasets.push({
        label: "แมว",
        data: [
          pet.filter((item) => item.type === "CAT" && item.vaccined === "VACCINED").length,
          pet.filter((item) => item.type === "CAT" && item.vaccined === "NOT_VACCINED").length,
          pet.filter((item) => item.type === "CAT" && item.sterilized === "STERILIZED").length,
          pet.filter((item) => item.type === "CAT" && item.sterilized === "NOT_STERILIZED").length,
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 0, 0)",
          "rgb(0, 200, 100)",
          "rgb(255, 100, 0)",
        ],
        hoverOffset: 4,
      });
    }
  } catch (error) {
    console.error("Error at cat data:", error);
  }

  const unregData = {
    labels: ["หมา", "แมว"],
    datasets: [],
  };

  try {
    try {
      if (Array.isArray(pet) && pet.length > 0) {
      } else {
        // console.error("Pet data is not a valid array:", pet);
      }
    } catch (error) {
      // console.error("Error processing pet data:", error);
    }
    if (unregister.length > 0) {
      unregData.datasets.push({
        label: "ไม่ได้ลงทะเบียน",
        data: [
          unregister.reduce((total, item) => total + item.dog_amount, 0),
          unregister.reduce((total, item) => total + item.cat_amount, 0),
        ],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(0, 200, 100)"],
        hoverOffset: 4,
      });
    }
  } catch (error) {
    console.error("Error at unregistered data:", error);
  }

  return (
    <div className="min-h-0 flex justify-between items-center content-native">
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
                สุนัขที่ลงทะเบียน : {pet.filter((item) => item.type === "DOG").length} ตัว
              </div>
              {/* Other pet-related statistics */}
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
                แมวที่ลงทะเบียน : {pet.filter((item) => item.type === "CAT").length} ตัว
              </div>
              {/* Other pet-related statistics */}
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
              {unregister.reduce((total, item) => total + item.dog_amount, 0)}
            </div>
            <div className="text-center text-green-500">
              จำนวนแมว :{" "}
              {unregister.reduce((total, item) => total + item.cat_amount, 0)}
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

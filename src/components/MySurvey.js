import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GirlRed from "./Imgs/girl_red.png";
import Calender from "./Imgs/calendar_list.png";
import Close from "./Imgs/close.png";
import { GoKebabVertical } from "react-icons/go";

function MySurvey() {
  const [surveys, setSurveys] = useState([]);
  const [close, setClose] = useState(true);

  const handleClose = () => {
    setClose(false);
  };
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod/get_my_surveys",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSurveys(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSurveys();
  }, []);
  return (
    <div className="bg-cover bg-gray-50 flex min-h-screen ml-60 mt-20 p-5">
      <h1 className="text-2xl font-semibold mb-4">My Surveys</h1>
      <div className="ml-auto">
        <Link to="/create-survey">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            CreateSurvey
          </button>
        </Link>
      </div>
      <ul className="absolute mt-20 space-y-4 w-4/5">
        {surveys.map((survey) => (
          <li
            key={survey.id}
            className="border border-gray-200 rounded-lg shadow-md p-4"
          >
            <div className="flex relative">
              <h2 className="font-semibold text-lg mb-2">
                {survey.survey_name}
              </h2>
              <div className="absolute top-0 right-0">
                <GoKebabVertical />
              </div>
            </div>
            <div className="flex">
              <img src={Calender} alt="" />
              <p className="text-gray-500 ml-2">{survey.survey_update_date}</p>
            </div>
            <div className="relative">
              <button className="absolute right-0 bottom-0 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                VIEW RESPONSE
              </button>
            </div>
          </li>
        ))}
      </ul>
      {close && (
        <div className="flex relative">
          <div className="fixed bottom-0 right-0 m-10">
            <img
              src={Close}
              alt=""
              className="absolute top-7 right-0"
              onClick={handleClose}
            />
            <div className="card p-8 shadow-md w-[500px]">
              <div>Create or answer 10 survey & earn 200</div>
            </div>
            <img
              className="absolute top-0 right-8 object-cover"
              src={GirlRed}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MySurvey;

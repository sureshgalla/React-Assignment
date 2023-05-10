import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GirlRed from "./Imgs/girl_red.png";

function MySurvey() {
  const [surveys, setSurveys] = useState([]);

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
      <ul className="space-y-4">
        {surveys.map((survey) => (
          <li
            key={survey.id}
            className="border border-gray-200 rounded-lg shadow-md p-4"
          >
            <h2 className="font-semibold text-lg mb-2">{survey.survey_name}</h2>
            <p className="text-gray-500">{survey.survey_update_date}</p>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-0 right-0 m-10">
        <div className="card p-8 shadow-md w-[500px]">
          <div>Create or answer 10 survey & earn 200</div>
        </div>
        <img
          src={GirlRed}
          alt=""
          className="absolute top-0 right-8 object-cover"
        />
      </div>
    </div>
  );
}

export default MySurvey;

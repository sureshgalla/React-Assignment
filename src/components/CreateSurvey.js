import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [survey, setSurvey] = useState({
    survey_name: "",
    survey_description: "",
  });

  // Function to check if both survey_name and survey_description have a value
  const isNextButtonDisabled = !(
    survey.survey_name && survey.survey_description
  );

  const handleChange = (e) => {
    setSurvey({ ...survey, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const token = localStorage.getItem("accessToken"); // get token from local storage
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .post(
        "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod/create_survey_request",
        survey
      )
      .then((response) => {
        console.log("Survey created", response.data);
        navigate("/add-question");
      })
      .catch((error) => {
        console.error("Error creating survey", error);
        // handle error here
      });
    navigate("/add-question");
  };

  return (
    <div>
      <div className="bg-gray-200 h-16 ml-60 mt-20">
        <h1 className="text-blue-800 text-xl ml-14">Create Survey</h1>
        <div className="ml-14 text-sm">
          Home / MySurvey / <span className="text-blue-800">CreateSurvey</span>
        </div>
      </div>
      <div className="bg-cover bg-gray-50 flex ml-60 p-5 flex flex-col mt-0 gap-2 ml-60">
        <h1 className="ml-8 text-2xl mt-8 font-bold">
          Survey Subject & Description
        </h1>
        <input
          className="max-w-xs m-8 border border-yellow-400 rounded px-4 py-2 bg-pink-50"
          type="text"
          placeholder="Survey Name"
          onChange={handleChange}
          name="survey_name"
          value={survey.survey_name}
        />
        <textarea
          className="max-w-xl m-8 border border-yellow-400 rounded-lg px-4 py-6 bg-pink-50"
          placeholder="Describe your survey"
          onChange={handleChange}
          name="survey_description"
          value={survey.survey_description}
        />
        <div className="border-b border-gray-200 my-2 mt-20"></div>
        <button
          className={`py-2 px-4 rounded ${
            isNextButtonDisabled
              ? "bg-gray-100 text-gray-400 "
              : "bg-blue-500 text-white"
          } w-20`}
          onClick={handleNext}
          disabled={isNextButtonDisabled} // Disable the button if either survey_name or survey_description is empty
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateSurvey;

import React from "react";
import MySurvey from "./Imgs/my_surveys.png";
import RequestedSurvey from "./Imgs/requested_surveys.png";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="fixed top-20 left-0 flex flex-col h-screen w-56 bg-white-800">
        <div className="text-lg font-bold p-4">Survey </div>
        <div className="border-b border-gray-700 my-2 ml-4"></div>
        <div className="p-4">
          <div className=" flex mb-2 text-blue-800">
            <img src={MySurvey} alt="" className="mr-5" />
            My Surveys
          </div>
          <div className="flex mb-2 mt-10">
            <img src={RequestedSurvey} alt="" className="mr-5" />
            Requested Surveys
          </div>
        </div>
        <div className="flex-grow h-full"></div>
        <div className="text-lg font-bold text-center p-4">
          Hard work will pay off later, Laziness
          <div className="text-xs font-gray-200 p-4 mb-20">- Adam Amith</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

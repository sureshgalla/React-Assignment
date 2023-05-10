import React from "react";
import downarrow from "./Imgs/down_arrow.png";
import profile from "./Imgs/profile.png";
import token from "./Imgs/token.png";
import calender from "./Imgs/calender.png";
import notification from "./Imgs/notification.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 bg-blue-500 h-20 w-full">
      <ul className="float-right mr-10 flex leading-[80px] space-x-4 text-white">
        <li>
          <div className="flex items-center">
            <span>Learn</span>
            <img src={downarrow} alt="" className="ml-3 mr-8" />
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <span>Network</span>
            <img src={downarrow} alt="" className="ml-3 mr-8" />
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <span>Evaluate</span>
            <img src={downarrow} alt="" className="ml-3 mr-8" />
          </div>
        </li>
        <li>Jobs</li>
        <li className="flex items-center">
          <div className="flex items-center">
            <img src={profile} alt="" className="ml-8" />
            <div className="flex flex-col ml-2">
              <span className="text-xs font-bold">1305</span>
              <span className="text-xs">profile Score</span>
            </div>
          </div>
        </li>

        <li className="flex items-center">
          <div className="flex items-center">
            <img src={token} alt="" className="ml-8" />
            <div className="flex flex-col ml-2">
              <span className="text-xs font-bold">400</span>
              <span className="text-xs">Tokens</span>
            </div>
          </div>
        </li>
        <li className="flex items-center">
          <div>
            <img src={calender} alt="" className="ml-8 mr-8" />
          </div>
        </li>
        <li className="flex items-center">
          <img src={notification} alt="" className="mr-8" />
        </li>
        <li>
          <div className="flex items-center">
            <span>avtar Sangeeta</span>
            <img src={downarrow} alt="" className="ml-3 mr-8" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

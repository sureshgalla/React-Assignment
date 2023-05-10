import React, { useState } from "react";
import Close from "./Imgs/close.png";
import SurveySentModel from "./ShareSurveySuccessfull";

const ShareSurveyModel = ({ cancelModel }) => {
  const [display, setDisplay] = useState(false);
  const [emails, setEmails] = useState([]);

  const handleEmailChange = (e) => {
    const email = e.target.value.trim();
    if (email !== "" && isValidEmail(email)) {
      setEmails([...emails, email]);
      e.target.value = "";
    }
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const isValidEmail = (email) => {
    // Regular expression to match email address
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleShare = (e) => {
    e.preventDefault();
    setDisplay(true);
  };
  return (
    <div>
      <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium">Share Survey</h2>
            <img src={Close} alt="" onClick={cancelModel} />
          </div>
          <form>
            <div class="flex items-center mb-2">
              <p class="ml-2 text-sm text-gray-500">People</p>
            </div>
            <div class="mb-4">
              <div class="flex flex-wrap">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    class="flex items-center border border-gray-400 rounded-full px-3 py-1 mr-2 mb-2"
                  >
                    <span class="mr-2">{email}</span>
                    <img
                      src={Close}
                      alt="Remove email"
                      onClick={() => removeEmail(index)}
                      class="cursor-pointer"
                    />
                  </div>
                ))}
                <input
                  type="text"
                  class="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter email addresses"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                class="bg-gray-200 text-gray-600 px-4 py-2 rounded mr-2 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                onClick={cancelModel}
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
      {display && <SurveySentModel onCancel={cancelModel} />}
    </div>
  );
};

export default ShareSurveyModel;

import React from "react";

const SurveySentModel = ({ emails, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <span role="img" aria-label="love" className="text-4xl mr-2">
            ❤️
          </span>
          <h2 className="text-lg font-medium text-green-500 mb-">
            Survey Sent Successfully
          </h2>
        </div>
        <p className="mb-4">
          Your survey was sent successfully to the following connections:
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => onCancel("hurry")}
          >
            Hurry
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveySentModel;

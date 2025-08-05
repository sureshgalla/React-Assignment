import React, { useState } from "react";
import axios from "axios";
import { SlLike, SlDislike } from "react-icons/sl";
import Close from "./Imgs/close.png";
import GirlClock from "./Imgs/girl_clock.png";
import ShareSurveyModel from "./ShareSurveyModel";
import { useNavigate } from "react-router-dom";

const AddQuestions = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState(true);
  const [disable, setDisable] = useState(true);
  const [model, setModel] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { optionNumber: 1, value: "" },
    { optionNumber: 2, value: "" },
  ]);
  const [questionsList, setQuestionsList] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] =
    useState("Single Choice");

  // drop down change
  const handleQuestionTypeChange = (e) => {
    setSelectedQuestionType(e.target.value);
    if (e.target.value === "Yes/No") {
      setOptions([
        {
          optionNumber: 1,
          value: "Yes",
          icon: <SlLike className="h-6 w-6" />,
        },
        {
          optionNumber: 2,
          value: "No",
          icon: <SlDislike className="h-6 w-6" />,
        },
      ]);
      setDisable(false);
    } else {
      setOptions([
        { optionNumber: 1, value: "" },
        { optionNumber: 2, value: "" },
      ]);
      setDisable(true);
    }
  };

  // add options
  const handleAddOption = () => {
    const newOptionNumber = options[options.length - 1].optionNumber + 1;
    const defaultOptions =
      selectedQuestionType === "Single Choice"
        ? [{ optionNumber: newOptionNumber, value: "" }]
        : "";
    setOptions([...options, ...defaultOptions]);

    setCancel(true);
  };

  // option change
  const handleOptionChange = (index, e) => {
    const updatedOptions = [...options];
    if (selectedQuestionType === "Single Choice") {
      updatedOptions[index].value = e.target.value;
    }
    setOptions(updatedOptions);
  };

  // delete option
  const handleCancel = (index) => {
    const updatedOptions = options.filter((element, i) => i !== index);
    setOptions(updatedOptions);
  };

  // delete question
  const cancelQuestion = (index) => {
    const deleteQuestion = questionsList.filter((element, i) => i !== index);
    setQuestionsList(deleteQuestion);
  };

  // open model
  const handleModel = () => {
    setModel(true);
  };

  // close model
  const cancelModel = (token) => {
    if (token === "hurry") {
      navigate("/dashboard");
    } else {
      setModel(false);
    }
  };

  // add question
  const handleAddQuestion = () => {
    const newQuestion = {
      question: question,
      question_type: selectedQuestionType,
      options:
        selectedQuestionType === "Single Choice"
          ? Object.fromEntries(
              options.map((opt, i) => [`option${i + 1}`, opt.value])
            )
          : null,
    };

    axios
      .post(
        "https://izrmdya4vg.execute-api.ap-south-1.amazonaws.com/prod/save_survey_form",
        {
          survey_form: [...questionsList, newQuestion],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // handle success
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });

    setQuestionsList([...questionsList, newQuestion]);
    setQuestion("");
    setOptions([
      { optionNumber: 1, value: "" },
      { optionNumber: 2, value: "" },
    ]);
    setSelectedQuestionType("Single Choice");
    setCancel(false);
    setDisable(true);
    setImg(false);
  };

  return (
    <div>
      <div className="bg-gray-200 h-16 ml-60 mt-20">
        <h1 className="text-blue-800 text-xl ml-14">
          Create Survey {" - "}
          <span className="font-bold">Carrer Skill feedback</span>
        </h1>
        <div className="ml-14 text-sm">
          Home / MySurvey / CreateSurvey /{" "}
          <span className="text-blue-800">Carrer-Skill Feedback</span>
        </div>
      </div>
      <div className="bg-cover bg-gray-50 flex ml-60 p-5 flex flex-col mt-0 gap-2 ml-60">
        <h1 className="ml-8 text-gray-400">
          Question {questionsList.length + 1}
        </h1>
        <div className="ml-auto mr-80 m-[-28px]">
          <select
            className="w-[200px] rounded border border-gray-400 bg-pink-50 pl-3 pr-10 py-2 text-sm leading-tight focus:outline-none focus:border-yellow-500 font-bold"
            value={selectedQuestionType}
            onChange={handleQuestionTypeChange}
          >
            <option value="Single Choice">Single Choice</option>
            <option value="Yes/No">Yes/No</option>
          </select>
        </div>
        <input
          className="m-8 w-2/3 border-b border-yellow-500 border-solid pb-2 bg-transparent focus:outline-none placeholder-font-bold"
          placeholder="Type your Question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {selectedQuestionType === "Single Choice" ? (
          <div className="relative flex flex-wrap w-[600px]">
            {options.map((option, index) => (
              <div key={index}>
                <input
                  className="max-w-xs m-8 mt-[-20px] border border-yellow-400 rounded px-4 py-2"
                  placeholder={`Option ${option.optionNumber}`}
                  value={option.value}
                  onChange={(e) => handleOptionChange(index, e)}
                />
                {cancel && (
                  <img
                    src={Close}
                    alt=""
                    className="absolute flex mt-[-60px] ml-64"
                    onClick={() => handleCancel(index)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex">
            {options.map((option, index) => (
              <div
                key={index}
                className="max-w-xs ml-8 mt-[-20px] border border-yellow-400 rounded px-8 py-8 items-center"
                onClick={() => console.log("clicked")}
              >
                <div className="ml-2">{option.icon}</div>
                <span className="ml-2">{option.value}</span>
              </div>
            ))}
          </div>
        )}
        <div className="w-[250px] h-[450px] max-w-sm max-h-full bg-white border border-gray-200 rounded-lg shadow-lg p-8 absolute mt-4 right-8 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-yellow-500">
          <div className="relative w-100 h-500 bg-white ml-[-15px]">
            <p className="absolute font-bold mb-4 mt-[-20px]">QUESTIONS LIST</p>
            <div className="absolute border border-b border-solid-gray-200 top-3 w-full"></div>

            {img && (
              <div className="absolute mt-20 ml-10  ">
                <p className="font-gray-500">
                  Questions asked will be visible here
                </p>
                <img src={GirlClock} alt="" className="mt-5" />
              </div>
            )}

            {questionsList.map((question, index) => (
              <div key={index} className="w-200 relative ml-8 top-8">
                <p className="mb-2 border border-yellow-500 rounded-full pl-5 pr-5 w-[220px] bg-pink-100 ml-[-30px] break-words">
                  {question.question}
                </p>
                <img
                  src={Close}
                  alt=""
                  className="relative top-[-30px] right-0 ml-40"
                  onClick={() => cancelQuestion(index)}
                />
              </div>
            ))}
          </div>
        </div>
        {disable && (
          <button
            className="max-w-xs w-[200px] text-blue-600 mt-[-10px] m-8 mb-0 border border-blue-400 rounded px-4 py-2"
            onClick={handleAddOption}
          >
            ADD MORE OPTIONS
          </button>
        )}

        <div className="border-b border-gray-200 mt-60"></div>
        <button
          className="max-w-sm border border-blue-400 rounded px-4 py-2 w-60"
          onClick={handleAddQuestion}
        >
          ADD NEW QUESTION
        </button>

        <button
          className="absolute bg-blue-500 text-white font-bold py-2 px-4 rounded bottom-5 right-20"
          onClick={handleModel}
        >
          Share Survey
        </button>
      </div>
      {model && <ShareSurveyModel cancelModel={cancelModel} />}
    </div>
  );
};

export default AddQuestions;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MySurvey from "./components/MySurvey";
import LoginForm from "./components/LoginForm";
import CreateSurvey from "./components/CreateSurvey";
import AddQuestions from "./components/AddQuestions";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        {isLoggedIn && <Navbar />}
        {isLoggedIn && <Sidebar />}
        <Routes>
          <Route
            exact
            path="/"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          {isLoggedIn && <Route path="/home" element={<MySurvey />} />}
          {isLoggedIn && (
            <Route path="/create-survey" element={<CreateSurvey />} />
          )}
          {isLoggedIn && (
            <Route path="/add-question" element={<AddQuestions />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;

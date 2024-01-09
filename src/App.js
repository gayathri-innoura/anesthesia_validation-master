import React from "react";
import UploadFile from "./upload/upload";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./components/login/Login";

const App = () => {
  return (
    <div>
      {/* <UploadFile /> */}
      <Router>
        <Routes>
         
          <Route exact path="/" element={<UploadFile />}></Route>
          <Route exact path="/login" element={<UserLogin/>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Homepage from "./component/Homepage";
import Profile from "./component/Profile/index"
import Message from "./component/Message/index";
import Signup from "./component/Signup/Signup";
import Signin from "./component/Signin/Signin";
import Footer from "./component/Footer/Footer";
import ResetPassword from "./component/ResetPassword/ResetPassword";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/message" element={<Message />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

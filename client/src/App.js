import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./component/Navbar/Navbar";
import Homepage from "./component/Homepage";
import Profile from "./component/Profile/index";
import Message from "./component/Message/index";
import Signup from "./component/Signup/Signup";
import Signin from "./component/Signin/Signin";
// import Footer from "./component/Footer/Footer";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import BlogPage from "./component/Blogs/Blog/index";
import Blogs from "./component/Blogs/index";
import EventPage from "./component/Homepage/EventsSection/EventPage/index";
import "./App.css";
import Dashboard from "./component/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== "/dashboard";

  return (
    <QueryClientProvider client={queryClient}>
      {showNavbar && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/blog/:id" element={<BlogPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/event/:id" element={<EventPage />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/message" element={<Message />} />
        </Route>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
      </Routes>
      {/* <Footer /> */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;

import React, { useState } from "react";
import { SiBlogger } from "react-icons/si";
import { BsCalendarEvent } from "react-icons/bs";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { MdOutlineDashboardCustomize } from "react-icons/md";

import classes from "./index.module.css";
import BlogPart from "./Blog/index";
import EventPart from "./Events/index";

const Dashboard = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);
  const [showTotalUser, setShowTotalUser] = useState(true);

  const togglePanel = () => {
    setIsMinimized(!isMinimized);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTotalUserCard = () => {
    setShowTotalUser(!showTotalUser);
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.header}>Header</div>
      <div className={classes.sidebarAndMainDashboard}>
        <div
          className={isMinimized ? classes.sideBarClose : classes.sidebarOpen}
        >
          <div className={classes.arrowBox}>
            <div className={classes.sidebarArrows} onClick={togglePanel}>
              {isMinimized ? <RxDoubleArrowRight /> : <RxDoubleArrowLeft />}
            </div>
          </div>
          {isMinimized && (
            <div className={classes.sideBarIcons}>
              <div onClick={() => handlePageChange("dashboard")}>
                <MdOutlineDashboardCustomize />
              </div>
              <div onClick={() => handlePageChange("event")}>
                <BsCalendarEvent />
              </div>
              <div onClick={() => handlePageChange("blog")}>
                <SiBlogger />
              </div>
            </div>
          )}
          {!isMinimized && (
            <div className={classes.sideBarIconsWithName}>
              <div onClick={() => handlePageChange("dashboard")}>
                <MdOutlineDashboardCustomize />
                Dashboard
              </div>
              <div onClick={() => handlePageChange("event")}>
                <BsCalendarEvent />
                Event
              </div>
              <div onClick={() => handlePageChange("blog")}>
                <SiBlogger /> Blog
              </div>
            </div>
          )}
        </div>
        <div
          className={
            isMinimized ? classes.mainDashboardFull : classes.mainDashboardClose
          }
        >
          {currentPage === "blog" && <BlogPart />}
          {currentPage === "event" && <EventPart />}
          {currentPage === "dashboard" && (
            <div className={classes.smallCardsContainer}>
              <div className={classes.smallCards} onClick={handleTotalUserCard}>
                <p>{showTotalUser ? "Total User" : "User Added This Month"}</p>
                <h4 className={classes.smallCardsNumber}>
                  {showTotalUser ? "500" : "+54"}
                </h4>
              </div>
              <div className={classes.smallCards}></div>
              <div className={classes.smallCards}></div>
              <div className={classes.smallCards}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

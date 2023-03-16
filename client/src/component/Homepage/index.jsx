import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useJwt } from "react-jwt";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "react-query";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Homepage.module.css";
import Category from "./FilterSection/Category";
import City from "./FilterSection/City";
import EventFromLocation from "./FilterSection/EventFromLocation";
import DateOfEvent from "./FilterSection/DateOfEvent";
import Localities from "./FilterSection/Localities";
import CreateEventModal from "./Modal/CreateEventModal";
import Card from "./EventsSection/Card/index";
import loading from "../Assets/loading.gif";
import { FaBorderAll, FaBars } from "react-icons/fa";

const getAllEvents = (pageNumber) => {
  return axios.get(`/api/feed/allEvents?pageNumber=${pageNumber}`);
};

const Homepage = () => {
  const [queryKey, setQueryKey] = useState("organise-event");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(10);

  const { isLoading, data, isError, error } = useQuery(
    [queryKey, pageNumber],
    () => getAllEvents(pageNumber),
    { keepPreviousData: true }
  );

  const handlePageClick = (data) => {
    window.scrollTo(0, 0);
    setPageNumber(data.selected);
  };

  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const userlocalStorage = JSON.parse(localStorage.getItem("user"));

  const { decodeToken, isExpired, reEvaluateToken } = useJwt(
    user === null || userlocalStorage === null ? null : userlocalStorage.token
  );

  const toggleModal = (createdEventStatus, createdEventData, randomString) => {
    if (user !== null) {
      reEvaluateToken(userlocalStorage.token);
      if (!isExpired) {
        setShowModal(!showModal);
        if (createdEventStatus == 201) {
          // createEventStatus is coming from modal page on successfully event creation
          setQueryKey(randomString); // changing key reload query and fetch new data
          setShowToast(true);
          toast.success("Event is created! Successfully", {
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            autoClose: 2000,
          });
        }
      }
    } else {
      setShowModal(false);
      // if not login user then showing toast
      setShowToast(true);
      toast.error("Please Login To create Event", {
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
        autoClose: 2000,
      });
    }
  };

  const callApiOnDeleteCard = () => {
    setQueryKey(Math.random());
  };

  return (
    <>
      <Grid container>
        <CreateEventModal showModal={showModal} toggleModal={toggleModal} />
        {showToast ? <ToastContainer /> : ""}
        <Grid item md={3} lg={3} className={classes.filterGird}>
          <div className={classes.filterSection}>
            <Category />
            <Divider />
            <DateOfEvent />
            <Divider />
            <City />
            <Divider />
            <Localities />
            <Divider />
            <EventFromLocation />
          </div>
        </Grid>

        <Grid item xs={12} md={9} lg={9}>
          <div className={classes.eventSections}>
            <div className={classes.createEventDiv}>
              <div className={classes.logoOfverticalHoriCards}>
                <FaBorderAll />
                <FaBars />
              </div>
              <button className={classes.createEventBtn} onClick={toggleModal}>
                Create Event
              </button>
            </div>

            <Grid container className={classes.cardGrid}>
              {isLoading && (
                <div className={classes.loadingBox}>
                  <img src={loading} alt="loading gif"></img>
                </div>
              )}
              {data
                ? data.data.data.data.map((event, id) => {
                    return (
                      <Grid item xs={12} md={4} key={id}>
                        <Card
                          event={event}
                          callApiOnDeleteCard={callApiOnDeleteCard}
                          index={id}
                        />
                      </Grid>
                    );
                  })
                : ""}
              {isError && <div>{error.message}</div>}
            </Grid>
            {data && (
              <div className={classes.paginationBox}>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  className={classes.pagination}
                />
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;

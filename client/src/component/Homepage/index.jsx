import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useJwt } from "react-jwt";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "react-query";
import ReactPaginate from "react-paginate";
import { FaBorderAll, FaBars, FaAngleRight, FaFilter } from "react-icons/fa";
import SlidingPane from "react-sliding-pane";

import "react-sliding-pane/dist/react-sliding-pane.css";
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
import HorizontalCards from "../Shared/HorizontalCards/index";

const getAllEvents = (pageNumber) => {
  return axios.get(`https://letsmeet.onrender.com/api/feed/allEvents?pageNumber=${pageNumber}`);
};

const Homepage = () => {
  const [queryKey, setQueryKey] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(10);
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [gridView, setGridView] = useState(true);

  const { isLoading, data, isError, error } = useQuery(
    [queryKey, pageNumber],
    () => getAllEvents(pageNumber),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (data && data.data && data.data.data && data.data.data.totalPosts) {
      const totalPosts = data.data.data.totalPosts;
      const postsPerPage = 12;
      setPageCount(Math.ceil(totalPosts / postsPerPage));
    }
  }, [data]);

  const handlePageClick = (data) => {
    window.scrollTo(0, 0);
    setPageNumber(data.selected);
  };

  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const userlocalStorage = JSON.parse(localStorage.getItem("user"));

  const { isExpired, reEvaluateToken } = useJwt(
    user === null || userlocalStorage === null ? null : userlocalStorage.token
  );

  const toggleModal = (createdEventStatus, msg) => {
    if (user !== null) {
      reEvaluateToken(userlocalStorage.token);
      if (!isExpired) {
        setShowModal(!showModal);
        if (createdEventStatus === 201) {
          // createEventStatus is coming from modal page on successfully event creation
          setQueryKey((prevKey) => prevKey + 1); // changing key reload query and fetch new data
          setShowToast(true);
          toast.success(msg, {
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            autoClose: 2000,
          });
        }
        if (createdEventStatus === 429) {
          // createEventStatus is coming from modal page on unsuccessfully event
          setShowToast(true);
          toast.error(msg, {
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

  const handleSetListView = () => {
    setGridView(false);
  };
  const handleSetGridView = () => {
    setGridView(true);
  };

  return (
    <>
      <CreateEventModal showModal={showModal} toggleModal={toggleModal} />
      {showToast && <ToastContainer />}

      <SlidingPane
        isOpen={isPaneOpen}
        className="some-custom-class"
        onRequestClose={() => setIsPaneOpen(false)}
        closeIcon={<FaAngleRight style={{ height: "30px", width: "30px" }} />}
        from="right"
        width="30%">
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
      </SlidingPane>

      <div className={classes.eventSections}>
        <div className={classes.createEventDiv}>
          <div className={classes.logoOfverticalHoriCards}>
            <button
              type="button"
              className={`${gridView ? classes.activeButton : ""}`}
              onClick={() => handleSetGridView()}>
              <FaBorderAll />
            </button>
            <button
              type="button"
              className={`${!gridView ? classes.activeButton : ""}`}
              onClick={() => handleSetListView()}>
              <FaBars />
            </button>
            <button onClick={() => setIsPaneOpen(true)}>
              <FaFilter />
            </button>
          </div>
          <button className={classes.createEventBtn} onClick={toggleModal}>
            Create Event
          </button>
        </div>

        <Grid
          container
          className={classes.cardGrid}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 8 }}>
          {isLoading && (
            <div className={classes.loadingBox}>
              <img src={loading} alt="loading gif"></img>
            </div>
          )}
          {data
            ? data.data.data.data.map((event, id) => {
              console.log(event)
                return gridView ? (
                  <Grid item xs={12} md={4} key={id}>
                    <Card
                      event={event}
                      callApiOnDeleteCard={callApiOnDeleteCard}
                      index={id}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12} key={id}>
                    <HorizontalCards
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
    </>
  );
};

export default Homepage;

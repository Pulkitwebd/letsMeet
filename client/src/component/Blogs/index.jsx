import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogCard from "./Card/index";
import loading from "../Assets/loading.gif";
import classes from "./index.module.css";

const getAllBlogs = (pageNumber, limit) => {
  return axios.get(
    `/api/blog/allBlogs?pageNumber=${pageNumber}&limit=${limit}`
  );
};

const CardList = () => {
  //to set post per page
  const [limit ] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [queryKey, setQueryKey] = useState(getAllBlogs);
  const [pageNumber, setPageNumber] = useState(0);

  const infiniteScrollRef = useRef(null);

  const { user } = useSelector((state) => state.auth);

  const { isLoading, data, isError, error } = useQuery(
    [queryKey, pageNumber],
    () => getAllBlogs(pageNumber, limit),
    { keepPreviousData: true }
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const { current: element } = infiniteScrollRef;
    if (
      element &&
      typeof element.getBoundingClientRect === "function" &&
      element.getBoundingClientRect().bottom <= window.innerHeight + 20
    ) {
      console.log("fetch more data");
      fetchMoreData();
    }
  };

  const fetchMoreData = () => {
    // Simulate loading more data
    setTimeout(() => {
      const newData = [...data.data.data.data, ...data.data.data.data]; // Double the data
      if (newData.length >= limit) {
        setHasMore(true);
        setQueryKey(queryKey + 1);
        setPageNumber(pageNumber + 1);
      } else {
        setHasMore(false);
      }
    }, 1500);
  };

  const endMessage = (
    <p style={{ textAlign: "center", fontSize: "20px" }}>
      Yay! You have seen it all
    </p>
  );

  return (
    <InfiniteScroll
      ref={infiniteScrollRef}
      dataLength={limit}
      // next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      scrollThreshold="0px"
      endMessage={endMessage}
    >
      {user && user.user.email === "pulkitgupta714@gmail.com" ? (
        <div className={classes.createBlogDiv}>
          <Link to={"/dashboard"}>
            <button>Create Blog</button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <Grid
        container
        columnSpacing={{ md: 1 }}
        rowSpacing={2}
        paddingLeft={7}
        marginTop={4}
        marginBottom={4}
      >
        {isLoading && (
          <div>
            <img src={loading} alt="loading gif"></img>
          </div>
        )}
        {data &&
          data.data &&
          data.data.data &&
          data.data.data.data.length > 0 &&
          data.data.data.data.map((blog, id) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <BlogCard
                  id={blog._id}
                  title={blog.title}
                  authorName={blog.author && blog.author}
                  creationDateAndTime={blog.date}
                  description={
                    blog.headings &&
                    blog.headings[0] &&
                    blog.headings[0].paragraphs &&
                    blog.headings[0].paragraphs.length > 0
                      ? blog.headings[0].paragraphs[0]
                      : ""
                  }
                />
              </Grid>
            );
          })}
        {isError && <div>{error.message}</div>}
      </Grid>
    </InfiniteScroll>
  );
};

export default CardList;

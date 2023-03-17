import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import BlogCard from "./Card/index";
import cardData from "./cardJson";
import InfiniteScroll from "react-infinite-scroll-component";

const CardList = () => {
  const [items, setItems] = useState(cardData.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);

  const infiniteScrollRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const { current: element } = infiniteScrollRef;
    if (
      element &&
      typeof element.getBoundingClientRect === "function" &&
      element.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      fetchMoreData();
    }
  };

  const fetchMoreData = () => {
    // Simulate loading more data
    setTimeout(() => {
      const newItems = cardData.slice(items.length, items.length + 6);
      setItems([...items, ...newItems]);
      setHasMore(items.length < cardData.length);
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
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      scrollThreshold="0px"
      endMessage={endMessage}
    >
      <Grid
        container
        columnSpacing={{ md: 1 }}
        rowSpacing={2}
        paddingLeft={7}
        marginTop={4}
        marginBottom={4}
      >
        {items.map((card, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BlogCard
                id={card.id}
                title={card.title}
                authorName={card.authorName}
                authorEmail={card.authorEmail}
                lastEdited={card.lastEdited}
                category={card.category}
                creationDateAndTime={card.creationDateAndTime}
                description={card.description}
                imageUrl={card.imageUrl}
              />
            </Grid>
          );
        })}
      </Grid>
    </InfiniteScroll>
  );
};

export default CardList;

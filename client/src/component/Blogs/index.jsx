import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import BlogCard from "./BlogCard";
import cardData from "./cardJson";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const CardList = () => {
  const [cards, setCards] = useState(cardData.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);

  const loadMoreCards = () => {
    console.log("sandhiii");
    // add the next 6 cards to the existing cards array
    const nextCards = cards.slice(cards.length, cards.length + 6);
    setCards((prevCards) => [...prevCards, ...nextCards]);
    console.log("hi");

    // set hasMore to false if there are no more cards to be loaded
    if (cards.length + nextCards.length === cardData.length) {
      setHasMore(false);
    }
    // setCards((prev) => [...prev, ...nextCards]);
  };
  console.log("object");
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMoreCards}
      hasMore={hasMore}
      loader={<div key={0}>Loading...</div>}
      delay={500}
      data={20}
      dataLength={6}
    >
      <Grid
        container
        columnSpacing={{ md: 1 }}
        rowSpacing={2}
        paddingLeft={7}
        marginTop={4}
        marginBottom={4}
      >
        {cards.map((card) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <BlogCard
                title={card.title}
                authorName={card.authorName}
                authorEmail={card.authorEmail}
                lastEdited={card.lastEdited}
                category={card.category}
                creationDateAndTime={card.creationDateAndTime}
                description={card.descrption}
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

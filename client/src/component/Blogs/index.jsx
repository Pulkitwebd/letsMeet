import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import BlogCard from "./BlogCard";
import cardData from "./cardJson";
// import travelimg from "../Assets/travelimg.jpg";
import React, { useState } from "react";

export default function MediaCard() {
  const [cards, setCards] = useState(cardData);
  console.log(cards);
  return (
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
  );
}
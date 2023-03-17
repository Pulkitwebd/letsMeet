import React, { useState } from "react";
import { useParams } from "react-router-dom";
import cardsData from "../cardJson";

const Blog = () => {
  const [cards, setCards] = useState(cardsData);
  const { id } = useParams();


  //need to design this page.
  console.log(cards[id]);
  return (
    <div>
      <h2>{cards[id-1].title}</h2>
      <p>{cards[id-1].description}</p>
    </div>
  );
};

export default Blog;
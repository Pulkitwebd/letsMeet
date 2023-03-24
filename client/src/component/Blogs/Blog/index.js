import React, { useState } from "react";
import { useParams } from "react-router-dom";
import cardsData from "../cardJson";
import classes from "./Blog.module.css";
import clockicon from "../../Assets/CLOCK.webp";
import readicon from "../../Assets/read_time_icon.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

const Blog = () => {
  const [cards, setCards] = useState(cardsData);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { id } = useParams();
  const Redheart = () => {
    return (
      <div>
        <p title="Liked" className={classes.liked}>
          <FcLike />
        </p>
        <span className="likeNum" title="View likes">{likes}</span>
      </div>
    );
  };

  const handleLikeClick = () => {
    setIsLiked(true);
    setLikes(likes+1);
  };

  console.log(cards[id]);
  return (
    <div className={classes.container}>
      <h2 className={classes.cardTitle}>{cards[id - 1].title}</h2>
      <div className={classes.BlogDetails}>
        <h4 className={classes.aName}>By {cards[id - 1].authorName}</h4>
        <div className={classes.timeDetails}>
          <img className={classes.clockicon} src={clockicon} alt="" />
          <h4 className={classes.creationDate}>
            {cards[id - 1].creationDateAndTime}
          </h4>
        </div>
        <div className={classes.readDetails}>
          <img className={classes.readTimeicon} src={readicon} alt="" />
          <h4 className={classes.readTime}>{cards[id - 1].timeToRead}</h4>
        </div>
      </div>
      <div className={classes.imgContainer}>
        <img src={cards[id - 1].imageUrl} alt="" />
      </div>
      <div className={classes.textContainer}>
        <p className={classes.text}>{cards[id - 1].description}</p>
        <div className={classes.bar}>
          <div className={classes.iconContainer}>
            <div>
              {isLiked ? (
                <Redheart />
              ) : (
                <p
                  title="Like this blog"
                  className={classes.like}
                  onClick={handleLikeClick}
                >
                  <AiOutlineHeart /> <span className="likeNum" title="View likes">{likes}</span>
                </p>
              )}
            </div>

            <div>
              <p title="Read comments" className={classes.comment}>
                <BiCommentDetail />
                <span>2</span>
              </p>
            </div>
            <div>
              <p title="Share" className={classes.share}>
                <AiOutlineShareAlt />
              </p>
            </div>
            <div>
              <p title="Bookmark" className={classes.bookmark}>
                <BsBookmark />
              </p>
            </div>
            <div>
              <p title="More options" className={classes.more}>
                <AiOutlineMore />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

// FcLike
// BiCommentDetail
// AiOutlineShareAlt

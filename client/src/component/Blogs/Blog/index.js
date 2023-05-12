import React, { useState } from "react";
import classes from "./Blog.module.css";
import clockicon from "../../Assets/CLOCK.webp";
import readicon from "../../Assets/read_time_icon.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import SlidingPane from "react-sliding-pane";
import Comment from "./Comment";
import "react-sliding-pane/dist/react-sliding-pane.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";

const getBlog = (eventId) => {
  return axios.get(`/api/blog/${eventId}`);
};

const Blog = () => {
  
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const location = useLocation();
  const blogId = location.state.blogId;

  const [queryKey, setQueryKey] = useState("get-blog");

  const { isLoading, data, isError, error } = useQuery([queryKey, blogId], () =>
    getBlog(blogId)
  );

  // const { id } = useParams();

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    likes == 1 ? setLikes(0) : setLikes(1);
  };

  console.log("testing blogid in blog page", blogId);
  console.log(data ? data.data.title : "no data found")

  return (
    <div className={classes.container}>
      <SlidingPane
        isOpen={isPaneOpen}
        onRequestClose={() => setIsPaneOpen(false)}
        from="right"
        width="35%"
      >
        {/* Content of  pane goes here  */}
        <Comment />
      </SlidingPane>
      <h2 className={classes.cardTitle}>{data && data.data.title}</h2>

      <div className={classes.blogDetailsCover}>
        <div className={classes.BlogDetails}>
          <h4 className={classes.aName}>By {data && data.data.author}</h4>

          <div className={classes.timeDetails}>
            <img className={classes.clockicon} src={clockicon} alt="" />
            <h4 className={classes.creationDate}>
              {/* {cards[id - 1].creationDateAndTime} */}
            </h4>
          </div>
          <div className={classes.readDetails}>
            <img className={classes.readTimeicon} src={readicon} alt="" />
            {/* <h4 className={classes.readTime}>{cards[id - 1].timeToRead}</h4> */}
          </div>
        </div>
      </div>

      <div className={classes.img_textContainer}>
        <div className={classes.imgContainer}>
          {/* <img src={cards[id - 1].imageUrl} alt="" /> */}
        </div>
        <div className={classes.textContainer}>
          <p className={classes.text}>{data && data.data.headings[0].paragraphs[0]}</p>
        </div>
      </div>
      <div className={classes.bar}>
        <div className={classes.iconContainer}>
          <div>
            <p
              title="Like this blog"
              className={classes.like}
              onClick={handleLikeClick}
            >
              {isLiked ? <FcLike /> : <AiOutlineHeart />}
              <span className="likeNum" title="View likes">
                {likes}
              </span>
            </p>
          </div>

          <div>
            <p
              title="Read comments"
              className={classes.comment}
              onClick={() => setIsPaneOpen(true)}
            >
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
            <AiOutlineMore title="More Options" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

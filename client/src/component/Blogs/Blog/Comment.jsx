import React from "react";
import classes from "./Comment.module.css";

const Comment = () => {
  return (
    <>
      <div className={classes.commentSection}>
        <div className={classes.writeComment}>
          <h2>Comments (2)</h2>
          <div className={classes.commentBox}>
            <div className={classes.user}>
              <div className={classes.pfp}>
                <a href=""></a>
              </div>
              <div className={classes.userNam}>Sandhya Ginare</div>
            </div>
            <div className={classes.commentArea}>
              <textarea name="commentHere" placeholder="Write a comment..." id="" cols="30" rows="10"></textarea>
            </div>
            <div className={classes.subButton}>
              <button>Submit</button>
            </div>
          </div>
        </div>
        <div className={classes.options}>
          <button>Top Comments</button>
        </div>
        <div className={classes.commentList}>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Comment;

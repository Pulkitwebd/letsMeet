import React, { useState } from "react";
import classes from "./Comment.module.css";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiBookmark, BiDotsVerticalRounded } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsBookmarkFill } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";

const CommentBox = () => {
  const [liked, setLiked] = useState(false);
  const [likedComment, setLikedComment] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const handleSaveEvent = () => {
    setIsSaved(!isSaved);
  };

  const handleLikeComment = () => {
    setLikedComment(!likedComment);
    console.log("sandhii", likedComment);
  };
  const [showReplies, setShowReplies] = useState(false);

  const handleDropdown = () => {
    setShowReplies(!showReplies);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <>
      <div className={classes.likeBoxWrapper}>
        <div className={classes.LikeBox}>
          <ul>
            <li onClick={handleLikeClick}>
              {!liked ? <AiOutlineHeart /> : <FcLike />}
            </li>
            <li>
              <TfiCommentAlt onClick={() => setState({ isPaneOpen: true })} />
            </li>
            <li>
              <AiOutlineShareAlt />
            </li>
            <li onClick={handleSaveEvent}>
              {isSaved ? <BiBookmark /> : <BsBookmarkFill />}
            </li>
            <li>
              <BiDotsVerticalRounded />
            </li>
          </ul>
        </div>
      </div>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={state.isPaneOpen}
        width="35vw"
        onRequestClose={() => {
          setState({ isPaneOpen: false });
        }}
      >
        <div className={classes.commentBox}>
          <h2 className={classes.commentHead}>Comments(0)</h2>
          <div className={classes.outerBox}>
            <div className={classes.textareaWrapper}>
              <textarea
                name=""
                id=""
                cols="40"
                rows="5"
                placeholder="Write a comment..."
              ></textarea>
              <div className={classes.commentBtnWrapper}>
                <button className={classes.commentBtn}>Comment</button>
              </div>
            </div>
          </div>
        </div>
        <hr className={classes.hrLine} />
        <div className={classes.CommentContainer}>
          <div className={classes.comment}>
            <div className={classes.UserInfo}>
              <div className={classes.userPic}>img</div>
              <div className={classes.user}>
                <h5 className={classes.Username}>Sandhya Ginare</h5>
                <p className={classes.dateOfComment}>Jun 22</p>
              </div>
            </div>
            <div className={classes.commentPara}>
              <p>
                Comment 1 : Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Architecto ad maxime quidem molestiae sit a atque ducimus
                iste ipsa ab, expedita nesciunt omnis esse blanditiis,
                voluptatum eos! Cum, deserunt eligendi!
              </p>
            </div>
            <div className={classes.commentReacts}>
              <div className={classes.LikesOnComments}>
                <div onClick={handleLikeComment}>
                  {!likedComment ? (
                    <AiOutlineHeart className={classes.LikeIcon} />
                  ) : (
                    <FcLike className={classes.LikeIcon} />
                  )}
                </div>
                <span>2</span>
              </div>
              <div>
                <button
                  className={classes.replyButton}
                  onClick={toggleDropdown}
                >
                  Reply
                </button>
                {showDropdown && (
                  <div className={classes.dropdown}>
                    <input
                      className={classes.textarea}
                      placeholder="Write a reply..."
                    ></input>
                    <div className={classes.btnContainer}>
                      <button className={classes.cancelButton}>Cancel</button>
                      <button className={classes.submitButton}>Submit</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={classes.commentReplies} onClick={handleDropdown}>
              <div className={classes.totalComments}>
                <RiArrowDropDownLine />2 replies
              </div>
              <div className={classes.MultiComments}>
                {showReplies && (
                  <div className={classes.repliesContainer}>
                    <div className={classes.reply}>
                      <div className={classes.UserInfo}>
                        <div className={classes.userPic}>img</div>
                        <div className={classes.user}>
                          <h5 className={classes.Username}>Sandhya Ginare</h5>
                          <p className={classes.dateOfComment}>Jun 22</p>
                        </div>
                      </div>
                      <div className={classes.commentPara}>
                        <p>Reply 1 : Lorem ipsum dolor sit amet, consectetur</p>
                      </div>
                      <div className={classes.commentReacts}>
                        <div className={classes.LikesOnComments}>
                          <div>
                            <AiOutlineHeart className={classes.LikeIcon} />
                          </div>
                          <span>2</span>
                        </div>
                        <div>
                          <button className={classes.replyButton}>Reply</button>
                          {/* <div>
                            <input placeholder="Write a reply..."></input>
                            <div className={classes.btnContainer}>
                              <button className={classes.cancelButton}>
                                Cancel
                              </button>
                              <button className={classes.submitButton}>
                                Submit
                              </button>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className={classes.reply}>Reply 2</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className={classes.hrLine} />
        <div className={classes.HR}></div>
      </SlidingPane>
    </>
  );
};

export default CommentBox;

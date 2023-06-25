import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import Input from "@mui/joy/Input";
import { FiUsers, FiUser, FiVideo, FiPhone } from "react-icons/fi";

import classes from "./Message.module.css";

const Message = () => {
  const [activeBorderGroup, setActiveBorderGroup] = useState(true);
  const [emojiPickerBox, showEmojiPickerBox] = useState(false);
  
  return (
    <Grid container>
      <Grid item xs={4} md={3} lg={3} className={classes.leftPart}>
        <div className={classes.header}>
          <div
            onClick={() => setActiveBorderGroup(!activeBorderGroup)}
            className={activeBorderGroup ? classes.border : ""}
          >
            <FiUsers />
          </div>
          <div
            onClick={() => setActiveBorderGroup(!activeBorderGroup)}
            className={!activeBorderGroup ? classes.border : ""}
          >
            <FiUser />
          </div>
        </div>
        <div className={classes.showChatRoom}>
          <div className={classes.groupChatsBox}>
            {activeBorderGroup ? (
              <>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>{" "}
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
                <div
                  className={classes.groupChat_img_name}
                  onClick={() => console.log("hello")}
                >
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Group Name</p>
                    <p className={classes.lastesMessage}>Group Message</p>
                    <p className={classes.timeofLastMsg}>12 : 17</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={classes.groupChat_img_name}>
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Sumit</p>
                    <p className={classes.lastesMessage}>Message</p>
                    <p className={classes.timeofLastMsg}>12 : 19</p>
                  </div>
                </div>

                <div className={classes.groupChat_img_name}>
                  <div className={classes.groupPic}></div>
                  <div className={classes.groupName_msg}>
                    <p className={classes.groupName}>Sumit</p>
                    <p className={classes.lastesMessage}>Message</p>
                    <p className={classes.timeofLastMsg}>12 : 19</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div></div>
        </div>
      </Grid>
      <Grid item xs={4} md={9} lg={9} className={classes.rightGrid}>
        <div className={classes.chatRoomHeader}>
          <div className={classes.chatRoomLogo_name}>
            <div className={classes.chatRoomLogo}></div>
            <p className={classes.chatRoomName}>Sumit</p>
          </div>
          <div className={classes.chatRoomVideo_audio_search_box}>
            <div className={classes.videoCallLogo}>
              <FiVideo />
            </div>
            <div className={classes.phoneCallLogo}>
              <FiPhone />
            </div>
            <div className={classes.searchMsgLogo}></div>
          </div>
        </div>
        <div className={classes.chatMessages}>
          <div className={classes.currentUserMessages}>Sended Messages</div>
          <div className={classes.receivedMessage}>Received Messages</div>
        </div>
        <div className={classes.inputField_attachment_emoji}>
          <div className={classes.emoji}>
            <BsEmojiSmile onClick={() => showEmojiPickerBox(!emojiPickerBox)} />
          </div>
          <div className={classes.attachment}>
            <GrAttachment />
          </div>
          <div className={classes.inputField}>
            <Input placeholder="Type in here…" />
          </div>
        </div>
        <div className={classes.emojiPickerEmojiBoxOpen}>
          {emojiPickerBox && <EmojiPicker />}
        </div>
      </Grid>
    </Grid>
  );
};

export default Message;

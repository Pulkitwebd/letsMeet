
const friendInvitationControllers = require("../Controller/Friend/friendInvitationController.js");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require("../middleware/auth.js");
const validator = require("express-joi-validation").createValidator({})


const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});


router.post(
  "/invite",
  auth,
  validator.body(postFriendInvitationSchema),
  friendInvitationControllers.postInvite
);

router.get(
  "/getAllPendingFriendRequest/:user_id",
  auth,
  friendInvitationControllers.getAllPendingFriendRequest
);

router.get(
  "/getAllUpcomingPendingFriendRequest/:user_id",
  auth,
  friendInvitationControllers.getAllUpcomingPendingFriendRequest
);

router.post(
  "/rejectInvitation",
  auth,
  friendInvitationControllers.rejectFriendInvitation
)

router.post(
  "/acceptInvitation",
  auth,
  friendInvitationControllers.acceptFriendInvitation
)


module.exports = router;

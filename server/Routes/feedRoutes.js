const express = require("express");
const router = express.Router();
const feedControllers = require("../Controller/Event/feedControllers");
const DateExtension = require("@joi/date");
const JoiImport = require("joi");
const Joi = JoiImport.extend(DateExtension);
const validator = require("express-joi-validation").createValidator({});

const feedSchema = Joi.object({
  user_id: Joi.string().required(),
  postingDate: Joi.date().format("YYYY-MM-DD").utc(),
  meetDate: Joi.date().format("YYYY-MM-DD HH:mm").utc(),
  locationOfMeet: Joi.string().required(),
  currentUserLocation: Joi.string().required(),
  city: Joi.string().required(),
  personNeeded: Joi.number().required(),
  category: Joi.string().required(),
});

router.post("/feedPost", validator.body(feedSchema), feedControllers.organiseEvent);
router.get("/allEvents", feedControllers.allEvents);

module.exports = router;

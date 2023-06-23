const express = require("express");
const router = express.Router();
const feedControllers = require("../Controller/Event/feedControllers");
const DateExtension = require("@joi/date");
const JoiImport = require("joi");
const Joi = JoiImport.extend(DateExtension);
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

const feedSchema = Joi.object({
  postingDate: Joi.date().required(),
  meetDate: Joi.string().required(),
  address: Joi.object({
    landmark: Joi.string().required(),
    houseNoflatNo: Joi.string().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  }).required(),
  personNeeded: Joi.number().required(),
  category: Joi.string().required(),
  organiserName: Joi.string().required(),
  desc: Joi.string().required(),
  title: Joi.string().required(),
  eventImage : Joi.string().required()
});

router.post(
  "/feedPost",
  auth,
  validator.body(feedSchema),
  feedControllers.organiseEvent
);

router.get("/Event/:id", feedControllers.Event);

router.get("/allEvents", feedControllers.allEvents);

router.delete("/event", auth, feedControllers.deleteEvent);

router.post("/applyToEvent/", auth, feedControllers.applyEvent)

module.exports = router;

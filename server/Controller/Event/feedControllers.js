const organiseEvent = require("./organiseEvent");
const allEvents = require("./allEvents.js");
const feedUpdate = require("./EventUpdate.js");
const Event = require("./Event.js")
const deleteEvent = require("./DeleteEventById")

module.exports = {
  organiseEvent,
  allEvents,
  feedUpdate,
  Event,
  deleteEvent
};

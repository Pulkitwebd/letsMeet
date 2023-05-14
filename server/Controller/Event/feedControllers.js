const organiseEvent = require("./organiseEvent");
const allEvents = require("./allEvents.js");
const feedUpdate = require("./EventUpdate.js");
const Event = require("./Event.js")
const deleteEvent = require("./DeleteEventById")
const applyEvent = require("./ApplyToEvent")

module.exports = {
  organiseEvent,
  allEvents,
  feedUpdate,
  Event,
  deleteEvent,
  applyEvent
};

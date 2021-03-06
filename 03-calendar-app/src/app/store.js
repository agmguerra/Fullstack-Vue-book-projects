import { seedData } from "./seed.js";

export const store = {
  state: {
    seedData: seedData
  },
  getActiveDay: function() {
    return this.state.seedData.find((day) => day.active);
  },
  setActiveDay (dayId) {
     this.state.seedData.map((dayObj) => {
        dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
    });
  },
  submitEvent: function(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ "details": eventDetails, "edit": false});
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const eventObj = this.getEventObj(dayId, eventDetails);
    eventObj.edit = true;
  },
  updateEvent (dayId, originalEventDetails, newEventDetails) {
    // Find the day object
    // Find the specific event
    const eventObj = this.getEventObj(dayId, originalEventDetails);

    // Set the event details to the new details
    // and turn off editing
    eventObj.details = newEventDetails;
    eventObj.edit = false;
  },
  deleteEvent (dayId, eventDetails) {
    const dayObj = this.state.seedData.find(
      day => day.id === dayId
    );
    const eventIndexToRemove = dayObj.events.findIndex(
      event => event.details === eventDetails
    );
    dayObj.events.splice(eventIndexToRemove, 1);
  },
  resetEditOfAllEvents: function() {
    this.state.seedData.map((dayObj) => {
        dayObj.events.map((event) => {
            event.edit = false;
        });
    });
  },
  getEventObj (dayId, eventDetails) {
    const dayObj = this.state.seedData.find(
        day => day.id === dayId
    );
    return dayObj.events.find(
        event => event.details === eventDetails
    );
  }
};

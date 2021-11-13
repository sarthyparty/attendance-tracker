import { Deta } from "deta";
import { DEV_PROJECT_KEY } from "./Keys";

export var user = "User"
const deta = Deta(DEV_PROJECT_KEY);
const db = deta.Base("attendance");

export const setupTracker = () => {
  let date = Date();
  const tracker = db.put({
    datetime: date.toString(),
    name: user,
    people: [],
    isLocked: false,
  });
  return tracker;
};

export const getTrackers = async () => {
  const trackers = await db.fetch({name: user});
  return trackers;
};

export const getTracker = async ({id}) => {
  const tracker = await db.get(id);
  return tracker;
};

export const joinTracker = (name, tracker) => {
  if (tracker.people.includes(name.value)) {
    return "You have already joined this tracker."
  }
  tracker.people.push(name.value);
  db.put(tracker)
  return "Success";
};

export const switchLock = (tracker) => {
  tracker.isLocked = !tracker.isLocked;
  db.put(tracker);
}

export const removePerson = (tracker, person) => {
  let i = tracker.people.indexOf(person);
  if (i > -1) {
    tracker.people.splice(i, 1);
  }
  db.put(tracker);
}

export const removeTracker = (tracker) => {
  db.delete(tracker);
}
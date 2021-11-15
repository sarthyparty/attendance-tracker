import { Deta } from "deta";
import { DEV_PROJECT_KEY } from "./Keys";

export var user = "User"
const deta = Deta(DEV_PROJECT_KEY);
const db = deta.Base("trackers");
const db1 = deta.Base("appearances");

export const setupTracker = () => {
  let date = Date();
  const tracker = db.put({
    datetime: date.toString(),
    user: user,
    people: [],
    isLocked: false,
  });
  return tracker;
};

export const getTrackers = async () => {
  const trackers = await db.fetch({user: user});
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
  const appearance = db1.put({
    tracker: tracker.key,
    user: tracker.user
  }, (user+name.value));
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
  db1.delete(person);
}

export const removeTracker = (tracker) => {
  db.delete(tracker.key);
  for (let i = 0; i < tracker.people.length; i++) {
    db1.delete(tracker.people[i]);
  }
}
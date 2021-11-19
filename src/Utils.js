import { Deta } from "deta";
import { DEV_PROJECT_KEY } from "./Keys";
import { nanoid } from "nanoid";

const deta = Deta(DEV_PROJECT_KEY);
const db = deta.Base("trackers");
const db1 = deta.Base("appearances");

export const setupTracker = () => {
  let date = Date();
  const tracker = db.insert({
    datetime: date.toString(),
    user: localStorage.getItem("email"),
    people: [],
    isLocked: false,
  },nanoid(6));
  return tracker;
};

export const getTrackers = async () => {
  const trackers = await db.fetch({user: localStorage.getItem("email")});
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
  }, (tracker.user+name.value));
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
  db1.delete(tracker.user+person);
}

export const removeTracker = (tracker) => {
  db.delete(tracker.key);
  for (let i = 0; i < tracker.people.length; i++) {
    db1.delete(tracker.people[i]+tracker.user);
  }
}

export const getAppearances = () => {
  const appearances = db1.fetch({
    user: localStorage.getItem("email")
  });
  
}
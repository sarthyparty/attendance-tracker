import { Deta } from "deta";
import { DEV_PROJECT_KEY } from "./Keys";
import { nanoid } from "nanoid";

const deta = Deta(DEV_PROJECT_KEY);
const db = deta.Base("trackers");
const db1 = deta.Base("appearances");
const db2 = deta.Base("users");

export const createUser = (email) => {
  db2.insert({
    members: []
  },email)
}

export const getUser = async ({email}) => {
  const user = await db2.get(email);
  return user;
}

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

export const joinTracker = (name, tracker, user) => {
  if (name == "" || name == null) {
    return "Please enter a valid name.";
  }
  if (name.split(" ").length != 2) {
    return "Please enter a first and last name."
  }
  if (tracker.people.includes(name)) {
    return "You have already joined this tracker."
  }
  if (!user.members.includes(name)) {
    user.members.push(name);
    db2.put(user);
  }
  db1.put({
    tracker: tracker.key,
    user: tracker.user
  }, (tracker.user+name));
  tracker.people.push(name);
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
    console.log(tracker.people[i]+tracker.user)
    db1.delete(tracker.user+tracker.people[i]);
  }
}

export const getAppearances = () => {
  const appearances = db1.fetch({
    user: localStorage.getItem("email")
  });
  
}
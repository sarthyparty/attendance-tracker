import { Deta } from "deta";
import { DEV_PROJECT_KEY } from "./Keys";

export var user = "User"

export const setupTracker = () => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  let date = Date();
  const tracker = db.put({
    datetime: date.toString(),
    name: user,
    people: [],
  });
  return tracker;
};

export const getTrackers = async (event) => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  const trackers = await db.fetch({name: user});
  return trackers;
};

export const getTracker = async ({id}) => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  const tracker = await db.get(id);
  return tracker;
};

export const joinTracker = (name, tracker) => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  if (tracker.people.includes(name.value)) {
    return "You have already joined this tracker."
  }
  tracker.people.push(name.value);
  db.put(tracker)
  return "Success";
};
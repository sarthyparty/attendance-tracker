import { Deta } from "deta";
import { DEV_PROJECT_KEY } from "./Keys";

export var user = "ChinmayaTracker"

export const setupTracker = () => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  let date = Date();
  const tracker = db.put({
    datetime: JSON.stringify(date),
    name: user,
    people: [],
  });
  return tracker;
};

export const getTrackers = async (event) => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  const trackers = await db.fetch({name: user});
  setTimeout(() => {  console.log(trackers); }, 10000);
  console.log (trackers);
  return trackers;
};

export const getTracker = async ({event, id}) => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  const tracker = await db.get(id);
  return tracker;
};

export const joinTracker = (name, tracker) => {
  const deta = Deta(DEV_PROJECT_KEY);
  const db = deta.Base("attendance");
  tracker.people.push(name.value);
  db.put(tracker)
  return "Success";
};
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faGripVertical,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Sortable from "sortablejs";

//Icons
library.add(faTrash, faGripVertical, faPlus);
dom.watch();

const replicant = nodecg.Replicant("schedule", {
  defaultValue: [],
});

const addButton = document.getElementById("addButton");
const updateButton = document.getElementById("updateButton");

const activityList = document.getElementById("activityList");
const template = document.getElementById("template");

new Sortable(activityList, {
  animation: 150,
  handle: '[data-action="drag"]',
});

addButton.addEventListener("click", () => {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  now.setHours(now.getHours() + 1);
  activityList.appendChild(create(now.toTimeString().slice(0, 5), ""));
});

updateButton.addEventListener("click", () => {
  replicant.value = [...activityList.querySelectorAll("li")].map(row => ({
    time: row.querySelector('[data-field="time"]').value,
    activity: row.querySelector('[data-field="activity"]').value,
  }));
  updateButton.textContent = "Update sent"
  setTimeout(() => updateButton.textContent = "Update", 1000);
});

activityList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="delete"]');
  button?.closest("li").remove();
});

replicant.on("change", (value) => {
  activityList.replaceChildren(
    ...value.map(({ time, activity }) => create(time, activity)),
  );
});

function create(time, activity) {
  const clone = template.content.cloneNode(true);
  clone.querySelector('[data-field="time"]').value = time;
  clone.querySelector('[data-field="activity"]').value = activity;
  return clone;
}

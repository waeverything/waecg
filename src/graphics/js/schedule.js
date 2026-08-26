const replicant = nodecg.Replicant("schedule", {
  defaultValue: []
});

const schedule = document.getElementById("schedule");
const template = document.getElementById("template");
const clock = document.getElementById("clock");

replicant.on("change", (value) => {
  schedule.replaceChildren(
    ...value.map(({ time, activity }) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('[data-field="time"]').textContent = time;
      clone.querySelector('[data-field="activity"]').textContent = activity;
      return clone;
    })
  );
});

setInterval(() => {
  clock.textContent = new Date().toLocaleTimeString("sw-SE");
}, 1000);

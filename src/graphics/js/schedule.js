const scheduleReplicant = nodecg.Replicant("schedule");
const tableCells = document.querySelectorAll("td");

scheduleReplicant.on("change", (newValue) => {
  if (newValue == undefined) {
    return;
  }

  for (let index = 0; index < newValue.length; index++) {
    const pair = newValue[index];

    tableCells[index * 2].textContent = pair[0];
    tableCells[index * 2 + 1].textContent = pair[1];
  }
});

// Clock
const clockDisplay = document.getElementById("clock");

function showTime() {
  const date = new Date();

  if (clockDisplay === null) {
    return;
  }

  clockDisplay.textContent = date.toLocaleTimeString("sw-SE");
  setTimeout(showTime, 1000);
}

showTime();

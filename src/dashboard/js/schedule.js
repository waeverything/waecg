const scheduleReplicant = nodecg.Replicant("schedule");

const button = document.getElementById("updateButton");
const inputRows = getInputRows();

button.addEventListener("click", updateSchedule);

function updateSchedule() {
  const scheduleEntries = [];
  for (let row of inputRows) {
    scheduleEntries.push([row.leftInput.value, row.rightInput.value])
  }

  scheduleReplicant.value = scheduleEntries;
}

function getInputRows() {
  const inputs = Array.from(document.querySelectorAll("input"));

  let rows = [];
  for (let i = 0; i < inputs.length; i += 2) {
    rows.push({ leftInput: inputs[i], rightInput: inputs[i + 1]})
  }

  return rows;
}

scheduleReplicant.on('change', (newValue) => {
  // The value is null on new NodeCG instances
  if (newValue == undefined) {
    return;
  }

  if (newValue.length !== inputRows.length) {
    console.error("The length of schedule entries does not match the number of input rows.");
    return;
  }

  for (let index = 0; index < newValue.length; index++) {
    const row = inputRows[index];
    const entry = newValue[index];
    row.leftInput.value = entry?.[0] ?? '';
    row.rightInput.value = entry?.[1] ?? '';
  }
});

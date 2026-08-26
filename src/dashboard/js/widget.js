const replicant = nodecg.Replicant("widget", {
  defaultValue: []
});
const textArea = document.getElementById("texts");
const updateButton = document.getElementById("updateButton");

updateButton.addEventListener("click", () => {
  replicant.value = textArea.value.split("\n");
  updateButton.textContent = "Update sent"
  setTimeout(() => updateButton.textContent = "Update", 1000);
});

replicant.on("change", value => {
  textArea.value = value.join("\n");
});

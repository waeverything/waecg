const widgetReplicant = nodecg.Replicant("widget");

const textArea = document.getElementById("texts");
const updateButton = document.getElementById("updateButton");

updateButton.addEventListener("click", () => {
  const texts = textArea.value.split("\n");
  widgetReplicant.value = texts;
});

widgetReplicant.on("change", (newValue) => {
  if (newValue == undefined) {
    return;
  }

  textArea.value = newValue.join("\n");
});

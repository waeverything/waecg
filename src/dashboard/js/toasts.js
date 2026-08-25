// NodeCG
const toastsReplicant = nodecg.Replicant("toasts");

const inputs = document.querySelectorAll("input");

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (event) {
    const data = {
      leftToast: {
        title: inputs[0].value,
        subtitle: inputs[1].value,
      },
      rightToast: {
        title: inputs[2].value,
        subtitle: inputs[3].value,
      },
      bottomToast: inputs[4].value.split(";"),
      show: event.target.dataset.show,
    };

    toastsReplicant.value = data;
  });
});

toastsReplicant.on("change", (newValue) => {
  // The value is null on new NodeCG instances
  if (newValue == undefined) {
    return;
  }

  // Left
  if (newValue.leftToast != undefined) {
    inputs[0].value = newValue.leftToast.title || "";
    inputs[1].value = newValue.leftToast.subtitle || "";
  }

  // Right
  if (newValue.rightToast != undefined) {
    inputs[2].value = newValue.rightToast.title || "";
    inputs[3].value = newValue.rightToast.subtitle || "";
  }

  // Bottom
  const bottomToastItems = newValue.bottomToast;
  if (bottomToastItems != undefined) {
    inputs[4].value = bottomToastItems.join(";");
  }
});

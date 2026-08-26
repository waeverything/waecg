const replicant = nodecg.Replicant("toasts");

const leftTitleInput = document.getElementById("leftTitleInput");
const leftSubtitleInput = document.getElementById("leftSubtitleInput");
const rightTitleInput = document.getElementById("rightTitleInput");
const rightSubtitleInput = document.getElementById("rightSubtitleInput");
const bottomInput = document.getElementById("bottomInput");

document.querySelectorAll("button[data-show]").forEach(button => {
  button.addEventListener("click", () => {
    replicant.value = {
      leftToast: {
        title: leftTitleInput.value,
        subtitle: leftSubtitleInput.value,
      },
      rightToast: {
        title: rightTitleInput.value,
        subtitle: rightSubtitleInput.value,
      },
      bottomToast: bottomInput.value.split(";"),
      show: button.dataset.show,
    };
  });
});

replicant.on("change", value => {
  // The value is undefined on new NodeCG instances
  if (value == undefined) {
    return;
  }

  leftTitleInput.value = value.leftToast?.title || "";
  leftSubtitleInput.value = value.leftToast?.subtitle || "";
  rightTitleInput.value = value.rightToast?.title || "";
  rightSubtitleInput.value = value.rightToast?.subtitle || "";
  bottomInput.value = value.bottomToast?.join(";") || "";
});

const toastsReplicant = nodecg.Replicant("toasts");

const bottomToast = document.getElementById("bottom");
const leftToast = document.getElementById("left");
const rightToast = document.getElementById("right");

const leftToastDivs = leftToast.getElementsByTagName("div");
const rightToastDivs = rightToast.getElementsByTagName("div");

toastsReplicant.on("change", (newValue) => {
  if (newValue == undefined) {
    return;
  }

  leftToastDivs[1].textContent = newValue.leftToast.title || "";
  leftToastDivs[2].textContent = newValue.leftToast.subtitle || "";

  rightToastDivs[1].textContent = newValue.rightToast.title || "";
  rightToastDivs[2].textContent = newValue.rightToast.subtitle || "";

  if (bottomToast !== null) {
    bottomToast.innerHTML = "";
  }

  newValue.bottomToast.forEach(entry => {
    let div = document.createElement("div");
    div.textContent = entry;
    bottomToast?.appendChild(div);
  })

  switch (newValue.show) {
    case "left":
      showToast(leftToast);
      break;
    case "right":
      showToast(rightToast);
      break;
      case "both":
        showToast(leftToast);
        showToast(rightToast);
        break;
      case "bottom":
        showToast(bottomToast);
        break;
  }
});

function showToast(toast) {
  if (toast === null) return;

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 10000);
}

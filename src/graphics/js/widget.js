const widgetReplicant = nodecg.Replicant("widget");
let texts;
widgetReplicant.on("change", (newValue) => {
  if (newValue == undefined) {
    return;
  }

  texts = newValue;
  textIndex = 0;
  init();
});

// HTML Elements
const text = document.getElementById("text");

// URL params
const urlQuery = window.location.search;
const urlParams = new URLSearchParams(urlQuery);

switch (urlParams.get("position")) {
  case "topleft":
    break;
  case "bottomleft":
    document.body.style.alignItems = "end";
    break;
  case "bottomright":
    document.body.style.alignItems = "end";
    document.body.style.justifyContent = "right";
    break;
  default:
    document.body.style.justifyContent = "right";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let textIndex = 0;

function swapNextText() {
  if (texts == undefined) {
    text.textContent = "WAEverything";
    return;
  }

  // Swap text
  text.textContent = texts[textIndex];

  // Update textIndex
  if (textIndex >= texts.length - 1) {
    textIndex = 0;
  } else {
    textIndex = textIndex + 1;
  }
}

async function nonCollapseRoutine() {
  if (texts == undefined) {
    return;
  }

  // Hide text
  text.style.opacity = "0";

  await sleep(2000);

  // Store the current width before swapping text
  const currentWidth = text.scrollWidth;

  swapNextText();

  // Remove transition temporally so we can get the new width
  const transition = text.style.transition;
  text.style.transition = "";
  text.style.width = null;
  // Grab the new width
  const newWidth = text.scrollWidth;

  requestAnimationFrame(function() {
    // Apply old things back
    text.style.width = currentWidth + 'px';
    text.style.transition = transition;

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to the new width
    requestAnimationFrame(function() {
      text.style.width = newWidth + 'px';
    });
  });

  text.style.opacity = "1";
}

const interval = 60000;

let initialized;
function init() {
  if (initialized) {
    return;
  }
  //text.style.width = "0px";
  swapNextText();
  setInterval(nonCollapseRoutine, interval);
  initialized = true;
}

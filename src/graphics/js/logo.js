// This script is shared between Intermission and Schedule
const logoReplicant = nodecg.Replicant("assets:logo");
const logoImageElement = document.getElementById("logo");
const defaultLogo = new URL("../assets/wae-logo+wordmark.svg", import.meta.url);

// URL params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

logoReplicant.on("change", value => {
  if (urlParams.has("nologo")) {
    return;
  }

  if (value[0] == undefined) {
    logoImageElement.src = defaultLogo.href;
    return;
  }

  logoImageElement.src = value[0].url;
});

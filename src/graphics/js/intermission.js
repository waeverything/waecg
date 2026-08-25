const logoReplicant = nodecg.Replicant("assets:intermission-logo");
const logoImageElement = document.getElementById("logo");

// Images
const defaultLogo = new URL("../assets/wae-logo+wordmark.svg", import.meta.url);

// URL params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

logoReplicant.on("change", (newValue) => {
  if (urlParams.has("nologo")) {
    return;
  }

  if (newValue[0] == undefined) {
    logoImageElement.src = defaultLogo.href;
    return;
  }

  logoImageElement.src = newValue[0].url;
});

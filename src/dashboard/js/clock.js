const clockDisplay = document.getElementById("clock");

setInterval(() => {
  clockDisplay.textContent = new Date().toLocaleTimeString('sw-SE');
}, 1000);

const clockDisplay = document.getElementById("clock");

function showTime(){
    const date = new Date();

    if (clockDisplay === null) {
        return;
    }

    clockDisplay.textContent = date.toLocaleTimeString('sw-SE');
    setTimeout(showTime, 1000);
}

showTime();

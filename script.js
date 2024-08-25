let setAlarm = document.getElementById("set");
let alarms = document.getElementById("alarms");
const allAlarms = [];

setAlarm.addEventListener("click", () => {
  let hrs = document.getElementById("hours");
  let mins = document.getElementById("minutes");
  let sec = document.getElementById("seconds");
  let ampm = document.getElementById("ampm");

  if (ampm.value == "AM") {
    hrs.value = hrs.value % 12;
    hrs.value = hrs.value ? hrs.value : 12;
  }

  mins.value = mins.value % 60;
  mins.value = mins.value ? mins.value : 60;

  sec.value = sec.value % 60;
  sec.value = sec.value ? sec.value : 60;

  const formattedHours = (hrs.value < 10 ? "0" : "") + hrs.value;
  const formattedmin = (mins.value < 10 ? "0" : "") + mins.value;
  const formattedsec = (sec.value < 10 ? "0" : "") + sec.value;

  const alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarmdiv");
  const p = document.createElement("p");
  p.textContent = `${formattedHours}:${formattedmin}:${formattedsec} ${ampm.value}`;
  alarmDiv.appendChild(p);
  allAlarms.push(p.textContent);

  alarms.appendChild(alarmDiv);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");

  deleteBtn.addEventListener("click", () => {
    const index = allAlarms.findIndex((alarm) => alarm === p.textContent);
    if (index !== -1) {
      allAlarms.splice(index, 1);
      alarms.removeChild(alarmDiv);
    }
  });

  alarmDiv.appendChild(deleteBtn);
});

setInterval(currentTime, 1000);

function currentTime() {
  const timeNow = document.getElementById("time");

  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  let formattedHours = (hours < 10 ? "0" : "") + hours;
  let formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  let formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

  timeNow.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  allAlarms.forEach((alarm) => {
    if (alarm == timeNow.textContent) {
      const alarmSound = new Audio("./banana_song.mp3");
      alarmSound.loop = true;
      function startAlarm() {
        alarmSound.play();
        Swal.fire({
          html: `
             <div class="shaking-watch">
            <img src="alarm.png" alt="Shaking Watch">
        </div>
        <p>uth ja nhi to peti bn jayega</p>
            
            `,
          title: "Alarm Ringing",
          text: "uth jao jldi se",
          reverseButtons: true,
          showCancelButton: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: "ok",
          cancelButtonText: "snooze",
        }).then((result) => {
          if (result.isConfirmed) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
            setTimeout(() => {
              startAlarm();
            }, 3000);
          }
        });
      }
      startAlarm();
    }
  });
}

currentTime();

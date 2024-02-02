var currTime = document.getElementById("current-time");
///////////displaying Current Time//////////////////////////////////
function displayClock(){
  
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
     let seconds =date.getSeconds();
    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM';
 
    // Find current hour in AM-PM Format
    hours = hours % 12;
 
    // To display "0" as "12"
    hours = hours ? '0'+ hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ?  '0' + seconds : seconds
    let time =  `${hours}:${minutes}:${seconds} ${newformat}`;
    currTime.innerText=time;
    
    setTimeout(function () {
      displayClock();
      if (alarm_List.includes(time)) {
        ringing(time);
      }
    }, 1000);

}
displayClock();



 
// changeTimeFormat();

function formatTime(time) {
    // Check if time is a single digit
    if (time < 10 && time.toString().length === 1 ) {
      return '0' + time;
    }
    return time;
}

/////////////////Adding Alarms to the list///////////////////
const myList = document.querySelector('.set-alarm-list');

let alarm_List = [];
const userInput = document.getElementById('alarmForm');
userInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const hour = document.getElementById('hour').value;
  const min = document.getElementById('min').value;
  const sec = document.getElementById('sec').value;
  const am_pm= document.getElementById('am-pm').value;
  let new_h = formatTime(hour);
  let new_m = formatTime(min);
  let new_s = formatTime(sec);
  let new_a = formatTime(am_pm);
  const new_Alarm = `${new_h}:${new_m}:${new_s} ${new_a}`;
  if (!isNaN(new_h) && !isNaN(new_m) && !isNaN(new_s)) {
    if (!alarm_List.includes(new_Alarm)) {
      alarm_List.push(new_Alarm);
      shownew_Alarm(new_Alarm);
      alert( `Alarm set for ${new_Alarm}`);
      userInput.reset();
    } else {
      alert(`Alarm for ${new_Alarm} is already set.`);
    }
  } else {
    alert(`Invalid time entered. Please use numbers for hours, minutes, and seconds.`);
  } 
});




//////Displaying Upcoming Alarms/////////////
function shownew_Alarm(new_Alarm) {
    const li = document.createElement('li');
    li.classList.add('time-list');
    li.innerHTML = `<span class="time">${new_Alarm}</span>  
    <button class="deleteAlarm time-control" onclick="removeAlarm('${new_Alarm}')">Delete</button> `;
    myList.appendChild(li);
}

///////adding an audio to get notified///////////////
const audio = new Audio("https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3");

// adding loop to continue Alarm
audio.loop = true;

function ringing(time){
  audio.play();
}


//////////////////Removing an Alarm from the list//////////////////
myList.addEventListener('click', (e) => {
    if (e.target.classList.contains("deleteAlarm")) {
      e.target.parentElement.remove();
      removeAlarm(e.target.previousElementSibling.textContent);
    }
});
///////////To stop the audio once its played/////////////////////
function clearAlarm() {
  audio.pause();
  audio.currentTime = 0;
}


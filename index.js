var clock = document.getElementById('clock');
var hourHand = document.getElementById('hour');
var minuteHand = document.getElementById('minute');
var secondHand = document.getElementById('second');
var smallSeconds = document.getElementById('smallSeconds');
var smallSecondHand = document.getElementById('smallSecondHand');

var tenthSecondDial = document.getElementById('tenthSecondDial');
var tenthSecondHand = document.getElementById('tenthSecondHand');
var chronoMinuteDial = document.getElementById('chronoMinuteDial');
var chronoMinuteHand = document.getElementById('chronoMinuteHand');

var stopwatchRunning = false;

var autoHours;
var autoMinutes;
var autoSeconds;
var totalSeconds;
var tenthSeconds;
var chronoSeconds;

var refHours;
var refMinutes;
var refSeconds;
var refTotalSeconds;


var randomR;
var randomG;
var randomB;


clock.style.background = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';


applyMarkers();

getTime('auto');

totalSeconds = autoHours + autoMinutes + autoSeconds;
tenthSeconds = 0;
chronoSeconds = 0

function changeColor() {
  randomR = Math.floor(Math.random() * 256);
  randomG = Math.floor(Math.random() * 256);
  randomB = Math.floor(Math.random() * 256);
  clock.style.background = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
}

// setInterval(changeColor, 200)


function automatic() {
  getTime('reference');
  refTotalSeconds = refHours + refMinutes + refSeconds;
  if (Math.abs(totalSeconds - refTotalSeconds) > 2) {
    getTime('auto');
    totalSeconds = autoHours + autoMinutes + autoSeconds;
  }
  autoSeconds += 1;
  totalSeconds += 1;
  hourHand.style.transform = 'rotate(' + ((totalSeconds / 43200) * 360) + 'deg)';
  minuteHand.style.transform = 'rotate(' + (((totalSeconds % 3600)/3600) * 360) + 'deg)';

  smallSecondHand.style.transform = 'rotate(' + autoSeconds * (360 / 60) + 'deg)';
}



var tenthsCounter = 0;

function tenths() {
  tenthsCounter += 10;
  tenthSeconds += 3.6;
  tenthSecondHand.style.transform = 'rotate(' + tenthSeconds + 'deg)';
  secondHand.style.transform = 'rotate(' + Math.floor(tenthsCounter / 1000) * (360 / 60) + 'deg)';
  chronoMinuteHand.style.transform = 'rotate(' + Math.floor(tenthsCounter / 60000) * (360 / 30) + 'deg)';
}

let autoInterval = setInterval(automatic, 1000);
let tenthsInterval;
let chronSecondsInterval;

document.getElementById('startStop').addEventListener('mousedown', function() {
  if (stopwatchRunning) {
    clearInterval(tenthsInterval);
    clearInterval(chronSecondsInterval);
    stopwatchRunning = false;
  } else {
    tenthsInterval = setInterval(tenths, 10);
    stopwatchRunning = true;
  }
})

document.getElementById('reset').addEventListener('mousedown', function() {
  if (stopwatchRunning) {
    return;
  } else {
    tenthsCounter = 0;
    tenthSeconds = 0;
    chronoSeconds = 0;
    tenthSecondHand.style.transform = 'rotate(' + tenthSeconds + 'deg)';
    secondHand.style.transform = 'rotate(' + Math.floor(tenthsCounter / 1000) * (360 / 60) + 'deg)';
    chronoMinuteHand.style.transform = 'rotate(' + Math.floor(tenthsCounter / 60000) * (360 / 30) + 'deg)';
  }
})


// Quartz most accurate=>
// setInterval(convertDate, 1000)
function getTime(param) {
  var date = new Date();
  var hours = date.getHours() < 12 ? date.getHours() : date.getHours() - 12;
  var minutes = date.getMinutes();
  var seconds = date.getSeconds() + 1 > 60 ? date.getSeconds() + 1 - 60 : date.getSeconds() + 1;

  if (param === 'auto') {
    var hourPosition = (360 / 12) * hours
    var minutePosition = (360 / 60) * minutes;
    var secondPosition = (360 / 60) * seconds;

    autoHours = hours * 60 * 60;
    autoMinutes = minutes * 60;
    autoSeconds = seconds;

    hourHand.style.transform = 'rotate(' + hourPosition + 'deg)';
    minuteHand.style.transform = 'rotate(' + minutePosition + 'deg)';
    smallSecondHand.style.transform = 'rotate(' + secondPosition + 'deg)';
  } else if (param === 'reference') {
    refHours = hours * 60 * 60;
    refMinutes = minutes * 60;
    refSeconds = seconds;
  }
}


function applyMarkers() {
  var markerRotation = 0;
  var tenthRotation = 0;
  // var chronoMinuteRotation = 0;
  for (var i = 0; i < 60; i++) {
    var main = document.createElement('div');
    var topTick = document.createElement('div');
    var middle = document.createElement('div');
    var bottomTick = document.createElement('div');

    var smallMain = document.createElement('div');
    var smallTopTick = document.createElement('div');
    var smallMiddle = document.createElement('div');
    var smallBottomTick = document.createElement('div');

    var tenthMain = document.createElement('div');
    var tenthTopTick = document.createElement('div');
    var tenthMiddle = document.createElement('div');
    var tenthBottomTick = document.createElement('div');



    if (i % 5 === 0) {
      main.classList.add('mainThick');
      middle.classList.add('middleThick');
      topTick.classList.add('tickThick');
      bottomTick.classList.add('tickThick');

      smallMain.classList.add('smallMainThick');
      smallMiddle.classList.add('smallMiddleThick');
      smallTopTick.classList.add('smallTickThick');
      smallBottomTick.classList.add('smallTickThick');
    }
    else {
      if (i % 3 === 0) {
        tenthMain.classList.add('smallMainThick');
        tenthMiddle.classList.add('smallMiddleThick');
        tenthTopTick.classList.add('smallTickThick');
        tenthBottomTick.classList.add('smallTickThick');
        tenthRotation += 18;
      }

      main.classList.add('main');
      middle.classList.add('middle');
      topTick.classList.add('tick');
      bottomTick.classList.add('tick');

      smallMain.classList.add('smallMain')
      smallMiddle.classList.add('smallMiddle')
      smallTopTick.classList.add('smallTick')
      smallBottomTick.classList.add('smallTick')
    }

    main.appendChild(topTick)
    main.appendChild(middle)
    main.appendChild(bottomTick)

    smallMain.appendChild(smallTopTick);
    smallMain.appendChild(smallMiddle);
    smallMain.appendChild(smallBottomTick);

    tenthMain.appendChild(tenthTopTick);
    tenthMain.appendChild(tenthMiddle);
    tenthMain.appendChild(tenthBottomTick);

    main.style.transform = 'rotate(' + markerRotation + 'deg)';
    smallMain.style.transform = 'rotate(' + markerRotation + 'deg)';
    tenthMain.style.transform = 'rotate(' + tenthRotation + 'deg)';

    clock.appendChild(main);
    smallSeconds.appendChild(smallMain);
    tenthSecondDial.appendChild(tenthMain);

    markerRotation += 6;
  }
}

function chronoMarkers() {
  var chronoMinuteRotation = 0;
  for (let i = 0; i < 30; i++) {
    var chronoMinuteMain = document.createElement('div');
    var chronoMinuteTopTick = document.createElement('div');
    var chronoMinuteMiddle = document.createElement('div');
    var chronoMinuteBottomTick = document.createElement('div');
    if (i % 2 === 0) {
      chronoMinuteMain.classList.add('smallMainThick');
      chronoMinuteMiddle.classList.add('smallMiddleThick')
      chronoMinuteTopTick.classList.add('smallTickThick');
      chronoMinuteBottomTick.classList.add('smallTickThick');
    } else {
      chronoMinuteMain.classList.add('smallMain');
      chronoMinuteMiddle.classList.add('smallMiddle')
      chronoMinuteTopTick.classList.add('smallTick');
      chronoMinuteBottomTick.classList.add('smallTick');
    }
    chronoMinuteMain.appendChild(chronoMinuteTopTick);
    chronoMinuteMain.appendChild(chronoMinuteMiddle);
    // chronoMinuteMain.appendChild(chronoMinuteBottomTick);
    chronoMinuteDial.appendChild(chronoMinuteMain);
    chronoMinuteMain.style.transform = 'rotate(' + chronoMinuteRotation + 'deg)';
    chronoMinuteRotation += 12;
  }
}

chronoMarkers();
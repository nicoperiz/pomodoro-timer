const timerDisplay = document.getElementById('timer');
const statusText = document.getElementById('status-text');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const circle = document.querySelector('.progress-ring__circle');
const alarm = document.getElementById('alarm');
const workInput = document.getElementById('work-input');
const breakInput = document.getElementById('break-input');

// SVG circumference calculation for the circular progress bar
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;

let timeLeft;
let totalTime;
let timerId = null;
let isWorkMode = true;

function loadSettings() {
  const savedWork = localStorage.getItem('workTime');
  const savedBreak = localStorage.getItem('breakTime');
  if (savedWork) workInput.value = savedWork;
  if (savedBreak) breakInput.value = savedBreak;
}

function saveSettings() {
  localStorage.setItem('workTime', workInput.value);
  localStorage.setItem('breakTime', breakInput.value);
  if (!timerId) initTimer();
}

function initTimer() {
  const minutes = isWorkMode ? workInput.value : breakInput.value;
  timeLeft = minutes * 60;
  totalTime = timeLeft;
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update SVG circle based on remaining time percentage
  const percent = (timeLeft / totalTime) * 100;
  const offset = circumference - (percent / 100 * circumference);
  circle.style.strokeDashoffset = offset;

  document.title = `(${timerDisplay.textContent}) Pomodoro`;
}

function switchMode() {
  isWorkMode = !isWorkMode;
  alarm.play();

  if (isWorkMode) {
    statusText.textContent = "Work Session";
    statusText.className = "status-work";
    circle.style.stroke = "var(--work-color)";
  } else {
    statusText.textContent = "Short Break";
    statusText.className = "status-break";
    circle.style.stroke = "var(--break-color)";
  }
  initTimer();
}

function startTimer() {
  if (timerId !== null) return; // Prevent multiple instances

  // Save state to localStorage
  localStorage.setItem('isRunning', 'true');
  localStorage.setItem('endTime', Date.now() + timeLeft * 1000);
  localStorage.setItem('isWorkMode', isWorkMode ? 'true' : 'false');

  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      switchMode();
      startTimer(); // Auto-start next session
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  localStorage.removeItem('isRunning');
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isWorkMode = true;
  statusText.textContent = "Work Session";
  statusText.className = "";
  circle.style.stroke = "var(--work-color)";
  localStorage.removeItem('isRunning');
  localStorage.removeItem('endTime');
  localStorage.removeItem('isWorkMode');
  initTimer();
}

function restoreTimer() {
  const isRunning = localStorage.getItem('isRunning') === 'true';
  const endTime = parseInt(localStorage.getItem('endTime'));
  const savedWorkMode = localStorage.getItem('isWorkMode') === 'true';

  if (!isRunning || !endTime) return;

  // Calculate remaining time
  const now = Date.now();
  const remaining = Math.floor((endTime - now) / 1000);

  if (remaining <= 0) {
    // Timer already finished while away
    localStorage.removeItem('isRunning');
    localStorage.removeItem('endTime');
    localStorage.removeItem('isWorkMode');
    return;
  }

  // Resume from where it left off
  isWorkMode = savedWorkMode;
  timeLeft = remaining;
  totalTime = (isWorkMode ? workInput.value : breakInput.value) * 60;
  updateDisplay();
  startTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
workInput.addEventListener('change', saveSettings);
breakInput.addEventListener('change', saveSettings);

const darkToggle = document.getElementById('dark-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  darkToggle.textContent = '☀️ Light';
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  darkToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

loadSettings();
initTimer();
restoreTimer();
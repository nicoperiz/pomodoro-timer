// Seleziono gli elementi una sola volta per ottimizzare le prestazioni (DOM Caching)
const timerDisplay = document.getElementById('timer');
const statusText = document.getElementById('status-text');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const circle = document.querySelector('.progress-ring__circle');
const alarm = document.getElementById('alarm');
const workInput = document.getElementById('work-input');
const breakInput = document.getElementById('break-input');

// Setup SVG: Calcolo la circonferenza per la barra di progressione
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;

let timeLeft;   // Secondi rimanenti
let totalTime;  // Secondi totali iniziali (per calcolare la %)
let timerId = null; 
let isWorkMode = true;

// Carico le preferenze dell'utente all'avvio
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

// Inizializzo il timer basandomi sulla modalità attuale (Lavoro/Pausa)
function initTimer() {
    const minutes = isWorkMode ? workInput.value : breakInput.value;
    timeLeft = minutes * 60;
    totalTime = timeLeft;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Formatto il tempo come MM:SS
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Aggiorno il cerchio: calcolo l'offset basato sulla percentuale di tempo passato
    const percent = (timeLeft / totalTime) * 100;
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
    
    // UX: Mostro il tempo nel titolo della scheda
    document.title = `(${timerDisplay.textContent}) Pomodoro`;
}

function switchMode() {
    isWorkMode = !isWorkMode; // Toggle dello stato
    alarm.play(); // Feedback sonoro
    
    if (isWorkMode) {
        statusText.textContent = "Sessione Lavoro";
        statusText.className = "status-work";
        circle.style.stroke = "var(--work-color)";
    } else {
        statusText.textContent = "Pausa Breve";
        statusText.className = "status-break";
        circle.style.stroke = "var(--break-color)";
    }
    initTimer();
}

function startTimer() {
    if (timerId !== null) return; // Protezione contro click multipli

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            switchMode();
            startTimer(); // Ricorsione per il ciclo continuo
        }
    }, 1000);
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
});
resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    isWorkMode = true;
    statusText.textContent = "Sessione Lavoro";
    statusText.className = "";
    circle.style.stroke = "var(--work-color)";
    initTimer();
});

workInput.addEventListener('change', saveSettings);
breakInput.addEventListener('change', saveSettings);

// Boot dell'app
loadSettings();
initTimer();
const track = document.getElementById('scroll-track');
const startBtn = document.getElementById("btnStart");
const themeToggle = document.getElementById("themeToggle");

const lineTypes = ['normal', 'small', 'small', 'small', 'small'];

const totalLines = 51;

let lineIndex = totalLines;
let pomodoro;
let pomodoro_time = 25 * 60;

const tickSound = new Audio("assets/sound/tick.mp3");
tickSound.volume = 0.5;

const chimeSound = new Audio("assets/sound/chime.mp3");

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('pomodorotheme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById("switcher-input").setAttribute("checked", true);
    } else {
        document.body.classList.remove('dark');
        document.getElementById("switcher-input").removeAttribute("checked");
    }
});


themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('pomodorotheme', isDark ? 'dark' : 'light');
});

function createLine(type = 'normal') {
    const div = document.createElement('div');
    div.classList.add('line');
    if (type === 'small') div.classList.add('small');
    return div;
}

for (let i = 0; i < totalLines; i++) {
    const type = lineTypes[i % lineTypes.length];
    track.appendChild(createLine(type));
}


function tick() {
    tickSound.currentTime = 0;
    tickSound.play();

    track.removeChild(track.children[0]);
    const type = lineTypes[lineIndex % lineTypes.length];
    track.appendChild(createLine(type));
    lineIndex++;

    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    void track.offsetWidth;

    track.style.transition = "transform 0.3s ease";

    pomodoro_time--;
    document.getElementById("time").innerHTML = Math.floor(pomodoro_time / 60).toString().padStart(2, '0') + ":" +
        (pomodoro_time % 60).toString().padStart(2, '0');


    if (pomodoro_time == 0) {
        clearInterval(pomodoro);
        startBtn.removeAttribute("disabled");
        startBtn.innerHTML = "Start";
        document.getElementById("time").innerHTML = "25:00";

        chimeSound.currentTime = 0;
        chimeSound.play();
    }
}

function startTimer() {
    pomodoro = setInterval(tick, 1000);
    startBtn.setAttribute("disabled", "");
    startBtn.innerHTML = "Running";
}
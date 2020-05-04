const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const MANTRAS_IN_ROUND = 108;
const WORDS_IN_MANTRA = 16;
const HARE = "Hare";
const KRISHNA = "Krishna";
const RAMA = "Rama";

const mahaMantra = [
  HARE,
  KRISHNA,
  HARE,
  KRISHNA,
  KRISHNA,
  KRISHNA,
  HARE,
  HARE,
  HARE,
  RAMA,
  HARE,
  RAMA,
  RAMA,
  RAMA,
  HARE,
  HARE,
];

let timeForRoundInMin = 7;
let timeForRoundInSec = timeForRoundInMin * SECONDS_IN_MINUTE;
let timeForMantraInSec = timeForRoundInSec / MANTRAS_IN_ROUND;
let timeForWordInSec = timeForMantraInSec / WORDS_IN_MANTRA;

let currentWordIndex = 0;

const container = document.getElementById("row-container");
const rowLength = 2;

function renderWord(word) {
  if (!container) {
    return;
  }
  if (currentWordIndex % rowLength === 0) {
    return container.innerText = word;
  }
  return container.innerText = container.innerText + " " + word;
}

function showNextWord() {
  if (currentWordIndex === 16) {
    currentWordIndex = 0;
  }

  const currentWord = mahaMantra[currentWordIndex];
  renderWord(currentWord);

  currentWordIndex += 1;
}

let intervalId;

function start() {
  if (intervalId) {
    return;
  }
  const timeForWordInMS = timeForWordInSec * MILLISECONDS_IN_SECOND;
  intervalId = setInterval(function () {
    showNextWord();
  }, timeForWordInMS);
}

function stop() {
  if (!intervalId) {
    return;
  }

  clearInterval(intervalId);
  intervalId = null;
}

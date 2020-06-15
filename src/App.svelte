<script>
  import { onDestroy } from 'svelte';
  import praiseImg1 from './images/praise/1.png';
  import praiseImg2 from './images/praise/2.png';
  import praiseImg3 from './images/praise/3.png';
  import praiseImg4 from './images/praise/4.png';
  import praiseImg5 from './images/praise/5.png';
  import praiseImg6 from './images/praise/6.png';
  import praiseImg7 from './images/praise/7.png';
  import praiseImg8 from './images/praise/8.png';
  import praiseImg9 from './images/praise/9.png';
  import praiseImg10 from './images/praise/10.png';
  import praiseImg11 from './images/praise/11.png';
  import praiseImg12 from './images/praise/12.png';

  const HARE = 'Харе';
  const KRISHNA = 'Кришна';
  const RAMA = 'Рама';

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

  const MANTRAS_IN_ROUND = 108;
  const SECONDS_IN_MINUTE = 60;
  const WORDS_IN_MANTRA = 16;
  const LETTERS_IN_MANTRA = mahaMantra.reduce(
    (acc, word) => acc + word.length,
    0,
  );

  const states = {
    inactive: 'inactive',
    started: 'started',
    paused: 'paused',
    finished: 'finished',
  };

  let tratakaState = states.inactive;
  // $: console.log(tratakaState);

  $: started = tratakaState === states.started;
  $: paused = tratakaState === states.paused;
  $: inactive = tratakaState === states.inactive;
  $: finished = tratakaState === states.finished;

  $: mantraWords = inactive ? mahaMantra : [];

  let letterCounter = 0;
  let wordCounter = 0;

  function addWord() {
    mantraWords = [...mantraWords, mahaMantra[wordCounter]];
  }

  function handleLetterTick() {
    if (letterCounter === 0) {
      addWord();
    }
    letterCounter += 1;
  }

  let mainIntervalId;

  let rounds = 1;
  let minutesForRound = 6;

  function start() {
    tratakaState = states.started;

    const secondsForRound = minutesForRound * SECONDS_IN_MINUTE;
    const secondsForMantra = secondsForRound / MANTRAS_IN_ROUND;
    // const secondsForWord = secondsForMantra / WORDS_IN_MANTRA;
    const secondForLetter = secondsForMantra / LETTERS_IN_MANTRA;
    // const msForWord = secondsForWord * 1000;
    const msForLetter = secondForLetter * 1000;

    mainIntervalId = setInterval(handleLetterTick, msForLetter);
  }

  function finish() {
    tratakaState = states.finished;
    clearInterval(mainIntervalId);
    mainIntervalId = null;
  }

  let mantraCounter = 0;
  let roundCounter = 0;

  function handleCounters() {
    const wordEnd = letterCounter === mahaMantra[wordCounter].length;
    if (wordEnd) {
      letterCounter = 0;
      wordCounter += 1;
    }
    const mantraEnd = wordCounter === WORDS_IN_MANTRA;
    if (mantraEnd) {
      mantraWords = [];
      wordCounter = 0;
      mantraCounter += 1;
    }
    const roundEnd = mantraCounter === MANTRAS_IN_ROUND;
    if (roundEnd) {
      mantraCounter = 0;
      roundCounter += 1;
    }
  }

  $: {
    handleCounters(letterCounter, wordCounter, mantraCounter);
    if (roundCounter && roundCounter === rounds) {
      finish();
      tratakaState = states.finished;
    }
  }

  function pause() {
    tratakaState = states.paused;
    clearInterval(mainIntervalId);
    mainIntervalId = null;
  }

  function reset() {
    tratakaState = states.inactive;
    clearInterval(mainIntervalId);
    mainIntervalId = null;
    wordCounter = 0;
    mantraCounter = 0;
    roundCounter = 0;
  }

  onDestroy(() => {
    reset();
  });

  const rowLength = 2;
  function isRowEnd(wordInd) {
    const wordNum = wordInd + 1;
    return wordNum % rowLength === 0;
  }

  function getRandomInt(min, max) {
    const ceiledMin = Math.ceil(min);
    const flooredMax = Math.floor(max);

    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (flooredMax - ceiledMin)) + ceiledMin;
  }

  const praiseImageList = [
    praiseImg1,
    praiseImg2,
    praiseImg3,
    praiseImg4,
    praiseImg5,
    praiseImg6,
    praiseImg7,
    praiseImg8,
    praiseImg9,
    praiseImg10,
    praiseImg11,
    praiseImg12,
  ];
  const praiseImg = praiseImageList[getRandomInt(0, praiseImageList.length)];

  const startButtonName = 'Старт';
  const resetButtonName = 'Сброс';
  const pauseButtonName = 'Пауза';
  const roundsInputLabel = 'Количество кругов';
  const timeForRoundInputLabel = 'Время на один круг';
  const minutes = 'минут';
  const roundsLabel = 'Круги';
  const mantrasLabel = 'Мантры';
  // let wordsLabel = "Слова";
</script>

<style>
  .main {
    height: 100%;
    max-height: 550px;
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .counters {
    display: flex;
    justify-content: flex-end;
  }

  .counter {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    margin-right: 10px;
  }

  .counter:last-child {
    margin-right: 0;
  }

  .counter-number {
    font-weight: bold;
  }

  .mantra-box {
    flex: 1;
    width: 100%;
    height: 100%;
    margin: 40px 0;
  }

  .mantra-card {
    color: hsla(0, 53%, 53%, 1);
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
  }

  @media (min-width: 360px) {
    .mantra-card {
      padding-left: 38px;
    }
  }

  @media (min-width: 425px) {
    .mantra-card {
      padding-left: 58px;
    }
  }

  .praise-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .praise-image {
    margin-top: 1em;
  }

  .settings {
    margin-bottom: 20px;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .action-button {
    cursor: pointer;
    padding: 10px 15px;
    margin-right: 1em;
    border-radius: 6px;
  }

  .action-button:hover {
    border-color: #333;
  }

  .action-button:last-child {
    margin-right: 0;
  }

  .numeric-input {
    width: 50px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #333;
    text-align: center;
    background-color: inherit;
  }

  .numeric-input:focus {
    border-color: #171717;
  }
</style>

<main class="main">
  <div class="counters">
    <div class="counter">
      {roundsLabel}:
      <span class="counter-number">{roundCounter}</span>
    </div>
    <div class="counter">
      {mantrasLabel}:
      <span class="counter-number">{mantraCounter}</span>
    </div>
    <!-- <div class="counter">{wordsLabel}: <span class="counter-number">{wordCounter}</span></div> -->
  </div>

  <section class="mantra-box">
    {#if finished}
      <div class="praise-box">
        <span class="praise-text">Ура! Все круги прочитаны!</span>
        <img
          class="praise-image"
          src={praiseImg}
          alt="Вы молодец!"
          width="300"
          height="300" />
      </div>
    {:else}
      <div class="mantra-card">
        {#each mantraWords as word, i}
          {word}
          {#if isRowEnd(i)}
            <br />
          {/if}
        {/each}
      </div>
    {/if}
  </section>

  {#if paused || inactive}
    <div class="settings">
      <form>
        <label for="rounds">
          {roundsInputLabel}:
          <input
            class="numeric-input"
            id="rounds"
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
            bind:value={rounds}
            min="1" />
        </label>
        <label for="timeForRound">
          {timeForRoundInputLabel}:
          <input
            class="numeric-input"
            id="timeForRound"
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
            bind:value={minutesForRound}
            min="1" />
          {minutes}
        </label>
      </form>
    </div>
  {/if}

  <div class="actions">
    {#if paused || finished}
      <button class="action-button" type="button" on:click={reset}>
        {resetButtonName}
      </button>
    {/if}
    {#if started}
      <button class="action-button" type="button" on:click={pause}>
        {pauseButtonName}
      </button>
    {/if}
    {#if inactive || paused}
      <button class="action-button" type="button" on:click={start}>
        {startButtonName}
      </button>
    {/if}
  </div>
</main>

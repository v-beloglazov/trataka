<script>
  import { onDestroy } from 'svelte';

  import Play from './icons/Play.svelte';
  import Pause from './icons/Pause.svelte';
  import Reset from './icons/Reset.svelte';
  import Timer from './icons/Timer.svelte';

  import { tratakaState } from './stores';
import Praise from './Praise.svelte';

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

  let letterCounter = 0;
  let wordCounter = 0;
  let mantraCounter = 107;
  let roundCounter = 0;

  let rounds = 1;
  let minutesForRound = 10;

  function handleCounters() {
    const wordEnd = letterCounter === mahaMantra[wordCounter].length;
    if (wordEnd) {
      letterCounter = 0;
      wordCounter += 1;
    }
    const mantraEnd = wordCounter === WORDS_IN_MANTRA;
    if (mantraEnd) {
      hideMantra();
      wordCounter = 0;
      mantraCounter += 1;
    }
    const roundEnd = mantraCounter === MANTRAS_IN_ROUND;
    if (roundEnd) {
      mantraCounter = 0;
      roundCounter += 1;
    }

    if (roundCounter && roundCounter === rounds) {
      finish();
    }
  }

  $: handleCounters(letterCounter, wordCounter, mantraCounter, roundCounter);

  function hideWord(ind) {
    const wordElement = document.querySelector(`#hn-${ind}`);
    wordElement.classList.add('hidden');
  }

  function showWord(ind) {
    const wordElement = document.querySelector(`#hn-${ind}`);
    wordElement.classList.remove('hidden');
  }

  function hideMantra() {
    mahaMantra.forEach((_, ind) => hideWord(ind));
  }

  function showMantra() {
    mahaMantra.forEach((_, ind) => showWord(ind));
  }

  let inactive = false;
  let started = false;
  let finished = false;
  let paused = false;

  tratakaState.subscribe((state) => {
    switch (state) {
      case tratakaState.inactive:
        inactive = true;
        started = false;
        finished = false;
        paused = false;
        break;
      case tratakaState.started:
        started = true;
        inactive = false;
        finished = false;
        paused = false;
        break;
      case tratakaState.finished:
        finished = true;
        inactive = false;
        started = false;
        paused = false;
        break;
      case tratakaState.paused:
        paused = true;
        started = false;
        finished = false;
        inactive = false;
        break;
      default:
        break;
    }
  });

  function handleLetterTick() {
    if (letterCounter === 0) {
      showWord(wordCounter);
    }
    letterCounter += 1;
  }

  let mainIntervalId;
  function start() {
    if (inactive) {
      hideMantra();
    }

    tratakaState.start();

    const secondsForRound = minutesForRound * SECONDS_IN_MINUTE;
    const secondsForMantra = secondsForRound / MANTRAS_IN_ROUND;
    // const secondsForWord = secondsForMantra / WORDS_IN_MANTRA;
    const secondForLetter = secondsForMantra / LETTERS_IN_MANTRA;
    // const msForWord = secondsForWord * 1000;
    const msForLetter = secondForLetter * 1000;

    mainIntervalId = setInterval(handleLetterTick, msForLetter);
  }

  function finish() {
    tratakaState.finish();
    clearInterval(mainIntervalId);
    mainIntervalId = null;
  }

  function pause() {
    tratakaState.pause();
    clearInterval(mainIntervalId);
    mainIntervalId = null;
  }

  function reset() {
    if (paused) {
      showMantra();
    }
    tratakaState.reset();
    clearInterval(mainIntervalId);
    mainIntervalId = null;

    letterCounter = 0;
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

  const startButtonName = 'Старт';
  const resetButtonName = 'Сброс';
  const pauseButtonName = 'Пауза';
  const roundsInputLabel = 'Кругов';
  const timeForRoundInputLabel = 'Время круга';
  const minutes = 'минут';
  const roundsLabel = 'Круги';
  const mantrasLabel = 'Мантры';
  // let wordsLabel = "Слова";
</script>

<style>
  .main {
    padding: 8px 0;
    height: 540px;
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .counters {
    display: flex;
    justify-content: flex-end;
    margin-right: 8px;
  }

  .counter {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    margin-right: 10px;
    color: var(--secondary-text);
  }

  .counter:last-child {
    margin-right: 0;
  }

  .mantra-box {
    display: flex;
    justify-content: center;
    text-align: center;
    flex: 1;
    width: 100%;
    height: 100%;
    margin: 40px 0;
  }

  .mantra-card {
    font-size: 2em;
    font-weight: 500;
  }

  /* @media (min-width: 360px) {
    .mantra-card {
      padding-left: 38px;
    }
  }

  @media (min-width: 425px) {
    .mantra-card {
      padding-left: 58px;
    }
  } */

  .holy-name {
    transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  :global(.hidden) {
    opacity: 0;
  }

  .settings {
    margin-bottom: 24px;
  }

  .settings-form {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .setting-field {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .setting-field:last-child {
    margin-bottom: 0;
  }

  .numeric-input {
    margin: 0 6px;
    min-width: 40px;
    max-width: 50px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #000000;
    text-align: center;
    background-color: inherit;
    font-weight: 500;
    font-size: 1.1em;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .action-button {
    padding: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
  }

  .action-button:last-child {
    margin-right: 0;
  }

  :global(.action-button-icon) {
    width: 48px;
    height: 48px;
    border-radius: 5px;
  }

  :global(.action-button-icon--reset) {
    width: 36px;
    height: 36px;
  }
</style>

<main class="main">
  {#if !inactive}
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
  {/if}

  <section class="mantra-box">
    {#if finished}
      <Praise />
    {:else}
      <div class="mantra-card">
        {#each mahaMantra as word, i (i)}
          <span id={`hn-${i}`} class="holy-name">{word}</span>
          {#if isRowEnd(i)}
            <br />
          {/if}
        {/each}
      </div>
    {/if}
  </section>

  {#if paused || inactive}
    <div class="settings">
      <form class="settings-form">
        <label class="setting-field" for="rounds">
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
        <label class="setting-field" for="timeForRound">
          <span title={timeForRoundInputLabel}>
            <Timer width="30px" height="30px" />
          </span>
          :
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
      <button
        class="action-button"
        type="button"
        on:click={reset}
        title={resetButtonName}>
        <span>
          <Reset />
        </span>
      </button>
    {/if}
    {#if started}
      <button
        class="action-button"
        type="button"
        on:click={pause}
        title={pauseButtonName}>
        <span>
          <Pause />
        </span>
      </button>
    {/if}
    {#if inactive || paused}
      <button
        class="action-button"
        type="button"
        on:click={start}
        title={startButtonName}>
        <span>
          <Play />
        </span>
      </button>
    {/if}
  </div>
</main>

<script>
  import { onDestroy } from "svelte";

  const HARE = "Харе";
  const KRISHNA = "Кришна";
  const RAMA = "Рама";

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
    HARE
  ];

  const MANTRAS_IN_ROUND = 108;
  const WORDS_IN_MANTRA = 16;
  const SECONDS_IN_MINUTE = 60;

  const states = {
    inactive: "inactive",
    started: "started",
    paused: "paused",
    finished: "finished"
  };

  let tratakaState = states.inactive;
  $: console.log(tratakaState)

  $: started = tratakaState === states.started;
  $: paused = tratakaState === states.paused;
  $: inactive = tratakaState === states.inactive;
  $: finished = tratakaState === states.finished;

  let wordCounter = 0;
  let mantraCounter = 0;
  let roundCounter = 0;

  function handleCounters() {
    if (wordCounter - WORDS_IN_MANTRA === 1) {
      mantraWords = [];
      wordCounter = 0;
      mantraCounter = mantraCounter + 1;
    }

    if (mantraCounter === MANTRAS_IN_ROUND) {
      mantraCounter = 0;
      roundCounter = roundCounter + 1;
    }
  }

  $: {
    handleCounters(wordCounter, mantraCounter, roundCounter)
    if (roundCounter === rounds) {
      finish()
      tratakaState = states.finished
      }
  };

  $: mantraWords = inactive ? mahaMantra : [];

  function addWord() {
    mantraWords = [...mantraWords, mahaMantra[wordCounter]];
    wordCounter = wordCounter + 1;
  }

  let mainIntervalId;

  let rounds = 1;
  let minutesForRound = 6;

  function start() {
    tratakaState = states.started;

    const secondsForRound = minutesForRound * SECONDS_IN_MINUTE;
    const secondsForMantra = secondsForRound / MANTRAS_IN_ROUND;
    const secondsForWord = secondsForMantra / WORDS_IN_MANTRA;
    const msForWord = secondsForWord * 1000;

    mainIntervalId = setInterval(addWord, msForWord);
  }

  function finish() {
    tratakaState = states.finished;
    clearInterval(mainIntervalId);
    mainIntervalId = null;
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

  let rowLength = 2;
  function isRowEnd(wordInd) {
    const wordNum = wordInd + 1;
    return wordNum % rowLength === 0;
  }

  let startButtonName = "Старт";
  let resetButtonName = "Сброс";
  let pauseButtonName = "Пауза";
  let roundsInputLabel = "Количество кругов";
  let timeForRoundInputLabel = "Время на один круг";
  let minutes = "минут";
  let roundsLabel = "Круги";
  let mantrasLabel = "Мантры";
  let wordsLabel = "Слова";
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
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
    margin-right: 10px;
  }

  .counter:last-child {
    margin-right: 0;
  }

  .mantra-box {
    flex: 1;
    width: 100%;
    height: 100%;
    margin: 40px 0;
  }

  .mantra-card {
    color: indianred;
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .action-button {
    cursor: pointer;
    padding: 10px 15px;
    margin-right: 1em;
    border-radius: 6px;
    background-color: aliceblue;
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
    border-bottom: 1px solid #ccc;
    text-align: center;
    background-color: inherit;
  }

  .numeric-input:focus {
    border-color: #333;
  }
</style>

<main class="main">
  <div class="counters">
    <div class="counter">{roundsLabel}: {roundCounter}</div>
    <div class="counter">{mantrasLabel}: {mantraCounter}</div>
    <!-- <div class="counter">{wordsLabel}: {wordCounter}</div> -->
  </div>

  <section class="mantra-box">
    {#if finished}
      <div class="congratulations">Ура! Все круги прочитаны! Молодец!</div>
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

  {#if paused || inactive}
  <div class="settings">
    <form>
      <label for="rounds">
        {roundsInputLabel}:
        <input
          class="numeric-input"
          id="rounds"
          type="text"
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
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          bind:value={minutesForRound} />
        {minutes}
      </label>
    </form>
  </div>
  {/if}
</main>

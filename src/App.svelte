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

  let dynamicTratakaState = "inactive";

  $: started = dynamicTratakaState === "started";
  $: inactive = dynamicTratakaState === "inactive";

  $: mantraWords = inactive ? mahaMantra : [];

  let wordCounter = 0;

  function addWord() {
    const mantraEnd = wordCounter && wordCounter % WORDS_IN_MANTRA === 0;
    if (mantraEnd) {
      mantraWords = [];
      wordCounter = 0;
      mantraCounter += 1;
    }
    mantraWords = [...mantraWords, mahaMantra[wordCounter]];
    wordCounter += 1;
  }

  let mainIntervalId;

  let rounds = 1;
  let minutesForRound = 6;

  function start() {
    dynamicTratakaState = "started";

    const secondsForRound = minutesForRound * SECONDS_IN_MINUTE;
    const secondsForMantra = secondsForRound / MANTRAS_IN_ROUND;
    const secondsForWord = secondsForMantra / WORDS_IN_MANTRA;
    const msForWord = secondsForWord * 1000;

    mainIntervalId = setInterval(addWord, msForWord);
  }

  function pause() {
    dynamicTratakaState = "paused";
    clearInterval(mainIntervalId);
    mainIntervalId = null;
  }

  function reset() {
    pause();
    dynamicTratakaState = "inactive";
    mantraWords = [];
    wordCounter = 0;
    mantraCounter = 0;
    roundCounter = 0;
  }

  onDestroy(() => {
    reset();
  });

  let mantraCounter = 0;
  let roundCounter = 0;

  $: if (mantraCounter && mantraCounter % MANTRAS_IN_ROUND === 0) {
    mantraCounter = 0;
    roundCounter += 1;
  }
  $: if (roundCounter === rounds) pause();

  const rowLength = 2;
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
</script>

<style>
  .main {
    height: 100%;
    max-width: 400px;
    margin: auto;
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
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 30px;
  }

  .mantra-card {
    /* min-width: 250px; */
    /* min-height: 210px; */
    height: 100%;
    width: 100%;
    color: indianred;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 1.4em;
    text-align: center;
  }

  @media (min-width: 425px) {
    .mantra-card {
      /* min-height: 260px; */
      font-size: 1.7em;
    }
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
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
  </div>

  <div>

    <section class="mantra-box">
      <div class="mantra-card">
        {#each mantraWords as word, i}
          {word}
          {#if isRowEnd(i)}
            <br />
          {/if}
        {/each}
      </div>
    </section>

    <div class="actions">
      {#if started}
        <button class="action-button" type="button" on:click={reset}>
          {resetButtonName}
        </button>
        <button class="action-button" type="button" on:click={pause}>
          {pauseButtonName}
        </button>
      {:else}
        <button class="action-button" type="button" on:click={start}>
          {startButtonName}
        </button>
      {/if}
    </div>
  </div>

  {#if !started}
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

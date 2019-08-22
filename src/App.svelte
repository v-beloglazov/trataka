<script>
  import { afterUpdate, tick, beforeUpdate, onDestroy, onMount } from "svelte";

  import {
    isKrishnaOrder,
    isMantraEnd,
    isRamaOrder,
    isStrEnd
  } from "./predicates";
  import {
    SECONDS_IN_MINUTE,
    MANTRAS_IN_ROUND,
    WORDS_IN_MANTRA
  } from "./constants";
  import HolyName from "./HolyName.svelte";

  let rounds = 16;
  let timeForRoundInMin = 6;

  $: timeForRoundInSec = timeForRoundInMin * SECONDS_IN_MINUTE;
  $: timeForMantra = timeForRoundInSec / MANTRAS_IN_ROUND;
  $: wordsDelay = timeForMantra / WORDS_IN_MANTRA;

  let words = [];

  let mainIntervalId;
  let roundCounter = 0;
  let mantraCounter = 0;
  let wordCounter = 0;

  $: if (mantraCounter && mantraCounter % 108 === 0) {
    mantraCounter = 0;
    roundCounter += 1;
  }

  $: if (roundCounter === rounds) finish();

  function addWord() {
    if (wordCounter && wordCounter % 16 === 0) {
      clearScreen();
      wordCounter = 0;
      mantraCounter += 1;
    }
    words = [...words, 0];
    wordCounter += 1;
  }

  function clearScreen() {
    words = [];
  }

  function start() {
    if (mainIntervalId) return;

    mainIntervalId = setInterval(addWord, wordsDelay * 1000);
  }

  function finish() {
    if (!mainIntervalId) return;

    clearInterval(mainIntervalId);
    mainIntervalId = null;
    roundCounter = 0;
  }

  onDestroy(() => {
    finish();
  });

  function handleKeydown(event) {
    switch (event.code) {
      case "KeyF":
        finish();
        break;
      case "KeyS":
        start();
        break;
      default:
        return;
    }
  }
</script>

<svelte:body on:keydown={handleKeydown} />
<main>
  <div>Rounds: {roundCounter}</div>
  <div>Mantras: {mantraCounter}</div>

  <label for="rounds">
    Number of rounds
    <input id="rounds" type="number" bind:value={rounds} min="1" />
  </label>

  <label for="timeForRound">
    Time for one round in minutes
    <input id="timeForRound" type="number" bind:value={timeForRoundInMin} />
  </label>

  <button type="button" on:click={start}>Start</button>
  <button type="button" on:click={finish}>Finish</button>
  <br>
  {#each words as delay, i}
    {#if isKrishnaOrder(i)}
      <HolyName name="Krishna" />
    {:else if isRamaOrder(i)}
      <HolyName name="Rama" />
    {:else}
      <HolyName name="Hare" />
    {/if}
    {#if isStrEnd(i)}
      <br />
    {/if}
  {/each}
</main>

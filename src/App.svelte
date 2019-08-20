<script>
  import { afterUpdate, tick, beforeUpdate, onDestroy, onMount } from "svelte";

  import {
    isKrishnaOrder,
    isMantraEnd,
    isRamaOrder,
    isStrEnd
  } from "./predicates.js";
  import HolyName from "./HolyName.svelte";

  let rounds = 16;
  let timeForRound = 7 * 60;
  let mantrasInRound = 108;
  let timeForMantra = timeForRound / mantrasInRound;
  let wordsInMantra = 16;
  let wordsDelay = timeForMantra / wordsInMantra;
  let words = [];

  let mainIntervalId;
  let timer = 0;
  let roundCounter = 0;
  let mantraCounter = 0;
  let wordCounter = 0;
  // function timerTick() {
  //   timer = timer + 1;
  //   // timer = new Date().toLocaleTimeString();
  // }
  // const intervalId = setInterval(timerTick, 1000);

  function addWord() {
    if (wordCounter && wordCounter % 16 === 0) {
      clearScreen();
      mantraCounter += 1;
    }
    if (mantraCounter && mantraCounter % 108 === 0) {
      roundCounter += 1;
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
  }
  onMount(() => {
    start();
  });
  onDestroy(() => {
    clearInterval(mainIntervalId);
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

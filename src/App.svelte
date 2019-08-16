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
  let roundsCounter = 0;
  let timeForRound = 7 * 60;
  let mantrasInRound = 108;
  let timeForMantra = timeForRound / mantrasInRound;
  let wordsInMantra = 16;
  let wordsInterval = timeForMantra / wordsInMantra;
  let delays = [];

  let mainIntervalId;
  let timer = 0;
  let wordCounter = 0;
  // function timerTick() {
  //   timer = timer + 1;
  //   // timer = new Date().toLocaleTimeString();
  // }
  // const intervalId = setInterval(timerTick, 1000);

  function addWord() {
    if (wordCounter && wordCounter % 16 === 0) {
      clearScreen();
    }
    delays = [...delays, 0];
    wordCounter += 1;
  }
  function clearScreen() {
    delays = [];
  }
  function start() {
    mainIntervalId = setInterval(addWord, wordsInterval * 1000);
  }
  onMount(() => {
    start();
  });
  onDestroy(() => {
    clearInterval(mainIntervalId);
  });
  function handleKeydown(event) {
    console.log(event);
    switch (event.code) {
      case "KeyF":
        clearInterval(mainIntervalId);
        break;
      case "KeyS":
        start();
      default:
        return;
    }
  }
</script>

<svelte:body on:keydown={handleKeydown} />
<main>
  <!-- <div>{timer}</div> -->
  {#each delays as delay, i}
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

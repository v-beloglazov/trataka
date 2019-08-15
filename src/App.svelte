<script>
  import _ from "lodash";
  import { afterUpdate, tick, beforeUpdate, onDestroy } from "svelte";
  import Hare from "./Hare.svelte";
  import Krishna from "./Krishna.svelte";
  import Rama from "./Rama.svelte";
  let timer = 0;
  // function timerTick() {
  //   timer = timer + 1;
  //   // timer = new Date().toLocaleTimeString();
  // }
  // const intervalId = setInterval(timerTick, 1000);
  const ordersForKrishna = [1, 3, 4, 5];
  function isKrishnaOrder(ind) {
    return ordersForKrishna.includes(ind);
  }
  const ordersForRama = [9, 11, 12, 13];
  function isRamaOrder(ind) {
    return ordersForRama.includes(ind);
  }
  const ends = _.range(1, 16, 2);
  function isStrEnd(ind) {
    return ends.includes(ind);
  }
  function isMantraEnd(wordNum) {
    if (wordNum % 16 === 0) {
      return true;
    }
    return false;
  }
  let wordCounter = 0;
  let rounds = 16;
  let roundsCounter = 0;
  let timeForRound = 7 * 60;
  let timeForOne = timeForRound / 108;
  let delayStep = timeForOne / 16;
  // let delays = _.range(0, timeForOne, delayStep);
  let delays = [];
  let wordIntervalId = setInterval(async () => {
    // await tick();
    if (wordCounter && wordCounter % 16 === 0) {
      delays = []
      // clearInterval(wordIntervalId);
      // return;
    }
    delays = [...delays, 0];
    wordCounter += 1;
  }, delayStep * 1000);
  function clearScreen() {
    delays = [];
  }
  // afterUpdate(async () => {
  //   await tick();
  //   // if (isMantraEnd(wordCounter)) {
  //   //   clearScreen()
  //   // }
  // });
  onDestroy(() => {
    clearInterval(wordIntervalId);
  });
</script>

<main>
  <!-- <div>{timer}</div> -->
  {#each delays as delay, i}
    {#if isKrishnaOrder(i)}
      <Krishna {delay} />
    {:else if isRamaOrder(i)}
      <Rama {delay} />
    {:else}
      <Hare {delay} />
    {/if}
    {#if isStrEnd(i)}
      <br />
    {/if}
  {/each}
</main>

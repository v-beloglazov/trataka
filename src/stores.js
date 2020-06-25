import { writable } from 'svelte/store';

export const STATE = {
  inactive: 'inactive',
  started: 'started',
  paused: 'paused',
  finished: 'finished',
};

function createTratakaState() {
  const { subscribe, set } = writable(STATE.inactive);

  return {
    subscribe,
    start: () => set(STATE.started),
    pause: () => set(STATE.paused),
    finish: () => set(STATE.finished),
    reset: () => set(STATE.inactive),
    started: STATE.started,
    paused: STATE.paused,
    finished: STATE.finished,
    inactive: STATE.inactive,
  };
}

export const tratakaState = createTratakaState();

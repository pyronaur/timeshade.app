const callbackFactory = () => {
    let storage = [];
  
    return {
      add: (cb) => storage.push(cb),
      run: function () {
        // @TODO: Make this async and explain why
        storage.forEach((cb) => cb(...arguments));
      },
    };
  };
  
  const timerFactory = (startingValue, ticker) => {
    let seconds = startingValue
    let intervalID = false;
    let callbacks = {
      onStart: callbackFactory(),
      onStop: callbackFactory(),
      onTick: callbackFactory(),
      onDone: callbackFactory(),
    };
  
    const active = () => false !== intervalID;
    const toggle = () => (active() ? stop() : start());
    const tick = () => {
      seconds = ticker(seconds)
      callbacks.onTick.run();
      if (seconds === 0) {
        done();
      }
    };
  
    const start = () => {
      intervalID = setInterval(tick, 1000);
      callbacks.onStart.run();
    };
  
    const stop = () => {
      clearInterval(intervalID);
      intervalID = false;
      callbacks.onStop.run();
    };
  
    const clear = () => {
      stop();
      seconds = startingValue;
    };
  
    const done = () => {
      clear();
      callbacks.onDone.run();
    };

    const getCurrentSeconds = () => seconds
  
    return {
      start,
      stop,
      toggle,
      active,
      callbacks,
      clear,
      getCurrentSeconds,
    };
  };
  

const increment = (v) => ++v
const decrement = (v) => --v
const createStopwatch = (startingValue = 0) => timerFactory( startingValue, increment )
const createTimer = (startingValue = 60 * 25) => timerFactory( startingValue, decrement )

export {
  createStopwatch,
  createTimer
}
  
  
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
  
  const timerFactory = (startingValue, ticker, resetValue) => {
    let seconds = startingValue
    let intervalID = false;
    let callbacks = {
      onStart: callbackFactory(),
      onStop: callbackFactory(),
      onTick: callbackFactory(),
      onDone: callbackFactory(),
    };
  
    const isActive = () => false !== intervalID;
    const toggle = () => (isActive() ? stop() : start());
    const tick = () => {
      seconds = ticker(seconds)
      callbacks.onTick.run(seconds);
      if (seconds === 0) {
        done();
      }
    };
  
    const start = () => {
      
      if( isActive() ) {
        return;
      }

      intervalID = setInterval(tick, 1000);
      callbacks.onStart.run(seconds);
    };
  
    const stop = () => {

      if( ! isActive() ) {
        return;
      }

      clearInterval(intervalID);
      intervalID = false;
      callbacks.onStop.run(seconds);
    };
  
    const reset = () => {
      stop();
      seconds = resetValue;
      callbacks.onTick.run(seconds)
    };
  
    const done = () => {
      reset();
      callbacks.onDone.run(seconds);
    };

    const getCurrentSeconds = () => seconds
  
    return {
      start,
      stop,
      toggle,
      isActive,
      callbacks,
      reset,
      getCurrentSeconds,
    };
  };
  

const increment = (v) => ++v
const decrement = (v) => --v
const createStopwatch = (startingValue = 0) => timerFactory( startingValue, increment, 0 )
const createTimer = (startingValue = 60 * 25, resetValue = 60 * 25) => timerFactory( startingValue, decrement, resetValue )

export {
  createStopwatch,
  createTimer
}
  
  
const setupCallbacks = () => {
    let storage = [];
  
    return {
      add: (cb) => storage.push(cb),
      run: function () {
        // @TODO: Make this async and explain why
        storage.forEach((cb) => cb(...arguments));
      },
    };
  };
  
  const createTimer = (time = 25 * 60) => {
    let defaultTime = time;
    let intervalID = false;
    let callbacks = {
      onStart: setupCallbacks(),
      onStop: setupCallbacks(),
      onTick: setupCallbacks(),
      onDone: setupCallbacks(),
    };
  
    const active = () => false !== intervalID;
    const toggle = () => (active() ? stop() : start());
    const tick = () => {
      --time;
      callbacks.onTick.run(time);
      if (time === 0) {
        done();
      }
    };
  
    const start = () => {
      intervalID = setInterval(tick, 100);
      callbacks.onStart.run();
    };
  
    const stop = () => {
      clearInterval(intervalID);
      intervalID = false;
      callbacks.onStop.run();
    };
  
    const clear = () => {
      stop();
      time = defaultTime;
    };
  
    const done = () => {
      clear();
      callbacks.onDone.run();
    };
  
    return {
      start,
      stop,
      toggle,
      active,
      callbacks,
      clear,
    };
  };
  
  export default createTimer
  
  
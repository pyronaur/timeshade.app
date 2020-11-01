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
  
  const createTimer = (time = 25 * 60) => {
    let defaultTime = time;
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
      --time;
      callbacks.onTick.run();
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

    const getSecondsRemaining = () => time
  
    return {
      start,
      stop,
      toggle,
      active,
      callbacks,
      clear,
      getSecondsRemaining,
    };
  };
  
  export default createTimer
  
  
const $ = document.querySelector.bind(document);

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

const format_time = (time) => ("0" + time).slice(-2);
const timer = createTimer(10);

const startApp = () => {
  const $time = $("#time");
  const render = (time) => {
    let seconds = format_time(time % 60);
    let minutes = format_time(Math.floor(time / 60));
    $time.textContent = `${minutes}:${seconds}`;
  };

  timer.callbacks.onTick.add(render);
  $("#toggle").addEventListener("click", timer.toggle);
  render(10);
};

const startConsoleApp = () => {
  const consoleTimer = createTimer(3);
  consoleTimer.callbacks.onTick.add((time) => {
    console.log(time);
  });
  consoleTimer.callbacks.onStart.add(() => {
    console.log("Starting");
  });
  consoleTimer.callbacks.onDone.add(() => {
    console.log("Finito");
  });
  consoleTimer.start();
};

startApp();
startConsoleApp();

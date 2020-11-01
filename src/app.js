import createTimer from './timer'
const $ = document.querySelector.bind(document);

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

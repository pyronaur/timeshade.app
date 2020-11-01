import createTimer from "./timer";

const format_time = (time) => ("0" + time).slice(-2);
const timer = createTimer(10);

const startApp = () => {
  const $time = document.querySelector("#time");
  const $toggle = document.querySelector("#toggle");

  const render = (time) => {
    let seconds = format_time(time % 60);
    let minutes = format_time(Math.floor(time / 60));
    $time.textContent = `${minutes}:${seconds}`;
  };

  timer.callbacks.onTick.add(render);
  $toggle.addEventListener("click", timer.toggle);
  render(10);
};

startApp();

import {createTimer, createStopwatch} from "./timer";

const format_time = (time) => ("0" + time).slice(-2);





const counterUI = (selector, ticker) => {
  const $timer = document.querySelector(selector);
  const $time = $timer.querySelector('.time')
  const $toggle = $timer.querySelector('.toggle')
  


  const setToggleLabel = () => {
    $toggle.textContent = ( ticker.isActive() ? 'Stop' : 'Start')
  }

  const render = () => {
    let time = ticker.getCurrentSeconds()
    let seconds = format_time(time % 60);
    let minutes = format_time(Math.floor(time / 60));
    $time.textContent = `${minutes}:${seconds}`;
  }
  
  ticker.callbacks.onTick.add(render);
  ticker.callbacks.onDone.add(render);
  $toggle.addEventListener("click", () => {
    ticker.toggle()
    setToggleLabel($toggle, ticker.isActive())
  });


  ticker.callbacks.onStart.add(setToggleLabel)
  ticker.callbacks.onStop.add(setToggleLabel)  
  render();
}


const startApp = () => {
  const timer = createTimer(60)
  const stopwatch = createStopwatch(0)

  counterUI('.timer', timer)
  counterUI('.stopwatch', stopwatch)

  timer.callbacks.onStart.add( () => {
    stopwatch.start()
  })
  timer.callbacks.onStop.add( () => {
    stopwatch.stop()
  })
  timer.callbacks.onDone.add( () => {
    stopwatch.start()
  })
  stopwatch.callbacks.onStop.add( () => {
    timer.stop()
  })
}
startApp();

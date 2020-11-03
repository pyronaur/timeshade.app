import {createTimer, createStopwatch} from "./timer";

const format_time = (time) => ("0" + time).slice(-2);





const counterUI = (selector, ticker) => {
  const $timer = document.querySelector(selector);
  const $time = $timer.querySelector('.time')
  const $toggle = $timer.querySelector('.toggle')
  const $reset = $timer.querySelector('.reset')
  


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
  $reset.addEventListener("click", () => {
    ticker.reset()
  });


  ticker.callbacks.onStart.add(setToggleLabel)
  ticker.callbacks.onStop.add(setToggleLabel)  
  render();
}

const timeTracker = ( trackerName, defaultValue ) => {
  const key = `time_${trackerName}`
  return {
    save: (value) => localStorage.setItem(key, value),
    get: () => localStorage.getItem(key) || defaultValue
  }
}

const startApp = () => {
  
  const timerTracker = timeTracker('timer', 60 * 25)
  const timer = createTimer(timerTracker.get())
  timer.callbacks.onTick.add(timerTracker.save)
  timer.callbacks.onStop.add(timerTracker.save)
  timer.callbacks.onDone.add(timerTracker.save)
  
  const stopwatchTracker = timeTracker('stopwatch', 0)
  const stopwatch = createStopwatch(stopwatchTracker.get())
  stopwatch.callbacks.onTick.add(stopwatchTracker.save)
  stopwatch.callbacks.onStop.add(stopwatchTracker.save)
  stopwatch.callbacks.onDone.add(stopwatchTracker.save)
  
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

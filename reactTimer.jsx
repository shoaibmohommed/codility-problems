import React, { useEffect, useRef, useState, Fragment } from 'react';

function Solution() {
  const minutesRef = useRef();
  const secondsRef = useRef();
  const timerRef = useRef();
  const [timer, setTimer] = useState([0, 0])

  const intervalTimer = () => setInterval(() => {
    let min = timer[0];
    let sec = timer[1]
    if (sec > 0) {
      sec = sec - 1
    } else if (sec === 0) {
      if (min > 0) {
        min = min - 1
        sec = 60
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null
        return
      }
    }
    setTimer([min, sec])
  }, 1000)

  useEffect(() => {
    if (timerRef.current || (timer[0] === 0 && timer[1] === 0)) {
      return
    }
    timerRef.current = intervalTimer()
    return () => {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [timer])

  const onStart = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    let inputMin = minutesRef.current.value;
    let inputSec = secondsRef.current.value;

    inputMin = inputMin ? parseInt(inputMin) : 0
    inputSec = inputSec ? parseInt(inputSec) : 0
    if (inputSec > 60) {
      inputMin = inputMin + Math.floor(inputSec / 60)
      inputSec = inputSec % 60
    }
    setTimer([inputMin, inputSec])
  }
  const onPause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null
    } else {
      timerRef.current = intervalTimer()
    }
  }
  const onReset = () => {
    minutesRef.current.value = "0";
    secondsRef.current.value = "0";
    setTimer([0, 0])
  }

  const minutesStr = timer[0] < 10 ? `0${timer[0]}` : timer[0]
  const secondsStr = timer[1] < 10 ? `0${timer[1]}` : timer[1]
  console.log({ minutesStr, secondsStr })
  return (
    <Fragment>
      <label>
        <input ref={minutesRef} type="number" />
        Minutes
      </label>
      <label>
        <input ref={secondsRef} type="number" />
        Seconds
      </label>

      <button onClick={onStart}>START</button>
      <button onClick={onPause}>PAUSE / RESUME</button>
      <button onClick={onReset}>RESET</button>

      <h1 data-testid="running-clock">{`${minutesStr}:${secondsStr}`}</h1>
    </Fragment>
  );
}

export default Solution;

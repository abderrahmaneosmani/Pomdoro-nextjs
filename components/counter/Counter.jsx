import React, { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../contexts/CounterContex";

function Counter() {
  const { min, index, handleMin, sec, handleSec } = useContext(CounterContext);
  const [start, setStart] = useState(false);
  const [play, setPlay] = useState("Play");

  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        if (sec > 0) handleSec(sec - 1);
        if (sec === 0 && min > 0) {
          handleSec(59);
          handleMin(min - 1);
        }
        if (min === 0 && sec === 0) resetTimer();
      }, 1000);

      return () => clearInterval(interval);
    }
  });

  //start timer

  const startTimer = () => {
    if (play === "Play") setStart(true);
    setPlay("Pause");
    if (play === "Pause") {
      stopTimer();
      setPlay("Play");
    }
  };
  //stop timer
  const stopTimer = () => {
    setStart(false);
  };

  //reset timer
  const resetTimer = (index) => {
    setStart(false);
    handleMin(index);
    handleSec(0);
    setPlay("Play");
  };

  return (
    <div className="bg-transparent z-0">
      <div className="flex justify-center items-center m-2 text-white   shadow-sm opacity-90">
        <div className="text-9xl  sm:text-15xl font-mono text-center z-10  ">
          {min < 10 ? `0${min}` : min}
        </div>
        <div className="text-9xl  sm:text-15xl font-mono text-center z-10 ">
          :
        </div>
        <div className="text-9xl   sm:text-15xl  font-mono text-center z-10 ">
          {sec < 10 ? `0${sec}` : sec}
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap ">
        <div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-6"
            onClick={startTimer}
          >
            Play
          </button>
          <button
            onClick={() => resetTimer(index)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-6 my-6"
          >
            Rest
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-6 my-6">
            Deep Foucs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;

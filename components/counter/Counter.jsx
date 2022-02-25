import React, { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../contexts/CounterContext";
import { getRandomInt } from "../../utils/getRandom";
import MusicItems from "../music/MusicPlayer";
import Quote from "../quote/Quote";

const data = require("../../components/quote/quotes.json");

function Counter() {
  const labels = ["Lofi", "Deep Focus"];
  const urls = [
    "https://firebasestorage.googleapis.com/v0/b/portfolio-9a3ea.appspot.com/o/Music%2F5%20MINUTES%20OF%20(No%20Copyright%20Music)%20CHILL%20LOFI%20HIP%20HOP%20BEAT%20(Royalty%20free).mp3?alt=media&token=1184c5f7-cb42-4c74-88d8-4d314745c431",
    "https://firebasestorage.googleapis.com/v0/b/portfolio-9a3ea.appspot.com/o/Music%2F10%20Minutes%20Timer%20with%20Relaxing%20music%20to%20improve%20your%20Focus%20_%20relaxed.mp3?alt=media&token=5f1b592b-c5fe-4e47-abd9-246ae8f8d5d5",
  ];
  const randQuote = getRandomInt(100);
  const [quoteIndex, setQuoteIndex] = useState(randQuote);

  const { min, index, handleMin, sec, handleSec } = useContext(CounterContext);
  const [start, setStart] = useState(false);
  const [play, setPlay] = useState("Play");

  //get random quotes

  useEffect(() => {
    const timeQuotes = 1000 * 60 * 5;
    let interval;
    interval = setInterval(() => {
      setQuoteIndex(quoteIndex + 1);
    }, timeQuotes);
  });

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
    <div className="bg-transparent z-100">
      <div className="flex justify-center items-center m-2 text-white   shadow-sm opacity-90">
        <div className="countdown text-9xl  sm:text-15xl  text-center z-10  ">
          {min < 10 ? `0${min}` : min}
        </div>
        <div className="text-9xl  sm:text-15xl  text-center z-10 ">:</div>

        <div className="countdown   text-9xl   sm:text-15xl   text-center z-10 ">
          {sec < 10 ? `0${sec}` : sec}
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap ">
        <div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-6"
            onClick={startTimer}
          >
            {play}
          </button>
          <button
            onClick={() => resetTimer(index)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-6 my-6"
          >
            Rest
          </button>
          <MusicItems labels={labels} urls={urls} />
        </div>
      </div>

      <Quote data={data[quoteIndex]} />
    </div>
  );
}

export default Counter;

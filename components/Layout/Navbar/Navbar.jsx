/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Sidebar from "./Sidebar";
import { useContext } from "react";

import { CounterContext } from "../../../contexts/CounterContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(true);
  const { handleMin, handleIndex } = useContext(CounterContext);
  const valPomodoro = 25;
  const valShortBreak = 5;
  const valLongBreak = 15;

  const handlePomodoro = () => {
    handleMin(valPomodoro);
    handleIndex(valPomodoro);
  };
  const handleLongBreak = () => {
    handleMin(valLongBreak);
    handleIndex(valLongBreak);
  };

  const handleShortBreak = () => {
    handleMin(valShortBreak);
    handleIndex(valShortBreak);
  };

  const handleOpenSideBar = () => {
    setOpen(!open);
  };
  return (
    <div className="bg bg-transparent">
      <div className="">
        <div className="m-20 sm:m-0">
          <Sidebar />
        </div>
      </div>

      <div className="flex  sm:justify-center items-center space-x-9 ">
        <button
          onClick={handlePomodoro}
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Pomodoro
        </button>
        <button
          onClick={handleShortBreak}
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Short break
        </button>

        <button
          onClick={handleLongBreak}
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Long break
        </button>
      </div>
    </div>
  );
}

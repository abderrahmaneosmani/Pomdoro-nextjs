import { createContext, useState } from "react";
export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [index, setIndex] = useState(25);

  const handleMin = (val) => {
    setMin(val);
  };

  const handleIndex = (val) => {
    setIndex(val);
  };
  const handleSec = (val) => {
    setSec(val);
  };
  const value = {
    min,
    index,
    sec,
    handleIndex,
    handleMin,
    handleSec,
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

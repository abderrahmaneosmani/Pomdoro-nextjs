import { createContext, useEffect, useState } from "react";
export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [index, setIndex] = useState(25);
  const [dataSource, setDataSource] = useState([]);

  const handleMin = (val) => {
    setMin(val);
  };

  const handleIndex = (val) => {
    setIndex(val);
  };
  const handleSec = (val) => {
    setSec(val);
  };

  const handleSetDataSource = (val) => {
    setDataSource(val);
  };
  const handleDelete = (key) => {
    const mdataSource = [...dataSource];
    setDataSource(mdataSource.filter((item) => item.key !== key));
    if (dataSource.length === 1) {
      localStorage.removeItem("tasks");
    }
  };

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");

    if (tasks === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      const myTasks = JSON.parse(localStorage.getItem("tasks"));
      setDataSource(myTasks);
    }
  }, []);

  useEffect(() => {
    if (dataSource.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(dataSource));
    }
  }, [dataSource]);
  const value = {
    min,
    index,
    sec,
    handleIndex,
    handleMin,
    handleSec,
    dataSource,
    handleDelete,
    handleSetDataSource,
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

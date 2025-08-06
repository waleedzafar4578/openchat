import React, { useEffect, useState } from "react";
import "./elements.css";
function Timer({ changer, timeLimit,outerSec }:
  { changer: () => void, timeLimit: number, outerSec:()=>void }) {
  const [sec, setSec] = useState<number>(timeLimit);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1)
        outerSec()
      } else {
        clearInterval(intervalId)
        changer()
      }
    }, 1000);

    return (() => {
      clearInterval(intervalId);
    });

  }, [sec]);
  return (
    <div className="timer-container">
      <p className="timer-counter">
        {sec}
      </p>
    </div>
  )
}
export default Timer;

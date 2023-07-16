import { Dispatch, useEffect } from "react";
import { Action } from "./App";
type Props = { remainedSeconds: number | null; dispatch: Dispatch<Action> };
export default function Timer({ remainedSeconds, dispatch }: Props) {
  const min = Math.floor(remainedSeconds! / 60);
  const second = Math.floor(remainedSeconds! % 60);
  useEffect(function () {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{second < 10 && "0"}
      {second}
    </div>
  );
}

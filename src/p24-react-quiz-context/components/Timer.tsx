import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
  const { remainedSeconds, dispatch } = useQuiz();
  const min = Math.floor(remainedSeconds! / 60);
  const second = Math.floor(remainedSeconds! % 60);

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{second < 10 && "0"}
      {second}
    </div>
  );
}

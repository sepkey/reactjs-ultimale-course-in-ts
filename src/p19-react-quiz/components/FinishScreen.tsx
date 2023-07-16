import { Dispatch } from "react";
import { Action } from "./App";

type Props = {
  points: number;
  maxPoints: number;
  highscore: number;
  dispatch: Dispatch<Action>;
};

export default function FinishScreen({
  maxPoints,
  points,
  highscore,
  dispatch,
}: Props) {
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)})%
      </p>
      <p className="highscore">Highscore is {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        reset
      </button>
    </>
  );
}

import { Dispatch } from "react";
import { Action } from "./App";

type Props = {
  dispatch: Dispatch<Action>;
  selected: number | null;
  numQuestions: number;
  index: number;
};
export default function NextButton({
  dispatch,
  selected,
  numQuestions,
  index,
}: Props) {
  if (selected === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "next-question" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );

  return null;
}

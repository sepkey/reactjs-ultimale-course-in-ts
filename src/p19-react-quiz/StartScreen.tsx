import { Dispatch } from "react";
import { Action } from "./App";

type Props = {
  numQuestions: number;
  dispatch: Dispatch<Action>;
};
export default function StartScreen({ numQuestions, dispatch }: Props) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

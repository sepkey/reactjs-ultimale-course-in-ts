import { Dispatch } from "react";
import { QuestionType } from "../types";
import { Action } from "./App";

type Props = {
  question: QuestionType;
  dispatch: Dispatch<Action>;
  selected: null | number;
};

export default function Options({ question, dispatch, selected }: Props) {
  const hasAnswered = selected !== null;

  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          disabled={hasAnswered}
          className={`btn btn-option ${idx === selected ? "answer" : ""} ${
            hasAnswered
              ? idx === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "select", payload: idx })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

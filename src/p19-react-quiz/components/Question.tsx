import Options from "./Options";
import { QuestionType } from "../types";
import { Dispatch } from "react";
import { Action } from "./App";

type Props = {
  question: QuestionType;
  dispatch: Dispatch<Action>;
  selected: null | number;
};
export default function Question({ question, dispatch, selected }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} selected={selected} />
    </div>
  );
}

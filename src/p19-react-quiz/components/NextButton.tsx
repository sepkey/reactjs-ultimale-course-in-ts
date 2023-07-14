import { Dispatch } from "react";
import { Action } from "./App";

type Props = {
  dispatch: Dispatch<Action>;
  selected: number | null;
};
export default function NextButton({ dispatch, selected }: Props) {
  if (selected === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "next-question" })}
    >
      Next
    </button>
  );
}

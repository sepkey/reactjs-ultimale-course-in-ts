import { ChangeEvent, useReducer } from "react";

type State = {
  count: number;
  step: number;
};

type Increase = {
  type: "inc";
};
type Decrease = {
  type: "dec";
};
type SetCount = {
  type: "set-count";
  payload: number;
};
type SetStep = {
  type: "set-step";
  payload: number;
};
type Reset = {
  type: "reset";
};

type Action = Increase | Decrease | SetCount | SetStep | Reset;
const initialState: State = {
  count: 0,
  step: 1,
};

function reducer(state: State, action: Action): State {
  const { count, step } = state;
  switch (action.type) {
    case "inc":
      return { ...state, count: count + step };
    case "dec":
      return { ...state, count: count - step };
    case "set-count":
      return { ...state, count: action.payload };
    case "set-step":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = () => dispatch({ type: "dec" });

  const inc = () => dispatch({ type: "inc" });

  const defineCount = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "set-count", payload: e.target.valueAsNumber });

  const defineStep = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "set-step", payload: e.target.valueAsNumber });

  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <div>
        <input
          type="range"
          min={0}
          max={10}
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} type="number" />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

import { useRef } from "react";

import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
  const difficultyRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <form
        onSubmit={() => {
          dispatch({
            type: "start",
            payload: {
              difficulty: difficultyRef.current?.value || "easy",
              size: sizeRef.current?.valueAsNumber,
            },
          });
          console.log(
            "1",
            difficultyRef.current?.value,
            "2",
            sizeRef.current?.value
          );
        }}
      >
        <label htmlFor="difficulty">Difficulty</label>
        <select
          className="input"
          ref={difficultyRef}
          id="difficulty"
          // defaultValue="easy"
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <label htmlFor="size">Number of questions</label>
        <input
          ref={sizeRef}
          className="input"
          id="size"
          type="number"
          max={"X"}
          min={1}
        />
        {/* <button type="submit" onClick={() => {}}>
          Submit
        </button> */}
        <button
          type="submit"
          className="btn btn-ui"
          // onClick={() => dispatch({ type: "start" })}
        >
          Let's start
        </button>
      </form>
    </div>
  );
}

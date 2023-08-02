import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { selected, index, dispatch, numQuestions } = useQuiz();
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

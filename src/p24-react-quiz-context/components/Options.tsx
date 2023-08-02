import { useQuiz } from "../contexts/QuizContext";
import { QuestionType } from "../types";

type Props = {
  question: QuestionType;
};

export default function Options({ question }: Props) {
  const { selected, dispatch } = useQuiz();
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

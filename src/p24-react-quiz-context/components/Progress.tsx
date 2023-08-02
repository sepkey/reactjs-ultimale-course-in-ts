import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
  const { selected, index, points, maxPoints, numQuestions } = useQuiz();

  return (
    <header className="progress">
      <progress value={index + Number(selected !== null)} max={numQuestions}>
        32%
      </progress>

      <p>
        Question <strong>{index + 1}</strong> /{numQuestions}
      </p>

      <p>
        Point <strong>{points}</strong> /{maxPoints}
      </p>
    </header>
  );
}

import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
  const { points, highscore, questions, dispatch } = useQuiz();
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)})%
      </p>
      <p className="highscore">Highscore is {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        reset
      </button>
    </>
  );
}

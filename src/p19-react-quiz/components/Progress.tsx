type Props = {
  numQuestions: number;
  index: number;
  points: number;
  maxPoints: number;
  selected: null | number;
};
export default function Progress({
  numQuestions,
  index,
  points,
  maxPoints,
  selected,
}: Props) {
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

type Props = {
  numQuestions: number;
};
export default function StartScreen({ numQuestions }: Props) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
}

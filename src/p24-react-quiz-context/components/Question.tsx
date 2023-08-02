import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

export default function Question() {
  const { index, questions } = useQuiz();
  const question = questions.at(index)!;
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

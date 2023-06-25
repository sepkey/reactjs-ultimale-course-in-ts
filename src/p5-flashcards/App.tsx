import { useState } from "react";
const questions = [
  {
    id: 3245,
    question: "How can we fly from Boston to Rome?",
    answer: "connecting flight",
  },
  {
    id: 3365,
    question: "How can we go from China to Rome?",
    answer: "subway",
  },
  {
    id: 3115,
    question: "How does react cause rerender?",
    answer: "with state change",
  },
  {
    id: 3912,
    question: "What is read-only, props or state?",
    answer: "props",
  },
];

export default function App() {
  return (
    <div className="app">
      <FlashCards />
    </div>
  );
}

function FlashCards() {
  const [selected, setSelected] = useState<number | null>(0);

  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div
          key={question.id}
          onClick={() =>
            setSelected(question.id !== selected ? question.id : null)
          }
          className={selected === question.id ? "selected" : ""}
        >
          <p>
            {selected === question.id ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  );
}

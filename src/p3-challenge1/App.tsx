import { useState } from "react";

export default function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

function Counter() {
  const [day, setDay] = useState(0);
  const [step, setStep] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + day);
  return (
    <div>
      <div>
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <span> Step: {step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setDay((c) => c - step)}>-</button>
        <span> Step: {day}</span>
        <button onClick={() => setDay((c) => c + step)}>+</button>
      </div>
      <p>
        {day <= 0 && `${Math.abs(day)} days ago was `}
        {day === 0 && "Today is "}
        {day > 0 && `${day} days from today is `}

        {date.toDateString()}
      </p>
    </div>
  );
}

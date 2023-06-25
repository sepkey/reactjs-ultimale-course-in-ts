import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Counter />
    </div>
  );
}

function Counter() {
  const [day, setDay] = useState(0);
  const [step, setStep] = useState(1);

  function handleReset() {
    setStep(0);
    setDay(1);
  }

  const date = new Date();
  date.setDate(date.getDate() + day);

  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(e.target.valueAsNumber)}
        />
        <span>Step: {step}</span>
      </div>
      <div>
        <button onClick={() => setDay((c) => c - step)}>-</button>
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.valueAsNumber)}
        />
        <button onClick={() => setDay((c) => c + step)}>+</button>
      </div>
      <p>
        {day <= 0 && `${Math.abs(day)} days ago was `}
        {day === 0 && "Today is "}
        {day > 0 && `${day} days from today is `}

        {date.toDateString()}
      </p>
      {(day !== 0 || step !== 1) && (
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      )}
    </div>
  );
}

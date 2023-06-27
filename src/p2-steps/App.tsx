import { useState } from "react";
import { Button } from "./Button";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => step > 1 && setStep((s) => s - 1);
  const handleNext = () => step < 3 && setStep((s) => s + 1);

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <Button bgColor="#7950f0" txtColor="#fff" onClick={handlePrevious}>
              previous <span>👈</span>
            </Button>
            <Button bgColor="#7950f0" txtColor="#fff" onClick={handleNext}>
              next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

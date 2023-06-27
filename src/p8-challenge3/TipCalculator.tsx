import { useState } from "react";
import { Reset } from "./Reset";
import { Output } from "./Output";
import { SelectPercentage } from "./SelectPercentage";
import { BillInput } from "./BillInput";

export function TipCalculator() {
  const [bill, setBill] = useState<number>(0);
  const [percentage1, setPercentage1] = useState<number>(0);
  const [percentage2, setPercentage2] = useState<number>(0);

  function handleReset() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);
  return (
    <>
      <BillInput bill={bill} setBill={setBill} />
      <SelectPercentage percentage={percentage1} setPercentage={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} setPercentage={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </>
  );
}

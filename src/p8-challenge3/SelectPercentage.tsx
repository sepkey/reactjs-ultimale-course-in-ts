import { PropsWithChildren } from "react";
import { SetState } from "./models";

export type Props = {
  percentage: number;
  setPercentage: SetState;
};

export function SelectPercentage({
  children,
  percentage,
  setPercentage,
}: PropsWithChildren<Props>) {
  return (
    <div>
      <label htmlFor="percentage">{children} </label>
      <select
        id="percentage"
        value={percentage}
        onChange={(e) => setPercentage(+e.target.value)}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okey (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely Amazing! (20%)</option>
      </select>
    </div>
  );
}

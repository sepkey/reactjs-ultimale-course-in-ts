import { SetState } from "./models";

export type Props = {
  bill: number;
  setBill: SetState;
};

export function BillInput({ bill, setBill }: Props) {
  return (
    <div>
      <label htmlFor="bill">How much was the bill? </label>
      <input
        id="bill"
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.valueAsNumber)}
      />
    </div>
  );
}

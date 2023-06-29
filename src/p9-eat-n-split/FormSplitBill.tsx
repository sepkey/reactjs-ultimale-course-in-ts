import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { Person } from "./types";

export type Props = {
  selected: Person | null;
  onUpdateBalance: (balance: number) => void;
};

export function FormSplitBill({ selected, onUpdateBalance }: Props) {
  const [bill, setBill] = useState<number | string>("");
  const [expense, setExpense] = useState<number | string>("");
  const [payBy, setPayBy] = useState("user");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!bill || !expense) return;

    const balance = payBy === "user" ? +bill - +expense : -expense;
    onUpdateBalance(balance);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split a bill with {selected?.name}</h2>

      <label htmlFor="bill">💰 Bill value</label>
      <input
        id="bill"
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.valueAsNumber)}
      />

      <label htmlFor="your">👩 Your expense</label>
      <input
        id="your"
        type="number"
        value={expense}
        onChange={(e) =>
          setExpense(
            e.target.valueAsNumber > +bill ? expense : e.target.valueAsNumber
          )
        }
      />

      <label htmlFor="friend">👩🏼‍🤝‍👩🏻 {selected?.name}'s expense</label>
      <input disabled id="friend" type="number" value={+bill - +expense} />

      <label htmlFor="pay">🤑 Who is paying the bill?</label>
      <select id="pay" value={payBy} onChange={(e) => setPayBy(e.target.value)}>
        <option value="user">you</option>
        <option value="friend">{selected?.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

//TODO
//when change selection while input form of bill is full,complete rerender doesn't occur, why?

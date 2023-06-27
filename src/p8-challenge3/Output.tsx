export type Props = {
  bill: number;
  tip: number;
};

export function Output({ bill, tip }: Props) {
  return (
    <h3>
      You pay {bill + tip} ({bill} $ bill {tip} $ Tip)
    </h3>
  );
}

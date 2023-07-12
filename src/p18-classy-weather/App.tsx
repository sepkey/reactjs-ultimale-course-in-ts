import React from "react";

export default function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

type Props = {};
type State = { count: number };
class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const date = new Date("23 June 2023");
    date.setDate(date.getDate() + this.state.count);

    return <div>hi</div>;
  }
}

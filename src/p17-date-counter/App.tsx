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
    this.state = { count: 0 };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase() {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }

  decrease() {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }

  render() {
    const date = new Date("23 June 2023");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.decrease}>-</button>
        <span>
          {date.toDateString()}[{this.state.count}]
        </span>
        <button onClick={this.increase}>+</button>
      </div>
    );
  }
}

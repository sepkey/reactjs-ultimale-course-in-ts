import { PropsWithChildren, createContext, useContext, useState } from "react";
//1.create context
type ContextType = {
  count: number;
  increase: () => void;
  decrease: () => void;
};
const CounterContex = createContext<ContextType>({
  count: 0,
  decrease: () => {},
  increase: () => {},
});

//2.create parent component
function Counter({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <CounterContex.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContex.Provider>
  );
}

//3.create child component to help implementing the common task
function Count() {
  const { count } = useContext(CounterContex);
  return <span> {count}</span>;
}

function Increase({ icon }: { icon: string }) {
  const { increase } = useContext(CounterContex);
  return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }: { icon: string }) {
  const { decrease } = useContext(CounterContex);
  return <button onClick={decrease}>{icon}</button>;
}

function Label({ children }: PropsWithChildren) {
  return <span>{children}</span>;
}

//4.Add child component as properties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;

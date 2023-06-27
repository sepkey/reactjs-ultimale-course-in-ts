import { Dispatch, PropsWithChildren, SetStateAction } from "react";

type Props = {
  title: string;
  num: number;
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
};

export function AccordionItem({
  num,
  title,
  setSelected,
  selected,
  children,
}: PropsWithChildren<Props>) {
  const isOpen = selected === num;

  function handleToggle() {
    setSelected(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen && "open"}`} onClick={handleToggle}>
      <p className="number">{num < 10 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

import { useState } from "react";
import "./index.css";
type Faq = {
  title: string;
  text: string;
};
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div className="app">
      <Accordion faqs={faqs} />
    </div>
  );
}

type AccordionProps = {
  faqs: Faq[];
};

function Accordion({ faqs }: AccordionProps) {
  return (
    <div className="accordion">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={faq.title}
          num={idx + 1}
          text={faq.text}
          title={faq.title}
        />
      ))}
    </div>
  );
}

type AccordionItemProps = {
  title: string;
  num: number;
  text: string;
};

function AccordionItem({ num, title, text }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((o) => !o);
  }
  return (
    <div className={`item ${isOpen && "open"}`} onClick={handleToggle}>
      <p className="number">{num < 10 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

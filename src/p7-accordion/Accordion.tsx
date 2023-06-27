import { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { Faq } from "./models";

export type Props = {
  faqs: Faq[];
};

export function Accordion({ faqs }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="accordion">
      {faqs.map((faq, idx) => (
        <AccordionItem
          setSelected={setSelected}
          selected={selected}
          key={faq.title}
          num={idx + 1}
          title={faq.title}
        >
          {faq.text}
        </AccordionItem>
      ))}
    </div>
  );
}

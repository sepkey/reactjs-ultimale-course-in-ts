import { PropsWithChildren } from "react";

export type Props = {
  step: number;
};
export function StepMessage({ step, children }: PropsWithChildren<Props>) {
  return (
    <div className="message">
      <h3> Step {step}:</h3>
      {children}
    </div>
  );
}

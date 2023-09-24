import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;
type Props = {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: number | string;
};
function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: PropsWithChildren<Props>) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={String(id)}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={!disabled ? String(id) : ""}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;

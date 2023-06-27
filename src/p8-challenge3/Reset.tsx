export type Props = {
  onReset: () => void;
};

export function Reset({ onReset }: Props) {
  return (
    <button onClick={onReset} type="reset">
      Reset
    </button>
  );
}

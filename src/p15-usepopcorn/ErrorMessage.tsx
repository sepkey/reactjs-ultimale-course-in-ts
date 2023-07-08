export function ErrorMessage({ msg }: { msg: string }) {
  return (
    <p className="error">
      <span>🚫</span> {msg}
    </p>
  );
}

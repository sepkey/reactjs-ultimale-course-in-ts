import { Dispatch, SetStateAction, memo } from "react";

type Props = {
  allowSound: boolean;
  setAllowSound: Dispatch<SetStateAction<boolean>>;
};
function ToggleSounds({ allowSound, setAllowSound }: Props) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);

import { useSelector } from "react-redux";
import { RootState } from "../../models/rtk-types";

export default function Username() {
  const username = useSelector((state: RootState) => state.user.username);
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

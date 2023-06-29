import { Friend } from "./Friend";
import { Person } from "./types";

export type Props = {
  friends: Person[];
  onSelection: (friend: Person) => void;
  selected: Person | null;
};

export function Friendslist({ friends, onSelection, selected }: Props) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selected={selected}
        />
      ))}
    </ul>
  );
}

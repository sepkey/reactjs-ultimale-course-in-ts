import { FormSplitBill } from "./FormSplitBill";
import "./index.css";
import { useState } from "react";
import { Person } from "./types";
import { FormAddFriend } from "./FormAddFriend";
import { Button } from "./Button";
import { Friendslist } from "./Friendslist";

const initialFriends: Person[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState<Person[]>(initialFriends);
  const [selected, setSelected] = useState<Person | null>(null);

  function handleShowFriend() {
    setShowAddFriend((o) => !o);
  }

  function handleAddFriend(friend: Person) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend: Person) {
    setSelected((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleUpdateBalance(balance: number) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selected?.id
          ? { ...friend, balance: friend.balance + balance }
          : friend
      )
    );
    setSelected(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friendslist
          friends={friends}
          onSelection={handleSelection}
          selected={selected}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowFriend}>
          {showAddFriend ? "close" : "Add friend"}
        </Button>
      </div>
      {selected && (
        <FormSplitBill
          selected={selected}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </div>
  );
}

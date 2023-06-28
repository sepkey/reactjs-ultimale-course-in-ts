import "./index.css";
import { MouseEventHandler, PropsWithChildren, useState } from "react";
type Person = { id: number; name: string; image: string; balance: number };
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <Friendslist />
        {isOpen ? (
          <>
            <FormAddFriend />
            <Button onClick={() => setIsOpen((o) => !o)}>Close</Button>
          </>
        ) : (
          <Button onClick={() => setIsOpen((o) => !o)}>Add friend</Button>
        )}
      </div>
      <FormSplitBill />
    </div>
  );
}

function Friendslist() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

type FriendProps = {
  friend: Person;
};

function Friend({ friend }: FriendProps) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}.
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}.
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

      <Button onClick={() => {}}>Select</Button>
    </li>
  );
}

type ButtonProps = {
  onClick: MouseEventHandler;
};

function Button({ onClick, children }: PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="name">👩🏼‍🤝‍👩🏻 Friend name</label>
      <input id="name" type="text" />

      <label htmlFor="image">📸 Image URL</label>
      <input type="url" />

      <Button onClick={() => {}}>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>split a bill with X</h2>

      <label htmlFor="bill">💰 Bill value</label>
      <input id="bill" type="text" />

      <label htmlFor="your">👩 Your expense</label>
      <input id="your" type="text" />

      <label htmlFor="friend">👩🏼‍🤝‍👩🏻 X's expense</label>
      <input disabled id="friend" type="text" />

      <label htmlFor="pay">🤑 Who is paying the bill?</label>
      <select id="pay">
        <option value="user">you</option>
        <option value={"X"}>X</option>
      </select>

      <Button onClick={() => {}}>Split bill</Button>
    </form>
  );
}

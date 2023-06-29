import { FormEvent, useState } from "react";
import { Person } from "./types";
import { Button } from "./Button";

export type Props = {
  onAddFriend: (friend: Person) => void;
};

export function FormAddFriend({ onAddFriend }: Props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  // const newId = useId(); //not useful only for accessibility
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend: Person = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="name">👩🏼‍🤝‍👩🏻 Friend name</label>
      <input
        value={name}
        id="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="image">📸 Friend Image</label>
      <input
        value={image}
        id="image"
        type="url"
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

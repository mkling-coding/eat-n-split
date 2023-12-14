import { useState } from "react";
import { FriendsList } from "./FriendsList";
import { AddFriendButton } from "./AddFriendButton";
import { SplitBill } from "./SplitBill";

export default function App() {
  const [friends, setFriends] = useState([
    {
      id: 100000,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 100001,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 100002,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ]);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  function AddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          isSelectOpen={isSelectOpen}
          onSelectOpen={setIsSelectOpen}
        />
        <AddFriendButton
          friends={friends}
          onAddFriend={AddFriend}
          name={name}
          setName={setName}
          image={image}
          setImage={setImage}
        />
      </div>
      {isSelectOpen && (
        <SplitBill
          friends={friends}
          isSelectOpen={isSelectOpen}
          onSetFriends={setFriends}
        />
      )}
    </div>
  );
}

import { useState } from "react";
import { AddFriendDiv } from "./AddFriendDiv";

export function AddFriendButton({
  friends,
  onAddFriend,
  name,
  setName,
  image,
  setImage,
}) {
  const [isOpen, setisOpen] = useState(false);

  function handleOpen() {
    setisOpen(!isOpen);
  }

  return (
    <div className="add-friend">
      {isOpen && (
        <AddFriendDiv
          friends={friends}
          onAddFriend={onAddFriend}
          name={name}
          setName={setName}
          image={image}
          setImage={setImage}
        />
      )}
      <button onClick={handleOpen}>{isOpen ? "Close" : "Add Friend"}</button>
    </div>
  );
}

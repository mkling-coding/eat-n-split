import { useState } from "react";

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

function FriendsList({ friends, isSelectOpen, onSelectOpen }) {
  return (
    <div className="friends-list">
      {friends.map((friend) => {
        return (
          <FriendCard
            id={friend.id}
            name={friend.name}
            image={friend.image}
            balance={friend.balance}
            isSelectOpen={isSelectOpen}
            onSelectOpen={onSelectOpen}
          />
        );
      })}
    </div>
  );
}

function FriendCard({ id, name, image, balance, onSelectOpen, isSelectOpen }) {
  function handleSelect(e) {
    isSelectOpen === e.target.value
      ? onSelectOpen(false)
      : onSelectOpen(e.target.value);
  }

  return (
    <div className={id % 2 === 0 ? "friend-card" : "friend-card celeste"}>
      <img src={image} alt="Profile" />
      <div className="card-text">
        <h3>{name}</h3>
        {balance > 0 ? (
          <p class="green">
            {name} owes you ${balance}
          </p>
        ) : balance < 0 ? (
          <p class="red">
            You owe {name} ${balance.toString().slice(1)}
          </p>
        ) : (
          <p>You and {name} are even</p>
        )}
      </div>
      <button value={id} onClick={handleSelect}>
        {isSelectOpen === id.toString() ? "Close" : "Select"}
      </button>
    </div>
  );
}

function AddFriendButton({
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

function AddFriendDiv({
  friends,
  onAddFriend,
  name,
  setName,
  image,
  setImage,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    let currentId = [...friends];
    currentId = currentId[currentId.length - 1].id + 1;

    const newFriend = {
      id: currentId,
      name,
      image,
      balance: 0,
    };

    onAddFriend(newFriend);
  }

  return (
    <div className="add-friend-form">
      <form onSubmit={handleSubmit}>
        <div className="friend-input">
          <label htmlFor="name">Friend name </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="friend-input">
          <label htmlFor="image">Image URL </label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}

function SplitBill({ friends, onSetFriends, isSelectOpen }) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [isPaying, setIsPaying] = useState("You");
  const friendsExpense = bill - yourExpense;

  let newArray = [...friends];
  let index = newArray.findIndex((x) => x.id === Number(isSelectOpen));

  function handleSubmit(e) {
    e.preventDefault();

    isPaying === "You"
      ? (newArray[index].balance += friendsExpense)
      : (newArray[index].balance -= yourExpense);

    onSetFriends(newArray);
  }

  return (
    <div className="split-bill">
      <h2>Split a bill with {newArray[index].name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="split-input">
          <label htmlFor="bill">Bill value</label>
          <input
            type="text"
            id="bill"
            name="bill"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          ></input>
        </div>
        <div className="split-input">
          <label htmlFor="your=expense">Your expense: </label>
          <input
            type="text"
            id="your-expense"
            name="your-expense"
            value={yourExpense}
            onChange={(e) => setYourExpense(Number(e.target.value))}
          ></input>
        </div>
        <div className="split-input">
          <label htmlFor="friends-expense">{`${newArray[index].name}'s expense: `}</label>
          <input
            type="text"
            name="friends-expense"
            id="friends-expense"
            value={friendsExpense}
            readOnly
          ></input>
        </div>
        <div className="split-input">
          <label htmlFor="paying">Who is paying the bill? </label>
          <select
            id="paying"
            name="paying"
            value={isPaying}
            onChange={(e) => setIsPaying(e.target.value)}
          >
            <option>You</option>
            <option>{newArray[index].name}</option>
          </select>
        </div>
        <button>Split Bill</button>
      </form>
    </div>
  );
}

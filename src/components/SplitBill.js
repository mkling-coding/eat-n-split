import { useState } from "react";

export function SplitBill({ friends, onSetFriends, isSelectOpen }) {
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

export function FriendCard({
  id,
  name,
  image,
  balance,
  onSelectOpen,
  isSelectOpen,
}) {
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

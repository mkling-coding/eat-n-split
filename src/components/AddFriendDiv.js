export function AddFriendDiv({
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

import { FriendCard } from "./FriendCard";

export function FriendsList({ friends, isSelectOpen, onSelectOpen }) {
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

import { useEffect, useState } from "react";
import { LeaderBoardItem } from "./LeaderBoardItem";
import { User } from "../../../common/types";

export function LeaderBoard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/user/list-users`,
          opts
        );
        const users = await res.json();
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-screen-md mx-auto pb-10">
      <div className="my-4 border-b-2">
        <h2 className="text-xl font-bold leading-10 text-zinc-800">
          Leader Board
        </h2>
      </div>
      <div className="p-5 bg-slate-200 max-h-[500px] overflow-auto rounded-sm border shadow-lg">
        {users.map((player, index) => (
          <LeaderBoardItem key={index} player={player} index={index} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { UserType } from "../../../library/types";
import { LeaderBoardItem } from "./LeaderBoardItem";

export function LeaderBoard() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
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

import { useEffect, useState } from "react";
import { User } from "../../../common/types";
import { useAuthContext } from "../../../library/AppAuthContext";
import { compactString } from "../../../common/utils";


export function LeaderBoardItem({
  player,
  index,
}: {
  player: User;
  index: number;
}) {
  const { user } = useAuthContext();
  const [shortenedWalletAddress, setShortenedWalletAddress] = useState("")

  useEffect(() => {
    const updateWalletAddress = () => {
      if (window.innerWidth < 500) {
        setShortenedWalletAddress(compactString(player?.walletAddress, 8, 5))
      } else {
        setShortenedWalletAddress(player.walletAddress)
      }
    }
    updateWalletAddress()
    window.addEventListener("resize", updateWalletAddress)
    return () => window.removeEventListener("resize", updateWalletAddress)
  }, [player.walletAddress])

  const walletAddress = user
    ? user.id === player.id
      ? "You"
      : shortenedWalletAddress
    : shortenedWalletAddress

  const MedalEmoji = ({ index }: { index: number }) => {
    const medals = ["🥇", "🥈", "🥉"];
    return (
      <span className={index < 3 ? "text-3xl" : "text-md"}>
        {index < 3 ? medals[index] : `#${index + 1}`}
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded border my-3">
      <div className="p-3">
        <div className="text-green-600 font-semibold tracking-wider">
          <MedalEmoji index={index} />
        </div>
        <p className="block mt-1 text-md leading-tight font-semibold text-zinc-800">
          {walletAddress}
        </p>
        <p className="mt-1 text-gray-500">Score: {player.score}</p>
      </div>
    </div>
  )
}

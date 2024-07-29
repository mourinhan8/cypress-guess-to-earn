import { useEffect } from "react";
import { useStore } from "../../library/state-manager";

export function Timer({ id }: { id?: string }) {
  const { btcPrice, newBtcPrice, timeRemaining, setGameState } =
    useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setGameState("countdown")
      } else {
        setGameState(
          "end",
          // false,
          // false,
          btcPrice,
          newBtcPrice,
          id)
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining, btcPrice, newBtcPrice]);

  return (
    <p aria-live="polite" className="font-semibold">
      Timer:{" "}
      <span className="w-[25px] inline-block text-zinc-800">
        {timeRemaining}
      </span>
    </p>
  );
}

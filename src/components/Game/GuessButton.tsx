import useStore from "../../library/state-manager";
import { useState, useEffect } from "react";

export function GuessButtons() {
  const { isGuessing, setGuess } = useStore();
  const [selectedButton, setSelectedButton] = useState<"up" | "down" | null>(
    null
  );

  const handleGuess = (guess: "up" | "down") => {
    if (!isGuessing) {
      setGuess(guess);
      setSelectedButton(guess);
    }
  };

  useEffect(() => {
    if (!isGuessing) {
      setSelectedButton(null);
    }
  }, [isGuessing]);

  const buttonStylesUp = {
    textShadow:
      selectedButton === "up"
        ? "0px -2px #669644"
        : isGuessing
        ? "0px -2px #669644"
        : "0px -2px #669644",
  };

  const buttonStylesDown = {
    textShadow:
      selectedButton === "down"
        ? "0px -2px #BD3E31"
        : isGuessing
        ? "0px -2px #bd3f315b"
        : "0px -2px #BD3E31",
  };

  const buttonClassesUp = `relative px-10 py-2 m-2 float-left rounded-lg text-white text-lg shadow-md ease-in duration-200 w-[150px] ${
    selectedButton === "up"
      ? "bg-greenPrimary"
      : isGuessing
      ? "bg-greenPrimary border-b-4 border-greenSecondary  pointer-events-none opacity-70"
      : "bg-greenPrimary border-b-4 border-greenSecondary"
  } ${!isGuessing ? "active:translate-y-[3px] active:border-b-2" : ""}`;

  const buttonClassesDown = `relative px-10 py-2 m-2 float-left rounded-lg text-white text-lg shadow-md  ease-in duration-200 w-[150px] ${
    selectedButton === "down"
      ? "bg-redPrimary"
      : isGuessing
      ? "bg-redPrimary border-b-4 border-redSecondary pointer-events-none opacity-70"
      : "bg-redPrimary border-b-4 border-redSecondary"
  } ${!isGuessing ? "active:translate-y-[2px] active:border-b-2" : ""}`;
  return (
    <div className="border mx-auto bg-white w-[400px] h-[100px] rounded-xl p-4 shadow-md flex justify-between">
      <button
        style={buttonStylesUp}
        aria-label="Guess Up"
        onClick={() => handleGuess("up")}
        disabled={isGuessing}
        className={buttonClassesUp}
      >
        Up
      </button>
      <button
        style={buttonStylesDown}
        aria-label="Guess Down"
        onClick={() => handleGuess("down")}
        disabled={isGuessing}
        className={buttonClassesDown}
      >
        Down
      </button>
    </div>
  );
}

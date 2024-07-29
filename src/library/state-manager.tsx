import { create } from "zustand"
import { TIMING } from "../common/constants"

type Store = {
  btcPrice: number | null
  newBtcPrice: number | null
  timeRemaining: number
  isGuessingByMin: boolean
  isGuessingByDay: boolean
  isFlashing: { active: boolean; color: "green" | "red" }
  setIsFlashing: (flashing: { active: boolean; color: "green" | "red" }) => void
  setBtcPrice: (price: number | null) => void
  setNewBtcPrice: (price: number | null) => void
  setTimeRemaining: (time: number) => void
  setIsGuessingByMin: (guessing: boolean) => void
  setIsGuessingByDay: (guessing: boolean) => void
  setGameState: (
    gameState: string,
    // isGuessingByMin?: boolean,
    // isGuessingByDay?: boolean,
    oldPrice?: number | null,
    newPrice?: number | null,
    id?: string
  ) => void
}

export const useStore = create<Store>((set) => {
  // const userRef = doc(Database, `user/${Auth.currentUser?.uid}`);

  return {
    btcPrice: null,
    newBtcPrice: null,
    timeRemaining: TIMING,
    isGuessingByMin: false,
    isGuessingByDay: false,
    isFlashing: { active: false, color: "green" },
    setIsFlashing: (flashing) => set({ isFlashing: flashing }),
    setBtcPrice: (price) => set({ btcPrice: price }),
    setNewBtcPrice: (price) => set({ newBtcPrice: price }),
    setTimeRemaining: (time) => set({ timeRemaining: time }),
    setIsGuessingByMin: (guessing) => set({ isGuessingByMin: guessing }),
    setIsGuessingByDay: (guessing) => set({ isGuessingByDay: guessing }),
    setGameState: (
      gameState,
      // isGuessingByMin,
      // isGuessingByDay,
      oldPrice,
      newPrice
    ) => {
      if (gameState === "countdown") {
        set(({ timeRemaining }) => ({ timeRemaining: timeRemaining - 1 }))
      } else {
        set((storeState) => {
          if (oldPrice! < newPrice!) {
            setTimeout(
              () => set({ isFlashing: { active: false, color: "green" } }),
              1000
            )
            return {
              ...storeState,
              isFlashing: { active: true, color: "green" },
              btcPrice: newPrice,
              timeRemaining: TIMING,
            }
          } else {
            return {
              ...storeState,
              btcPrice: newPrice,
              timeRemaining: TIMING,
            }
          }
        })
      }
    },
  }
})

import { useStore } from "../../library/state-manager"
import { useState, useEffect } from "react"
import { APP_TOKEN_KEY } from "../../common/constants"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

export function GuessButtons({ socket }: {socket: any}) {
  const {
    isGuessingByDay,
    isGuessingByMin,
    setIsGuessingByDay,
    setIsGuessingByMin,
  } = useStore()
  const [isSelectedMinButton, setIsSelectedMinButton] = useState<boolean>(false)
  // const [isSelectedDayButton, setIsSelectedDayButton] = useState<boolean>(false)
  const [minuteCountdown, setMinuteCountdown] = useState<number | null>(null)
  const [dayCountdown, setDayCountdown] = useState<number | null>(null)
  const { btcPrice } = useStore()
  const token = localStorage.getItem(APP_TOKEN_KEY)
  const [minKey, setMinKey] = useState(0)
  // const [dayKey, setDayKey] = useState(0)

  useEffect(() => {
    // Khôi phục trạng thái từ localStorage khi component mount
    const storedMinuteCountdown = localStorage.getItem("minuteCountdown")
    const storedDayCountdown = localStorage.getItem("dayCountdown")

    if (storedMinuteCountdown) {
      setMinuteCountdown(parseInt(storedMinuteCountdown, 10))
    }
    if (storedDayCountdown) {
      setDayCountdown(parseInt(storedDayCountdown, 10))
    }
  }, [])

  useEffect(() => {
    // Lưu trạng thái vào localStorage khi thay đổi
    if (minuteCountdown) {
      localStorage.setItem("minuteCountdown", minuteCountdown.toString())
      setIsSelectedMinButton(true)
      setIsGuessingByMin(true)
    } else {
      localStorage.removeItem("minuteCountdown")
    }
    if (dayCountdown) {
      localStorage.setItem("dayCountdown", dayCountdown.toString())
      setIsSelectedMinButton(true)
      setIsGuessingByMin(true)
    } else {
      localStorage.removeItem("dayCountdown")
    }
  }, [minuteCountdown, dayCountdown])

  const handleComplete = (type: string) => {
    if (type === "min") {
      setMinuteCountdown(null)
      setIsGuessingByMin(false)
      setIsSelectedMinButton(false)
    } else {
      setDayCountdown(null)
      setIsGuessingByDay(false)
      // setIsSelectedDayButton(false)
    }
  }

  const handleGuessByMin = async () => {
    if (!isGuessingByMin) {
      if (!token) {
        return
      }
      setIsGuessingByMin(true)
      setIsSelectedMinButton(true)

      try {
        socket.current.emit("guess", {
          type: "min",
          priceAtGuess: btcPrice,
        })
        const endTime = Date.now() + 60000
        setMinuteCountdown(endTime)
      } catch (error) {
        console.error("Error creating minute record:", error)
      }
    }
  }

  // const handleGuessByDay = () => {
  //   if (!isGuessingByDay) {
  //     if (!token) {
  //       return
  //     }
  //     setIsGuessingByDay(true)
  //     setIsSelectedDayButton(true)

  //     try {
  //       // let opts = {
  //       //   method: "POST",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     Authorization: `Bearer ${token}`,
  //       //   },
  //       //   body: JSON.stringify({
  //       //     type: "day",
  //       //     priceAtGuess: btcPrice,
  //       //   }),
  //       // }
  //       // await fetch("/guess/create", opts)
  //       const endTime = Date.now() + 86400000
  //       setDayCountdown(endTime)
  //     } catch (error) {
  //       console.error("Error creating minute record:", error)
  //     }
  //   }
  // }
  useEffect(() => {
    if (!isGuessingByMin) {
      setIsSelectedMinButton(false)
    }
    if (!isGuessingByDay) {
      // setIsSelectedDayButton(false)
    }
  }, [isGuessingByMin, isGuessingByDay])

  useEffect(() => {
    if (minuteCountdown) {
      const interval = setInterval(() => {
        const now = Date.now()
        if (now >= minuteCountdown) {
          clearInterval(interval)
          handleComplete("min")
        } else {
          setMinKey((prevKey) => prevKey + 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [minuteCountdown])

  // useEffect(() => {
  //   if (dayCountdown) {
  //     const interval = setInterval(() => {
  //       const now = Date.now()
  //       if (now >= dayCountdown) {
  //         clearInterval(interval)
  //         handleComplete("day")
  //       } else {
  //         setDayKey((prevKey) => prevKey + 1)
  //       }
  //     }, 1000)

  //     return () => clearInterval(interval)
  //   }
  // }, [dayCountdown])
  // const formatTime = (time: number) => {
  //   const hours = Math.floor(time / 3600)
  //   const minutes = Math.floor((time % 3600) / 60)
  //   const seconds = time % 60

  //   if (hours > 0) {
  //     return `${hours.toString().padStart(2, "0")}:${minutes
  //       .toString()
  //       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  //   } else if (minutes > 0) {
  //     return `${minutes.toString().padStart(2, "0")}:${seconds
  //       .toString()
  //       .padStart(2, "0")}`
  //   } else {
  //     return `${seconds.toString().padStart(2, "0")}`
  //   }
  // }
  const buttonStylesMin = {
    textShadow: isSelectedMinButton
      ? "0px -2px #669644"
      : isGuessingByMin
      ? "0px -2px #669644"
      : "0px -2px #669644",
  }

  // const buttonStylesDay = {
  //   textShadow: isSelectedDayButton
  //     ? "0px -2px #3150bd"
  //     : isGuessingByDay
  //     ? "0px -2px #3150bd"
  //     : "0px -2px #3150bd",
  // }

  const buttonClassesMin = `relative px-5 py-2 float-left rounded-lg text-white text-lg shadow-md ease-in duration-200 w-full ${
    isSelectedMinButton
      ? "bg-greenPrimary pointer-events-none opacity-80"
      : // : isGuessingByMin
        // ? "bg-greenPrimary border-b-4 border-greenSecondary pointer-events-none opacity-80"
        "bg-greenPrimary border-b-4 border-greenSecondary"
  } ${!isGuessingByMin ? "active:translate-y-[3px] active:border-b-2" : ""}`

  // const buttonClassesDay = `relative px-5 py-2 m-2 float-left rounded-lg text-white text-lg shadow-md ease-in duration-200 w-[150px] ${
  //   isSelectedDayButton
  //     ? "bg-bluePrimary pointer-events-none opacity-80"
  //     : // : isGuessingByDay
  //       // ? "bg-bluePrimary border-b-4 border-blueSecondary pointer-events-none opacity-80"
  //       "bg-bluePrimary border-b-4 border-blueSecondary"
  // } ${!isGuessingByDay ? "active:translate-y-[3px] active:border-b-2" : ""}`

  return (
    <div className="border relative mx-auto bg-white w-[400px] h-[100px] rounded-xl p-4 shadow-md flex justify-between">
      <div className="relative w-full flex items-center">
        <button
          style={buttonStylesMin}
          aria-label="Guess"
          onClick={() => handleGuessByMin()}
          disabled={isGuessingByMin}
          className={buttonClassesMin}
        >
          Guess
        </button>
        {minuteCountdown && (
          <div className="absolute inset-y-1/3 left-1/2 transform -translate-x-1/2">
            <CountdownCircleTimer
              key={minKey}
              isPlaying
              duration={60}
              initialRemainingTime={(minuteCountdown - Date.now()) / 1000}
              colors={["#22c55e", "#eab308", "#ef4444"]}
              colorsTime={[60, 30, 0]}
              size={20}
              strokeWidth={6}
              onComplete={() => handleComplete("min")}
            >
              {({ remainingTime }) => (
                <div className="text-center">
                  <div className="text-md font-bold">
                    {Math.ceil(remainingTime)}s
                  </div>
                </div>
              )}
            </CountdownCircleTimer>
          </div>
        )}
      </div>
      {/* <div className="relative">
        <button
          style={buttonStylesDay}
          aria-label="Up in 1 day"
          onClick={() => handleGuessByDay()}
          disabled={isGuessingByDay}
          className={buttonClassesDay}
        >
          ⬆️ after 1 day
        </button>
        {dayCountdown && (
          <div className="absolute inset-y-1/3 left-1/2 transform -translate-x-1/2">
            <CountdownCircleTimer
              key={dayKey}
              isPlaying
              duration={86400}
              initialRemainingTime={(dayCountdown - Date.now()) / 1000}
              colors={["#22c55e", "#eab308", "#ef4444"]}
              colorsTime={[86400, 43200, 3600]}
              size={20}
              strokeWidth={6}
              onComplete={() => handleComplete("day")}
            >
              {({ remainingTime }) => (
                <div className="text-center">
                  <div className="text-md font-bold">
                    {formatTime(Math.ceil(remainingTime))}
                  </div>
                </div>
              )}
            </CountdownCircleTimer>
          </div>
        )}
      </div> */}
    </div>
  )
}

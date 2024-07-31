import { useEffect, useRef } from "react"
import {
  getBitcoinPrice,
  // initWebSocket
} from "../../library/api-handler"
// import { useParams } from "react-router-dom"
import { useStore } from "../../library/state-manager"
import GoHomeButton from "./GoHomeButton"
import { GuessButtons, Instructions, Price, UserInfo } from "."
import io from "socket.io-client"
import { APP_TOKEN_KEY } from "../../common/constants"
import { displayToast } from "../../library/toast-manager"
import loseSound from "../../assets/sounds/lose.wav"
import winSound from "../../assets/sounds/win.wav"
import { useAuthContext } from "../../library/AppAuthContext"
import { User } from "../../common/types"
const winSoundElement = new Audio(winSound)
const loseSoundElement = new Audio(loseSound)
export default function Game() {
  const { setBtcPrice, setNewBtcPrice } = useStore()
  const { user, setUser } = useAuthContext()
  // const { id } = useParams()
  const socketRef = useRef<any>()
  const token = localStorage.getItem(APP_TOKEN_KEY)

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_APP_SOCKET_URL, {
      auth: {
        token,
      },
      secure: true,
    })
    socketRef.current.on("userConnected", () => {
      console.log("connected socket")
    })
    socketRef.current.on("guessResult", (data: any) => {
      console.log(data)
      const { message, result, userScore } = data
      if (result === "win") {
        displayToast("success", message)
        setUser({
          ...user,
          score: userScore,
        } as User)
        winSoundElement.play()
      } else if (result === "lose") {
        displayToast("error", message)
        loseSoundElement.play()
      } else {
        displayToast("success", message)
        setUser({
          ...user,
          score: userScore,
        } as User)
      }
    })
    socketRef.current.on("guessSuccess", (data: any) => {
      console.log(data)
    })
    socketRef.current.on("guessError", (data: any) => {
      console.log(data)
    })
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    getBitcoinPrice().then(setBtcPrice)
    const timer = setInterval(() => {
      getBitcoinPrice().then(setNewBtcPrice)
    }, 60000)

    // const coinbaseWebSocket = initWebSocket((data) => {
    //   if (data.type === "ticker") {
    //     console.log('socket ne', data);
    //     // setNewBtcPrice(parseFloat(data.price));
    //   }
    // });

    return () => {
      // coinbaseWebSocket?.close();
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col items-center justify-center  bg-slate-200">
      <div className="mx-auto bg-white w-[400px] h-[85px] rounded-xl p-4 shadow-md flex justify-between mb-4 border">
        <GoHomeButton />
        <Instructions />
      </div>
      <UserInfo />
      <Price />
      {/* <div className="mx-auto bg-white w-[400px] rounded-xl p-4 shadow-md flex justify-center mb-4 border">
        <Timer id={id} />
      </div> */}
      <GuessButtons socket={socketRef} />
    </div>
  )
}

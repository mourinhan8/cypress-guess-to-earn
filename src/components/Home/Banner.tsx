import Image from "../../assets/bitcoin.png"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { useEffect, useState } from "react"
import { APP_TOKEN_KEY } from "../../common/constants"
import { useNavigate } from "react-router-dom"
import { displayToast } from "../../library/toast-manager"
import { useAuth } from "../../context/AuthContext"

export function Banner() {
  // const {
  //   isConnected,
  //   address,
  //   connector: activeConnector,
  //   isDisconnected,
  // } = useAccount()
  // const { data: signature, signMessage } = useSignMessage()
  // const { disconnect } = useDisconnect()
  const { state } = useAuth()
  // const [tempToken, setTempToken] = useState("")
  const navigate = useNavigate()

  // const handleAuthUser = async (address: any) => {
  //   try {
  //     if (token) {
  //       return
  //     }
  //     if (!signature) {
  //       let resNonce = await fetch(
  //         `${import.meta.env.VITE_APP_API_URL}/auth/nonce?address=${address}`
  //       )
  //       let resBody = await resNonce.json()

  //       setTempToken(resBody.tempToken)

  //       signMessage({
  //         account: address,
  //         message: resBody.message,
  //         connector: activeConnector,
  //       })
  //       return
  //     }

  //     if (!tempToken) {
  //       throw new Error("No temp token")
  //     }

  //     let opts = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${tempToken}`,
  //       },
  //     }

  //     const resToken = await fetch(
  //       `${
  //         import.meta.env.VITE_APP_API_URL
  //       }/auth/verify?signature=${signature}`,
  //       opts
  //     )
  //     const tokenData = await resToken.json()

  //     if (tokenData.error) {
  //       throw new Error(tokenData.error)
  //     }

  //     localStorage.setItem(APP_TOKEN_KEY, tokenData.token)
  //     setToken(tokenData.token)
  //   } catch (error) {
  //     disconnect()
  //     localStorage.removeItem(APP_TOKEN_KEY)
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   if (isDisconnected) {
  //     localStorage.removeItem(APP_TOKEN_KEY)
  //     setToken("")
  //     setUser(null)
  //   }
  // }, [isDisconnected])

  // useEffect(() => {
  //   if (isConnected) {
  //     handleAuthUser(address)
  //   }
  // }, [isConnected, signature, address])

  const gamePage = `/user/${state.profile?._id}`

  const signInPage = `/sign-in`

  return (
    <div className=" h-400 flex flex-col justify-center items-center gap-5 bg-zinc-800 shadow-xl py-10 h-svh">
      <img
        src={Image}
        alt="Cypress"
        className="banner__image w-40 mb-5 rounded-full"
      />
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-tight sm:leading-snug md:leading-normal tracking-wide">
        Guess to earn
      </h1>
      <h2 className="text-white font-medium text-lg tracking-wide">
        Predict the Future of Bitcoin in Minutes
      </h2>
      <button
        style={{ textShadow: "0px -2px #d7a83b" }}
        className="bg-yellowPrimary border-b-4 border-yellowSecondary text-white text-md ease-in duration-200 p-2 px-20 mb-5 rounded  shadow-3xlactive:translate-y-[2px] active:border-b-2"
        onClick={() => {
          navigate(state.isAuthenticated ? gamePage : signInPage)
        }}
      >
        {state.isAuthenticated ? "Play Now" : "Sign In"}
      </button>
      {/* <w3m-button /> */}
    </div>
  )
}

import { useDisconnect } from "wagmi"
import { User } from "../common/types"
import { useContext, createContext, useState, useEffect } from "react"
import { APP_TOKEN_KEY } from "../common/constants"
import { displayToast } from "./toast-manager";
import { useNavigate } from "react-router-dom";

export type AuthContextProviderProps = {
  children: React.ReactNode
}

type AuthContext = {
  user: User | null
  setUser: (user: User | null) => void
  token: string | null
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
})

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(APP_TOKEN_KEY)
  )
  const { disconnect } = useDisconnect()

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem(APP_TOKEN_KEY)
      if (!token) {
        throw new Error("No token")
      }
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/create`, opts)
      const profile = await res.json()
      if (profile.error) {
        throw new Error(profile.error)
      }
      setUser(profile.data)
    } catch (error) {
      console.log(error)
      disconnect()
      navigate('/')
    }
  }

  useEffect(() => {
    if (token && !user) {
      fetchProfile()
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

import axios from "../common/axios"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react"
import { useNavigate } from "react-router-dom"
import { APP_TOKEN_KEY } from "../common/constants"

type AuthAction = { type: "USER_LOGIN"; payload: any } | { type: "USER_LOGOUT" }

type Dispatch = (action: AuthAction) => void

type AuthState = {
  isAuthenticated: boolean
  profile: any
}

type AuthContextType = {
  state: AuthState
  dispatch: Dispatch
}

const AuthContext = createContext<AuthContextType | null>(null)

const initialAuthState: AuthState = {
  isAuthenticated: false,
  profile: null,
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, profile: action.payload, isAuthenticated: true }
    case "USER_LOGOUT":
      return { ...state, profile: null, isAuthenticated: false }
    default:
      return state
  }
}

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState)
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get("/user/me")
        const profile = response.data.userInfo
        if (profile) {
          dispatch({ type: "USER_LOGIN", payload: profile })
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem(APP_TOKEN_KEY)
      }
    }
    const token = localStorage.getItem(APP_TOKEN_KEY)
    if (token) {
      getUserInfo()
    }
  }, [])
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  if (!authContext) {
    throw new Error("useAuth must be used within a AuthContextProvider")
  }

  const { state, dispatch } = authContext

  const signIn = (profile: any) => {
    dispatch({ type: "USER_LOGIN", payload: profile })
  }

  const signOut = () => {
    dispatch({ type: "USER_LOGOUT" })
    navigate("/")
  }
  return {
    state,
    dispatch,
    signIn,
    signOut,
  }
}

export { AuthContextProvider, useAuth }

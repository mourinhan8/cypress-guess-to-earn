import { useState } from "react"
import { displayToast } from "../library/toast-manager"
import { useNavigate } from "react-router-dom"
export function useSignIn() {
  const navigate = useNavigate()
  const [error, setError] = useState<any>(null)

  const signIn = async () => {
    try {
      // await signInWithEmailAndPassword(Auth, email, password);
      displayToast("success", "Sign In Successful! Welcome back.", "😊")
      // navigate(`/user/${Auth.currentUser?.uid}`);
    } catch (error) {
      setError(error)
      console.log("Error:", error)
      displayToast("error", "Something went wrong!", "❌")
    }
  }

  return { signIn, error }
}

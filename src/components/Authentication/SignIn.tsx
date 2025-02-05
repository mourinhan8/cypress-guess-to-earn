import { LoginForm } from "./Form"
import { BackButton } from "./BackButton"

export default function SignIn() {
  return (
    <div className="bg-slate-200  min-h-screen flex justify-center items-center">
      <BackButton />
      <LoginForm />
    </div>
  )
}

import { compactString } from "../../common/utils"
import { useAuthContext } from "../../library/AppAuthContext"

export function UserInfo() {
  const { user } = useAuthContext()

  return (
    <div className="mx-auto bg-white w-[400px] rounded-xl p-4 shadow-md flex justify-between mb-4 border">
      <p className="font-semibold text-zinc-800">
        {user?.walletAddress && compactString(user?.walletAddress, 8, 5)}
      </p>
      <p className="font-semibold text-zinc-800">Score: {user?.score}</p>
    </div>
  )
}

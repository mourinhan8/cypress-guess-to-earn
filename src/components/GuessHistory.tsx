import { useEffect, useState } from "react"
import { CloseIcon, HistoryIcon } from "../assets/icons"
import Modal from "@mui/material/Modal"
import { useAuthContext } from "../library/AppAuthContext"
import { APP_TOKEN_KEY } from "../common/constants"


const records = [
  {
    guess: "Doom",
    result: "Miss",
    wins: 0,
    date: "Jul 26, 2024 at 04:54:01 PM",
  },
  {
    guess: "Moon",
    result: "Miss",
    wins: 0,
    date: "Jul 26, 2024 at 04:53:51 PM",
  },
  {
    guess: "Moon",
    result: "Win",
    wins: 1,
    date: "Jul 26, 2024 at 04:53:33 PM",
  },
  {
    guess: "Doom",
    result: "Win",
    wins: 1,
    date: "Jul 26, 2024 at 02:02:31 PM",
  },
  {
    guess: "Doom",
    result: "Miss",
    wins: 0,
    date: "Jul 26, 2024 at 02:02:21 PM",
  },
]

export function GuessHistory() {
  const { user } = useAuthContext()
  const [open, setOpen] = useState(false)
  const [listGuessed, setListGuessed] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const token = localStorage.getItem(APP_TOKEN_KEY)

  useEffect(() => {
    const fetchListGuessed = async () => {
      try {
        const opts = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/guess`,
          opts
        )
        const listGuessed = await response.json()
        setListGuessed(listGuessed.data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    if (!isLoaded && user) {
      fetchListGuessed()
    }
  }, [isLoaded, user])

  if (!user || !token) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open game instructions"
        className="fixed z-10 bottom-5 h-10 right-2 bg-indigo-500 border-b-4 border-indigo-900 text-white text-2xl transition-all ease-in duration-200 px-4 rounded-lg shadow-mdactive:translate-y-[2px] active:border-b-2"
      >
        <HistoryIcon />
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center m-5"
      >
        <div className="relative max-w-full p-6 rounded-xl bg-white">
          <button
            aria-label="Close game instructions"
            onClick={() => setOpen(false)}
            className="text-zinc-800 absolute top-2 right-2 bg-transparent border-none text-2xl"
          >
            <CloseIcon />
          </button>
          <div
            className="space-y-4 overflow-y-scroll"
            style={{ maxHeight: "80svh" }}
          >
            {records.map((record, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md min-w-96"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Your Guess</div>
                    <div
                      className={`font-semibold ${
                        record.guess === "Moon"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.guess}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Result</div>
                    <div className="text-gray-600">{record.result}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      Consecutive Wins
                    </div>
                    <div className="font-bold text-xl text-gray-600">
                      {record.wins}
                    </div>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="text-left">
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="text-gray-500 text-sm">{record.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}

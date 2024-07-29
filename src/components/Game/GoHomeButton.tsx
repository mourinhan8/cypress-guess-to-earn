import { displayToast } from "../../library/toast-manager";
import { useNavigate } from "react-router-dom";

export default function GoHomeButton() {
  const navigate = useNavigate();

  function onGoHome() {
    navigate("/");
    displayToast("success", "Go home")
  }
  return (
    <button
      onClick={onGoHome}
      aria-label="Back to Home"
      // Inline styling is used here because Tailwind CSS doesn't support text shadow.
      style={{ textShadow: "0px -2px #d7a83b" }}
      className="bg-yellowPrimary border-b-4 border-yellowSecondary text-white text-md ease-in duration-200 p-3 rounded-lg shadow-3xlactive:translate-y-[2px] active:border-b-2"
    >
      Back to Home
    </button>
  )
}

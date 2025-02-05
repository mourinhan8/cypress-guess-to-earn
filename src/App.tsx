import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import { Toaster } from "react-hot-toast"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Spinner } from "./components/Spinner/Spinner"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { WagmiProvider } from "wagmi"
import { moonbeam } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GuessHistory } from "./components/GuessHistory"
import { GoogleOAuthProvider } from "@react-oauth/google"

// 0. Setup queryClient
const queryClient = new QueryClient()

const projectId = "85aa6074d35334e80df5abe03213499e"
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const chains = [moonbeam] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableSwaps: false,
  enableOnramp: false,
})

const Game = lazy(() => import("./components/Game/Game"))
const Home = lazy(() => import("./components/Home/Home"))
const NotFound = lazy(() => import("./components/NotFound"))
const SignIn = lazy(() => import("./components/Authentication/SignIn"))

export default function App() {
  return (
    <GoogleOAuthProvider clientId="92551159226-9uqki2ecnlvck2ofsuo5hgh3j66hv4mn.apps.googleusercontent.com">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/user/:id"
              element={
                <Suspense fallback={<Spinner />}>
                  <ProtectedRoute>
                    <Game />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Suspense fallback={<Spinner />}>
                  <SignIn />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Spinner />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
          <GuessHistory />
        </QueryClientProvider>
      </WagmiProvider>
    </GoogleOAuthProvider>
  )
}

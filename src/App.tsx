import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthContextProvider } from "./library/AppAuthContext";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Spinner } from "./components/Spinner/Spinner";
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { WagmiProvider } from "wagmi"
import { moonbeam } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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

const Game = lazy(() => import("./components/Game/Game"));
const Home = lazy(() => import("./components/Home/Home"));
const SignIn = lazy(() => import("./components/Authentication/SingIn"));
const SignUp = lazy(() => import("./components/Authentication/SignUp"));
const NotFound = lazy(() => import("./components/NotFound"));

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
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
              path="/sign-up"
              element={
                <Suspense fallback={<Spinner />}>
                  <SignUp />
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
        </AuthContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Flag, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password)
    
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-16">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-[oklch(0.8_0.18_195/0.06)] blur-3xl" />
        <div className="absolute right-1/3 bottom-1/3 h-96 w-96 rounded-full bg-[oklch(0.65_0.2_290/0.06)] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[oklch(0.8_0.18_195/0.15)]">
              <Flag className="h-7 w-7 text-[oklch(0.8_0.18_195)]" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-2 text-center text-muted-foreground">
              Sign in with your Racing ID to access the pit lane
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Racing ID (Email)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="driver@marketprix.io"
                  required
                  className="w-full rounded-lg border border-[oklch(0.8_0.18_195/0.3)] bg-secondary/50 py-3 pl-10 pr-4 text-foreground placeholder-muted-foreground transition-all focus:border-[oklch(0.8_0.18_195)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.8_0.18_195/0.2)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Pit Lane Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your code"
                  required
                  className="w-full rounded-lg border border-[oklch(0.8_0.18_195/0.3)] bg-secondary/50 py-3 pl-10 pr-4 text-foreground placeholder-muted-foreground transition-all focus:border-[oklch(0.8_0.18_195)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.8_0.18_195/0.2)]"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[oklch(0.6_0.22_25)]"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[oklch(0.8_0.18_195)] py-3 font-semibold text-background transition-all hover:bg-[oklch(0.85_0.18_195)] hover:shadow-[0_0_30px_oklch(0.8_0.18_195/0.5)] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign in with Racing ID
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Demo Login */}
          <button
            onClick={() => {
              setEmail("demo@marketprix.io")
              setPassword("demo123")
            }}
            className="w-full rounded-lg border border-[oklch(0.65_0.2_290/0.3)] bg-[oklch(0.65_0.2_290/0.1)] py-3 text-sm font-medium text-[oklch(0.65_0.2_290)] transition-all hover:bg-[oklch(0.65_0.2_290/0.2)]"
          >
            Use Demo Credentials
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to the paddock?{" "}
            <Link
              href="/"
              className="font-medium text-[oklch(0.8_0.18_195)] hover:underline"
            >
              Learn more
            </Link>
          </p>
        </div>

        {/* Racing stripe decoration */}
        <div className="absolute -bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-[oklch(0.8_0.18_195)] to-[oklch(0.65_0.2_290)]" />
      </motion.div>
    </div>
  )
}

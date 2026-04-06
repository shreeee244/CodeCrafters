"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { MarketSidebar } from "@/components/market-sidebar"
import { TelemetryDashboard } from "@/components/telemetry-dashboard"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const [selectedCity, setSelectedCity] = useState("bangalore")
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-16">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[oklch(0.8_0.18_195)] border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background pt-16">
      <MarketSidebar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />
      <TelemetryDashboard city={selectedCity} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { MarketSidebar } from "@/components/market-sidebar"
import { TelemetryDashboard } from "@/components/telemetry-dashboard"

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("bangalore")

  return (
    <div className="flex min-h-screen bg-background dark">
      <MarketSidebar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />
      <TelemetryDashboard city={selectedCity} />
    </div>
  )
}

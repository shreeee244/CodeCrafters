"use client"

import { TelemetryGauge } from "./telemetry-gauge"
import { LiveCommentary } from "./live-commentary"
import { GlobalComparison } from "./global-comparison"
import { RaceEngineerReport } from "./race-engineer-report"
import {
  CreditCard,
  Wind,
  Shield,
  Timer,
  Wallet,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  HeartPulse,
  Users,
  FileCheck,
  Zap,
  FlaskConical,
  Package,
  Route,
  FileText,
  Truck as TruckIcon,
  Fuel,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMissionControl, type Industry } from "@/lib/mission-control-context"

interface TelemetryDashboardProps {
  city: string
}

interface CityMetrics {
  grip: number
  dirtyAir: number
  trackTemp: number
  sectorTimes: number
  fuelBurn: number
}

interface CityTrends {
  grip: "up" | "down" | "stable"
  dirtyAir: "up" | "down" | "stable"
  trackTemp: "up" | "down" | "stable"
  sectorTimes: "up" | "down" | "stable"
  fuelBurn: "up" | "down" | "stable"
}

interface CityIndustryData {
  name: string
  circuit: string
  fintech: { metrics: CityMetrics; trends: CityTrends }
  healthtech: { metrics: CityMetrics; trends: CityTrends }
  logistics: { metrics: CityMetrics; trends: CityTrends }
}

// City data mapped by BOTH city AND industry
const cityData: Record<string, CityIndustryData> = {
  bangalore: {
    name: "Bangalore",
    circuit: "Electronic City GP",
    fintech: {
      metrics: { grip: 85, dirtyAir: 42, trackTemp: 67, sectorTimes: 78, fuelBurn: 34 },
      trends: { grip: "up", dirtyAir: "down", trackTemp: "stable", sectorTimes: "up", fuelBurn: "down" },
    },
    healthtech: {
      metrics: { grip: 72, dirtyAir: 55, trackTemp: 78, sectorTimes: 68, fuelBurn: 45 },
      trends: { grip: "stable", dirtyAir: "up", trackTemp: "up", sectorTimes: "up", fuelBurn: "stable" },
    },
    logistics: {
      metrics: { grip: 88, dirtyAir: 38, trackTemp: 72, sectorTimes: 82, fuelBurn: 41 },
      trends: { grip: "up", dirtyAir: "stable", trackTemp: "down", sectorTimes: "up", fuelBurn: "down" },
    },
  },
  mumbai: {
    name: "Mumbai",
    circuit: "Marine Drive Circuit",
    fintech: {
      metrics: { grip: 72, dirtyAir: 68, trackTemp: 82, sectorTimes: 65, fuelBurn: 56 },
      trends: { grip: "stable", dirtyAir: "up", trackTemp: "up", sectorTimes: "down", fuelBurn: "up" },
    },
    healthtech: {
      metrics: { grip: 78, dirtyAir: 62, trackTemp: 75, sectorTimes: 71, fuelBurn: 52 },
      trends: { grip: "up", dirtyAir: "stable", trackTemp: "stable", sectorTimes: "up", fuelBurn: "stable" },
    },
    logistics: {
      metrics: { grip: 65, dirtyAir: 75, trackTemp: 88, sectorTimes: 58, fuelBurn: 68 },
      trends: { grip: "down", dirtyAir: "up", trackTemp: "up", sectorTimes: "down", fuelBurn: "up" },
    },
  },
  chennai: {
    name: "Chennai",
    circuit: "Marina Beach Track",
    fintech: {
      metrics: { grip: 91, dirtyAir: 35, trackTemp: 75, sectorTimes: 88, fuelBurn: 28 },
      trends: { grip: "up", dirtyAir: "stable", trackTemp: "down", sectorTimes: "up", fuelBurn: "down" },
    },
    healthtech: {
      metrics: { grip: 85, dirtyAir: 40, trackTemp: 82, sectorTimes: 79, fuelBurn: 38 },
      trends: { grip: "up", dirtyAir: "down", trackTemp: "stable", sectorTimes: "up", fuelBurn: "down" },
    },
    logistics: {
      metrics: { grip: 94, dirtyAir: 28, trackTemp: 70, sectorTimes: 91, fuelBurn: 25 },
      trends: { grip: "up", dirtyAir: "down", trackTemp: "stable", sectorTimes: "up", fuelBurn: "down" },
    },
  },
}

// Industry-specific icons
const industryIcons = {
  FinTech: {
    grip: CreditCard,
    dirtyAir: Wind,
    trackTemp: Shield,
    sectorTimes: Timer,
    fuelBurn: Wallet,
  },
  HealthTech: {
    grip: HeartPulse,
    dirtyAir: Users,
    trackTemp: FileCheck,
    sectorTimes: Zap,
    fuelBurn: FlaskConical,
  },
  Logistics: {
    grip: Package,
    dirtyAir: Route,
    trackTemp: FileText,
    sectorTimes: TruckIcon,
    fuelBurn: Fuel,
  },
}

// Map Industry type to cityData key
function getIndustryKey(industry: Industry): "fintech" | "healthtech" | "logistics" {
  const map: Record<Industry, "fintech" | "healthtech" | "logistics"> = {
    FinTech: "fintech",
    HealthTech: "healthtech",
    Logistics: "logistics",
  }
  return map[industry]
}

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up")
    return <TrendingUp className="h-3 w-3 text-[oklch(0.7_0.2_145)]" />
  if (trend === "down")
    return <TrendingDown className="h-3 w-3 text-[oklch(0.6_0.22_25)]" />
  return <Minus className="h-3 w-3 text-muted-foreground" />
}

export function TelemetryDashboard({ city }: TelemetryDashboardProps) {
  const cityInfo = cityData[city] || cityData.bangalore
  const { industry, metrics: industryMetrics, startupProfile } = useMissionControl()
  const icons = industryIcons[industry]
  
  // Get the correct data based on selected industry
  const industryKey = getIndustryKey(industry)
  const data = cityInfo[industryKey]

  // Create a unique key for forcing gauge re-animation
  const animationKey = `${city}-${industry}`

  return (
    <main className="flex-1 overflow-auto bg-background p-6 lg:p-8">
      {/* Live Commentary Ticker */}
      <div className="mb-6">
        <LiveCommentary />
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                {startupProfile.teamName ? `${startupProfile.teamName} Telemetry` : `${industry} Telemetry`}
              </h1>
              <Badge
                variant="outline"
                className="border-[oklch(0.7_0.2_145)] bg-[oklch(0.7_0.2_145/0.1)] text-[oklch(0.7_0.2_145)]"
              >
                LIVE
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Real-time {industry.toLowerCase()} intelligence for{" "}
              <span className="font-medium text-[oklch(0.8_0.18_195)]">
                {cityInfo.circuit}
              </span>
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>
        </div>
      </header>

      {/* Telemetry Grid - Dynamic Industry Metrics with animation key */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="relative" key={`grip-${animationKey}`}>
          <TelemetryGauge
            label={industryMetrics.grip.label}
            subLabel={industryMetrics.grip.subLabel}
            value={data.metrics.grip}
            maxValue={100}
            icon={icons.grip}
            color="cyan"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.grip} />
          </div>
        </div>

        <div className="relative" key={`dirtyAir-${animationKey}`}>
          <TelemetryGauge
            label={industryMetrics.dirtyAir.label}
            subLabel={industryMetrics.dirtyAir.subLabel}
            value={data.metrics.dirtyAir}
            maxValue={100}
            icon={icons.dirtyAir}
            color="purple"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.dirtyAir} />
          </div>
        </div>

        <div className="relative" key={`trackTemp-${animationKey}`}>
          <TelemetryGauge
            label={industryMetrics.trackTemp.label}
            subLabel={industryMetrics.trackTemp.subLabel}
            value={data.metrics.trackTemp}
            maxValue={100}
            icon={icons.trackTemp}
            color="orange"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.trackTemp} />
          </div>
        </div>

        <div className="relative" key={`sectorTimes-${animationKey}`}>
          <TelemetryGauge
            label={industryMetrics.sectorTimes.label}
            subLabel={industryMetrics.sectorTimes.subLabel}
            value={data.metrics.sectorTimes}
            maxValue={100}
            icon={icons.sectorTimes}
            color="green"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.sectorTimes} />
          </div>
        </div>

        <div className="relative sm:col-span-2 lg:col-span-1" key={`fuelBurn-${animationKey}`}>
          <TelemetryGauge
            label={industryMetrics.fuelBurn.label}
            subLabel={industryMetrics.fuelBurn.subLabel}
            value={data.metrics.fuelBurn}
            maxValue={100}
            icon={icons.fuelBurn}
            color="red"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.fuelBurn} />
          </div>
        </div>
      </div>

      {/* Race Engineer's Report - now also keyed for re-animation */}
      <div className="mt-8" key={`report-${animationKey}`}>
        <RaceEngineerReport city={city} />
      </div>

      {/* Summary Section - now using industry-specific data */}
      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">
          Market Summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Overall Score
            </p>
            <p className="mt-1 text-2xl font-bold text-[oklch(0.8_0.18_195)]">
              {Math.round(
                (data.metrics.grip +
                  (100 - data.metrics.dirtyAir) +
                  data.metrics.sectorTimes +
                  (100 - data.metrics.fuelBurn)) /
                  4
              )}
              /100
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Market Position
            </p>
            <p className="mt-1 text-2xl font-bold text-[oklch(0.65_0.2_290)]">
              P{city === "chennai" ? 1 : city === "bangalore" ? 2 : 3}
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Growth Potential
            </p>
            <p className="mt-1 text-2xl font-bold text-[oklch(0.7_0.2_145)]">
              {data.metrics.sectorTimes > 75 ? "High" : data.metrics.sectorTimes > 50 ? "Medium" : "Low"}
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Risk Level
            </p>
            <p
              className={`mt-1 text-2xl font-bold ${
                data.metrics.fuelBurn > 50
                  ? "text-[oklch(0.6_0.22_25)]"
                  : data.metrics.fuelBurn > 30
                    ? "text-[oklch(0.75_0.15_55)]"
                    : "text-[oklch(0.7_0.2_145)]"
              }`}
            >
              {data.metrics.fuelBurn > 50 ? "High" : data.metrics.fuelBurn > 30 ? "Medium" : "Low"}
            </p>
          </div>
        </div>
      </section>

      {/* Global Comparison Table */}
      <div className="mt-8">
        <GlobalComparison />
      </div>
    </main>
  )
}

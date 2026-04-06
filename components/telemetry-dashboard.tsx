"use client"

import { TelemetryGauge } from "./telemetry-gauge"
import { LiveCommentary } from "./live-commentary"
import { GlobalComparison } from "./global-comparison"
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
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TelemetryDashboardProps {
  city: string
}

const cityData: Record<
  string,
  {
    name: string
    circuit: string
    metrics: {
      transactionVolume: number
      competition: number
      compliance: number
      growthRate: number
      operationalCost: number
    }
    trends: {
      transactionVolume: "up" | "down" | "stable"
      competition: "up" | "down" | "stable"
      compliance: "up" | "down" | "stable"
      growthRate: "up" | "down" | "stable"
      operationalCost: "up" | "down" | "stable"
    }
  }
> = {
  bangalore: {
    name: "Bangalore",
    circuit: "Electronic City GP",
    metrics: {
      transactionVolume: 85,
      competition: 42,
      compliance: 67,
      growthRate: 78,
      operationalCost: 34,
    },
    trends: {
      transactionVolume: "up",
      competition: "down",
      compliance: "stable",
      growthRate: "up",
      operationalCost: "down",
    },
  },
  mumbai: {
    name: "Mumbai",
    circuit: "Marine Drive Circuit",
    metrics: {
      transactionVolume: 72,
      competition: 68,
      compliance: 82,
      growthRate: 65,
      operationalCost: 56,
    },
    trends: {
      transactionVolume: "stable",
      competition: "up",
      compliance: "up",
      growthRate: "down",
      operationalCost: "up",
    },
  },
  chennai: {
    name: "Chennai",
    circuit: "Marina Beach Track",
    metrics: {
      transactionVolume: 91,
      competition: 35,
      compliance: 75,
      growthRate: 88,
      operationalCost: 28,
    },
    trends: {
      transactionVolume: "up",
      competition: "stable",
      compliance: "down",
      growthRate: "up",
      operationalCost: "down",
    },
  },
}

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up")
    return <TrendingUp className="h-3 w-3 text-[oklch(0.7_0.2_145)]" />
  if (trend === "down")
    return <TrendingDown className="h-3 w-3 text-[oklch(0.6_0.22_25)]" />
  return <Minus className="h-3 w-3 text-muted-foreground" />
}

export function TelemetryDashboard({ city }: TelemetryDashboardProps) {
  const data = cityData[city] || cityData.bangalore

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
                FinTech Telemetry
              </h1>
              <Badge
                variant="outline"
                className="border-[oklch(0.7_0.2_145)] bg-[oklch(0.7_0.2_145/0.1)] text-[oklch(0.7_0.2_145)]"
              >
                LIVE
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Real-time market intelligence for{" "}
              <span className="font-medium text-[oklch(0.8_0.18_195)]">
                {data.circuit}
              </span>
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>
        </div>
      </header>

      {/* Telemetry Grid - FinTech Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="relative">
          <TelemetryGauge
            label="Transaction Volume"
            subLabel="Market Demand"
            value={data.metrics.transactionVolume}
            maxValue={100}
            icon={CreditCard}
            color="cyan"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.transactionVolume} />
          </div>
        </div>

        <div className="relative">
          <TelemetryGauge
            label="Competition"
            subLabel="Market Density"
            value={data.metrics.competition}
            maxValue={100}
            icon={Wind}
            color="purple"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.competition} />
          </div>
        </div>

        <div className="relative">
          <TelemetryGauge
            label="Compliance"
            subLabel="Regulatory Index"
            value={data.metrics.compliance}
            maxValue={100}
            icon={Shield}
            color="orange"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.compliance} />
          </div>
        </div>

        <div className="relative">
          <TelemetryGauge
            label="Growth Rate"
            subLabel="Sector Velocity"
            value={data.metrics.growthRate}
            maxValue={100}
            icon={Timer}
            color="green"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.growthRate} />
          </div>
        </div>

        <div className="relative sm:col-span-2 lg:col-span-1">
          <TelemetryGauge
            label="Operational Cost"
            subLabel="Burn Rate"
            value={data.metrics.operationalCost}
            maxValue={100}
            icon={Wallet}
            color="red"
          />
          <div className="absolute right-4 top-4">
            <TrendIcon trend={data.trends.operationalCost} />
          </div>
        </div>
      </div>

      {/* Summary Section */}
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
                (data.metrics.transactionVolume +
                  (100 - data.metrics.competition) +
                  data.metrics.growthRate +
                  (100 - data.metrics.operationalCost)) /
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
              {data.metrics.growthRate > 75 ? "High" : data.metrics.growthRate > 50 ? "Medium" : "Low"}
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Risk Level
            </p>
            <p
              className={`mt-1 text-2xl font-bold ${
                data.metrics.operationalCost > 50
                  ? "text-[oklch(0.6_0.22_25)]"
                  : data.metrics.operationalCost > 30
                    ? "text-[oklch(0.75_0.15_55)]"
                    : "text-[oklch(0.7_0.2_145)]"
              }`}
            >
              {data.metrics.operationalCost > 50 ? "High" : data.metrics.operationalCost > 30 ? "Medium" : "Low"}
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

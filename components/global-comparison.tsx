"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Trophy,
} from "lucide-react"
import { useMissionControl, type Industry } from "@/lib/mission-control-context"

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

interface CityData {
  id: string
  name: string
  circuit: string
  fintech: { metrics: CityMetrics; trends: CityTrends }
  healthtech: { metrics: CityMetrics; trends: CityTrends }
  logistics: { metrics: CityMetrics; trends: CityTrends }
}

// City data mapped by BOTH city AND industry
const citiesData: CityData[] = [
  {
    id: "bangalore",
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
  {
    id: "mumbai",
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
  {
    id: "chennai",
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
]

const metricKeys = ["grip", "dirtyAir", "trackTemp", "sectorTimes", "fuelBurn"] as const

function getIndustryKey(industry: Industry): "fintech" | "healthtech" | "logistics" {
  const map: Record<Industry, "fintech" | "healthtech" | "logistics"> = {
    FinTech: "fintech",
    HealthTech: "healthtech",
    Logistics: "logistics",
  }
  return map[industry]
}

function calculateOverallScore(metrics: CityMetrics): number {
  return Math.round(
    (metrics.grip + (100 - metrics.dirtyAir) + metrics.sectorTimes + (100 - metrics.fuelBurn)) / 4
  )
}

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up")
    return <TrendingUp className="h-3 w-3 text-[oklch(0.7_0.2_145)]" />
  if (trend === "down")
    return <TrendingDown className="h-3 w-3 text-[oklch(0.6_0.22_25)]" />
  return <Minus className="h-3 w-3 text-muted-foreground" />
}

function getMetricColor(metric: string, value: number): string {
  // For competition and operational cost, lower is better
  if (metric === "dirtyAir" || metric === "fuelBurn") {
    if (value < 40) return "text-[oklch(0.7_0.2_145)]"
    if (value < 60) return "text-[oklch(0.75_0.15_55)]"
    return "text-[oklch(0.6_0.22_25)]"
  }
  // For other metrics, higher is better
  if (value > 75) return "text-[oklch(0.7_0.2_145)]"
  if (value > 50) return "text-[oklch(0.75_0.15_55)]"
  return "text-[oklch(0.6_0.22_25)]"
}

export function GlobalComparison() {
  const { metrics: industryMetrics, industry } = useMissionControl()
  const industryKey = getIndustryKey(industry)
  
  // Compute rankings based on current industry
  const citiesWithScores = citiesData.map((city) => {
    const data = city[industryKey]
    return {
      ...city,
      metrics: data.metrics,
      trends: data.trends,
      overallScore: calculateOverallScore(data.metrics),
    }
  })

  // Sort by overall score (descending) to determine ranks
  const sortedCities = [...citiesWithScores].sort((a, b) => b.overallScore - a.overallScore)
  const rankedCities = sortedCities.map((city, index) => ({
    ...city,
    rank: index + 1,
  }))

  // Map metric keys to their labels from the current industry
  const getMetricLabel = (key: typeof metricKeys[number]): string => {
    return industryMetrics[key].label
  }

  // Animation key for re-rendering on industry change
  const animationKey = `comparison-${industry}`

  return (
    <section className="rounded-xl border border-border bg-card" key={animationKey}>
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Global Circuit Comparison
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Side-by-side {industry.toLowerCase()} telemetry across all circuits
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[oklch(0.8_0.18_195/0.1)] px-3 py-1.5">
            <Trophy className="h-4 w-4 text-[oklch(0.8_0.18_195)]" />
            <span className="text-sm font-medium text-[oklch(0.8_0.18_195)]">
              Q1 2026 Rankings
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Circuit
              </th>
              {metricKeys.map((key) => (
                <th
                  key={key}
                  className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {getMetricLabel(key)}
                </th>
              ))}
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overall
              </th>
            </tr>
          </thead>
          <tbody>
            {rankedCities.map((city, index) => (
              <motion.tr
                key={`${city.id}-${industry}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border last:border-0 hover:bg-secondary/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold ${
                        city.rank === 1
                          ? "bg-[oklch(0.8_0.18_195/0.2)] text-[oklch(0.8_0.18_195)]"
                          : city.rank === 2
                            ? "bg-[oklch(0.65_0.2_290/0.2)] text-[oklch(0.65_0.2_290)]"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      P{city.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {city.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {city.circuit}
                      </p>
                    </div>
                  </div>
                </td>
                {metricKeys.map((metricKey) => (
                    <td key={`${metricKey}-${industry}`} className="px-4 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-lg font-bold tabular-nums ${getMetricColor(
                              metricKey,
                              city.metrics[metricKey]
                            )}`}
                          >
                            {city.metrics[metricKey]}
                          </span>
                          <TrendIcon trend={city.trends[metricKey]} />
                        </div>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            key={`bar-${city.id}-${metricKey}-${industry}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${city.metrics[metricKey]}%` }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                            className={`h-full rounded-full ${
                              metricKey === "dirtyAir" ||
                              metricKey === "fuelBurn"
                                ? city.metrics[metricKey] < 40
                                  ? "bg-[oklch(0.7_0.2_145)]"
                                  : city.metrics[metricKey] < 60
                                    ? "bg-[oklch(0.75_0.15_55)]"
                                    : "bg-[oklch(0.6_0.22_25)]"
                                : city.metrics[metricKey] > 75
                                  ? "bg-[oklch(0.7_0.2_145)]"
                                  : city.metrics[metricKey] > 50
                                    ? "bg-[oklch(0.75_0.15_55)]"
                                    : "bg-[oklch(0.6_0.22_25)]"
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                  )
                )}
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-2xl font-bold ${
                        city.overallScore > 80
                          ? "text-[oklch(0.7_0.2_145)]"
                          : city.overallScore > 65
                            ? "text-[oklch(0.75_0.15_55)]"
                            : "text-[oklch(0.6_0.22_25)]"
                      }`}
                    >
                      {city.overallScore}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /100
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

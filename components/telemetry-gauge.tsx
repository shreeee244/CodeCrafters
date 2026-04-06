"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"

interface TelemetryGaugeProps {
  label: string
  subLabel: string
  value: number
  maxValue: number
  icon: LucideIcon
  color: "cyan" | "purple" | "green" | "orange" | "red"
  unit?: string
}

const colorClasses = {
  cyan: {
    stroke: "stroke-[oklch(0.8_0.18_195)]",
    fill: "fill-[oklch(0.8_0.18_195)]",
    text: "text-[oklch(0.8_0.18_195)]",
    glow: "drop-shadow-[0_0_12px_oklch(0.8_0.18_195)]",
    bg: "bg-[oklch(0.8_0.18_195/0.1)]",
  },
  purple: {
    stroke: "stroke-[oklch(0.65_0.2_290)]",
    fill: "fill-[oklch(0.65_0.2_290)]",
    text: "text-[oklch(0.65_0.2_290)]",
    glow: "drop-shadow-[0_0_12px_oklch(0.65_0.2_290)]",
    bg: "bg-[oklch(0.65_0.2_290/0.1)]",
  },
  green: {
    stroke: "stroke-[oklch(0.7_0.2_145)]",
    fill: "fill-[oklch(0.7_0.2_145)]",
    text: "text-[oklch(0.7_0.2_145)]",
    glow: "drop-shadow-[0_0_12px_oklch(0.7_0.2_145)]",
    bg: "bg-[oklch(0.7_0.2_145/0.1)]",
  },
  orange: {
    stroke: "stroke-[oklch(0.75_0.15_55)]",
    fill: "fill-[oklch(0.75_0.15_55)]",
    text: "text-[oklch(0.75_0.15_55)]",
    glow: "drop-shadow-[0_0_12px_oklch(0.75_0.15_55)]",
    bg: "bg-[oklch(0.75_0.15_55/0.1)]",
  },
  red: {
    stroke: "stroke-[oklch(0.6_0.22_25)]",
    fill: "fill-[oklch(0.6_0.22_25)]",
    text: "text-[oklch(0.6_0.22_25)]",
    glow: "drop-shadow-[0_0_12px_oklch(0.6_0.22_25)]",
    bg: "bg-[oklch(0.6_0.22_25/0.1)]",
  },
}

export function TelemetryGauge({
  label,
  subLabel,
  value,
  maxValue,
  icon: Icon,
  color,
  unit = "%",
}: TelemetryGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const percentage = (animatedValue / maxValue) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      const duration = 1500
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setAnimatedValue(Math.round(value * easeOut))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, 200)
    return () => clearTimeout(timer)
  }, [value])

  const colors = colorClasses[color]

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Background glow effect */}
      <div
        className={`absolute -top-20 -right-20 h-40 w-40 rounded-full ${colors.bg} blur-3xl`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </h3>
            <p className={`text-xs ${colors.text} mt-0.5`}>{subLabel}</p>
          </div>
          <div className={`rounded-lg ${colors.bg} p-2`}>
            <Icon className={`h-5 w-5 ${colors.text}`} />
          </div>
        </div>

        {/* Gauge */}
        <div className="relative mx-auto w-fit">
          <svg className="h-40 w-40 -rotate-135" viewBox="0 0 100 100">
            {/* Background arc */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className="stroke-secondary"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            />
            {/* Animated value arc */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className={`${colors.stroke} ${colors.glow} transition-all duration-300`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: "stroke-dashoffset 0.3s ease-out",
              }}
            />
          </svg>

          {/* Center value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${colors.text} tabular-nums`}>
              {animatedValue}
            </span>
            <span className="text-xs text-muted-foreground">{unit}</span>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${colors.bg} ${colors.text}`}>
              <div className={`h-2 w-2 rounded-full ${colors.stroke.replace("stroke-", "bg-")} animate-pulse`} />
            </div>
            <span className="text-muted-foreground">Live</span>
          </div>
          <span className="text-muted-foreground">
            Max: {maxValue}
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}

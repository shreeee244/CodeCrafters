"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Flag,
  Zap,
  BarChart3,
  Target,
  Shield,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
  Gauge,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const steps = [
  {
    icon: Gauge,
    title: "Qualify",
    description: "Connect your data sources and set your market parameters for real-time tracking.",
  },
  {
    icon: Activity,
    title: "Race",
    description: "Monitor live telemetry across all circuits - transaction volume, competition, and growth.",
  },
  {
    icon: Target,
    title: "Podium",
    description: "Make data-driven decisions and capture market share ahead of your competition.",
  },
]

const features = [
  {
    icon: Zap,
    title: "Real-Time Telemetry",
    description: "Live market data streaming at 60fps for instant decision-making.",
  },
  {
    icon: BarChart3,
    title: "Multi-Circuit Analysis",
    description: "Compare markets across Bangalore, Mumbai, and Chennai simultaneously.",
  },
  {
    icon: Shield,
    title: "Regulatory Intelligence",
    description: "Track compliance metrics and regulatory changes in real-time.",
  },
  {
    icon: TrendingUp,
    title: "Growth Vectors",
    description: "AI-powered predictions for sector timing and market entry points.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[oklch(0.8_0.18_195/0.08)] blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[oklch(0.65_0.2_290/0.08)] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-32">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[oklch(0.8_0.18_195/0.3)] bg-[oklch(0.8_0.18_195/0.1)] px-4 py-1.5 text-sm text-[oklch(0.8_0.18_195)]"
            >
              <Clock className="h-4 w-4" />
              <span>FinTech Market Intelligence</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Race to{" "}
              <span className="bg-gradient-to-r from-[oklch(0.8_0.18_195)] to-[oklch(0.65_0.2_290)] bg-clip-text text-transparent">
                Market Victory
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground lg:text-xl"
            >
              F1-inspired market intelligence for FinTech leaders. Track transaction volume, 
              competition dynamics, and regulatory conditions across India&apos;s top financial circuits.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/login"
                className="group flex items-center gap-2 rounded-lg bg-[oklch(0.8_0.18_195)] px-6 py-3 text-base font-semibold text-background transition-all hover:bg-[oklch(0.85_0.18_195)] hover:shadow-[0_0_30px_oklch(0.8_0.18_195/0.5)]"
              >
                Launch Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-lg border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {[
              { value: "3", label: "Circuits" },
              { value: "5", label: "Telemetry Sensors" },
              { value: "60fps", label: "Data Refresh" },
              { value: "24/7", label: "Live Monitoring" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card/50 p-4 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-[oklch(0.8_0.18_195)] lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works - F1 Themed */}
      <section id="how-it-works" className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Race Strategy
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three phases to market dominance, just like winning a Grand Prix.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-12 hidden h-0.5 w-1/2 bg-gradient-to-r from-[oklch(0.8_0.18_195/0.5)] to-transparent lg:block" />
                )}
                
                <div className="relative rounded-xl border border-border bg-card p-6 transition-all hover:border-[oklch(0.8_0.18_195/0.5)] hover:shadow-[0_0_30px_oklch(0.8_0.18_195/0.1)]">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[oklch(0.8_0.18_195/0.15)]">
                      <step.icon className="h-6 w-6 text-[oklch(0.8_0.18_195)]" />
                    </div>
                    <span className="text-4xl font-bold text-[oklch(0.65_0.2_290/0.3)]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pit Crew Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to make split-second market decisions.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-[oklch(0.65_0.2_290/0.5)] hover:shadow-[0_0_30px_oklch(0.65_0.2_290/0.1)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.65_0.2_290/0.15)]">
                  <feature.icon className="h-5 w-5 text-[oklch(0.65_0.2_290)]" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.8_0.18_195/0.15)]">
              <Flag className="h-8 w-8 text-[oklch(0.8_0.18_195)]" />
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Take Pole Position?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join the elite FinTech teams using MarketPrix to outpace their competition.
            </p>
            <div className="mt-10">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 rounded-lg bg-[oklch(0.8_0.18_195)] px-8 py-4 text-lg font-semibold text-background transition-all hover:bg-[oklch(0.85_0.18_195)] hover:shadow-[0_0_40px_oklch(0.8_0.18_195/0.5)]"
              >
                Start Your Engine
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-[oklch(0.8_0.18_195)]" />
              <span className="font-semibold text-foreground">MarketPrix</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 MarketPrix. FinTech Market Intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

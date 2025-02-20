"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { ChartData , WeeklyData, MonthlyData } from "@/types/chartdata"

interface UserMetricsChartProps {
  chartData: (ChartData | WeeklyData | MonthlyData)[]
  chartView: "day" | "week" | "month"
  onChartViewChange: (view: "day" | "week" | "month") => void
}

const UserMetricsChart: React.FC<UserMetricsChartProps> = ({ chartData, chartView, onChartViewChange }) => {
  const [visibleLines, setVisibleLines] = useState({
    activeUsers: true,
    newUsers: true,
    premiumUsers: true,
  })

  const handleLegendClick = (dataKey: string) => {
    if (!dataKey) return
    setVisibleLines((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey as keyof typeof prev],
    }))
  }

  const formatXAxis = (tickItem: any) => {
    if (chartView === "day") {
      return new Date(tickItem).toLocaleDateString()
    }
    if (chartView === "week") {
      return `Week ${tickItem}`
    }
    return `Month ${tickItem}`
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">User Metrics Over Time</h3>
      <div className="mb-4 space-x-2">
        <Button onClick={() => onChartViewChange("day")} variant={chartView === "day" ? "default" : "outline"}>
          Day
        </Button>
        <Button onClick={() => onChartViewChange("week")} variant={chartView === "week" ? "default" : "outline"}>
          Week
        </Button>
        <Button onClick={() => onChartViewChange("month")} variant={chartView === "month" ? "default" : "outline"}>
          Month
        </Button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={chartView === "day" ? "date" : chartView === "week" ? "week" : "month"} 
              tickFormatter={formatXAxis}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(label) => formatXAxis(label)}
            />
            <Legend
              onClick={(e) => {
                if (typeof e.dataKey === "string") {
                  handleLegendClick(e.dataKey)
                }
              }}
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="#8884d8"
              name="Active Users"
              hide={!visibleLines.activeUsers}
            />
            <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" name="New Users" hide={!visibleLines.newUsers} />
            <Line
              type="monotone"
              dataKey="premiumUsers"
              stroke="#ffc658"
              name="Premium Users"
              hide={!visibleLines.premiumUsers}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default UserMetricsChart
import type { ChartData, WeeklyData, MonthlyData } from "@/types/chartdata"

export const processChartData = (dailyData: ChartData[], chartView: "day" | "week" | "month") => {
  const weeklyData: WeeklyData[] = []
  const monthlyData: MonthlyData[] = []

  // Group data by week
  const weekMap = new Map<number, ChartData[]>()
  dailyData.forEach(day => {
    const weekNumber = getWeekNumber(day.date)
    if (!weekMap.has(weekNumber)) {
      weekMap.set(weekNumber, [])
    }
    weekMap.get(weekNumber)!.push(day)
  })

  // Calculate weekly averages
  weekMap.forEach((days, weekNumber) => {
    weeklyData.push({
      week: weekNumber,
      activeUsers: Math.round(days.reduce((sum: number, day: ChartData) => sum + day.activeUsers, 0) / days.length),
      newUsers: Math.round(days.reduce((sum: number, day: ChartData) => sum + day.newUsers, 0) / days.length),
      premiumUsers: Math.round(days.reduce((sum: number, day: ChartData) => sum + day.premiumUsers, 0) / days.length),
    })
  })

  // Calculate monthly average
  monthlyData.push({
    month: dailyData[0].date.getMonth() + 1,
    activeUsers: Math.round(dailyData.reduce((sum, day) => sum + day.activeUsers, 0) / dailyData.length),
    newUsers: Math.round(dailyData.reduce((sum, day) => sum + day.newUsers, 0) / dailyData.length),
    premiumUsers: Math.round(dailyData.reduce((sum, day) => sum + day.premiumUsers, 0) / dailyData.length),
  })

  const chartData: (ChartData | WeeklyData | MonthlyData)[] = 
    chartView === "week" ? weeklyData : chartView === "month" ? monthlyData : dailyData

  const totalActiveUsers = dailyData.reduce((sum, day) => sum + day.activeUsers, 0)

  return { chartData, totalActiveUsers }
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
}
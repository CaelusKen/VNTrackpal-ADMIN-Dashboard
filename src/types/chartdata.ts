export interface ChartData {
  date: Date
  activeUsers: number
  newUsers: number
  premiumUsers: number
}

export interface WeeklyData {
  week: number
  activeUsers: number
  newUsers: number
  premiumUsers: number
}

export interface MonthlyData {
  month: number
  activeUsers: number
  newUsers: number
  premiumUsers: number
}
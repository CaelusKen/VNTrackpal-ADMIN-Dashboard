const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const generateRandomData = (year: number, month: number, seed = 42) => {
  const data = []
  const daysInMonth = new Date(year, month, 0).getDate()
  
  for (let i = 1; i <= daysInMonth; i++) {
    data.push({
      date: new Date(year, month - 1, i), // month is 0-indexed in Date constructor
      activeUsers: Math.floor(seededRandom(seed + i) * 100) + 200,
      newUsers: Math.floor(seededRandom(seed + i * 2) * 10) + 5,
      premiumUsers: Math.floor(seededRandom(seed + i * 3) * 50) + 10,
    })
  }
  return data
}
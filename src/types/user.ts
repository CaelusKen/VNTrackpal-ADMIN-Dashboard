export interface User {
    id: number
    name: string
    email: string
    status: "active" | "disabled"
    subscription: "free" | "premium"
  }
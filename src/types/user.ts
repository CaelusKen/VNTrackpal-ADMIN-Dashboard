export interface User {
  id: number
  name: string
  email: string
  status: "active" | "inactive" | "banned";
  subscription: "free" | "premium"
}
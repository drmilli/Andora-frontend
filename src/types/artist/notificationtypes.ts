export interface Notification {
  userId: string
  message: string
  isread: boolean
  type: string
  createdAt: string
}

export type Notifications = Notification[];
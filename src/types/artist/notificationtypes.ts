export interface Notification {
  id: string
  userId: string
  message: string
  isRead: boolean
  type: string
  createdAt: string
}

export type Notifications = Notification[];
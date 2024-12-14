'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react'
import { Notification } from '@/lib/mock-data'

interface NotificationsModalProps {
  notifications: Notification[]
  markAsRead: (id: string) => void
}

export function NotificationsModal({ notifications, markAsRead }: NotificationsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative rounded-full h-10 w-10 p-0">
          <Bell className="h-4 w-4" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-0 right-0 h-3 w-3 bg-primary rounded-full animate-bounce"></span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="text-2xl mr-2" role="img" aria-label="Bell">🔔</span>
            Notifications
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 border-b last:border-b-0 ${notification.read ? 'bg-muted/50' : 'bg-card'} hover:bg-accent transition-colors cursor-pointer`}
                onClick={() => markAsRead(notification.id)}
              >
                <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'text-foreground font-semibold'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">No notifications</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


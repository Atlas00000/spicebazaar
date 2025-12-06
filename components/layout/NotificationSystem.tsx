/**
 * NotificationSystem Component
 * Toast notification manager
 */

"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  showNotification: (notification: Omit<Notification, 'id'>) => void
  hideNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

/**
 * Notification Provider
 */
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications((prev) => [...prev, newNotification])

    if (notification.duration !== Infinity) {
      setTimeout(() => {
        hideNotification(id)
      }, notification.duration || 5000)
    }
  }, [])

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, hideNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

/**
 * Notification Container
 */
const NotificationContainer = () => {
  const { notifications, hideNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            notification={notification}
            onClose={() => hideNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * Toast Component
 */
const Toast = ({
  notification,
  onClose,
}: {
  notification: Notification
  onClose: () => void
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colors = {
    success: 'border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100',
    error: 'border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100',
    warning: 'border-amber-500 bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-100',
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100',
  }

  return (
    <motion.div
      className={cn(
        'relative p-4 rounded-lg border-l-4 shadow-lg backdrop-blur-sm',
        'bg-card/95',
        colors[notification.type]
      )}
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      layout
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icons[notification.type]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">
            {notification.title}
          </h4>
          {notification.message && (
            <p className="text-sm opacity-90 mt-1">
              {notification.message}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

/**
 * Hook to use notifications
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}

/**
 * Helper functions for common notifications
 */
export const notify = {
  success: (title: string, message?: string, duration?: number) => {
    const { showNotification } = useNotifications()
    showNotification({ type: 'success', title, message, duration })
  },
  error: (title: string, message?: string, duration?: number) => {
    const { showNotification } = useNotifications()
    showNotification({ type: 'error', title, message, duration })
  },
  warning: (title: string, message?: string, duration?: number) => {
    const { showNotification } = useNotifications()
    showNotification({ type: 'warning', title, message, duration })
  },
  info: (title: string, message?: string, duration?: number) => {
    const { showNotification } = useNotifications()
    showNotification({ type: 'info', title, message, duration })
  },
}


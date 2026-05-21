import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocalNotifications } from '@capacitor/local-notifications'
import App from './app/App'
import './styles/index.css'

const PENDING_NOTIFICATION_REMINDER_ID_KEY = 'reminderly.pendingNotificationReminderId'
const NOTIFICATION_TAP_EVENT = 'reminderly:notification-tap'

void LocalNotifications.addListener('localNotificationActionPerformed', (event) => {
  const reminderId = event.notification.extra?.reminderId
  if (typeof reminderId !== 'string') return

  localStorage.setItem(PENDING_NOTIFICATION_REMINDER_ID_KEY, reminderId)
  window.dispatchEvent(new CustomEvent(NOTIFICATION_TAP_EVENT))
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

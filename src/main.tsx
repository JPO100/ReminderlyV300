import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocalNotifications } from '@capacitor/local-notifications'
import App from './app/App'
import './styles/index.css'

const PENDING_NOTIFICATION_REMINDER_ID_KEY = 'reminderly.pendingNotificationReminderId'
const NOTIFICATION_TAP_EVENT = 'reminderly:notification-tap'

const PENDING_SIRI_TEXT_KEY = 'reminderly.pendingSiriText'
const SIRI_ADD_EVENT = 'reminderly:siri-add'

void LocalNotifications.addListener('localNotificationActionPerformed', (event) => {
  const reminderId = event.notification.extra?.reminderId
  if (typeof reminderId !== 'string') return

  localStorage.setItem(PENDING_NOTIFICATION_REMINDER_ID_KEY, reminderId)
  window.dispatchEvent(new CustomEvent(NOTIFICATION_TAP_EVENT))
})

const CapacitorPlugins = (window as any).Capacitor?.Plugins?.App;
if (CapacitorPlugins) {
  void CapacitorPlugins.addListener('appUrlOpen', (data: { url: string }) => {
    try {
      const url = new URL(data.url)
      if (url.protocol === 'reminderly:' && url.hostname === 'add') {
        const text = url.searchParams.get('text')
        if (text) {
          localStorage.setItem(PENDING_SIRI_TEXT_KEY, text)
          window.dispatchEvent(new CustomEvent(SIRI_ADD_EVENT))
        }
      }
    } catch {
      // Ignore malformed URLs
    }
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

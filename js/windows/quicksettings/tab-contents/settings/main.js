import Toggles from './toggles/main.js'
import NotificationList from './notification-list/main.js'
import { options } from '../../../../constants/main.js'

const Calendar = Widget.Box({
  className: 'calendar',
  children: [ Widget.Calendar({ hexpand: true, hpack: 'center' }) ]
})

export default Widget.Box({
  vertical: true,
  className: 'content',
  spacing: options.spacing.value * 2,
  children: [ Toggles, NotificationList, Calendar ]
})
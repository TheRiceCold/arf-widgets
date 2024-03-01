import icons from 'data/icons'
import Avatar from './Avatar'
import ClockBox from './ClockBox'

const SysButtons = [
  Widget.Button({
    vpack: 'center',
    child: Widget.Icon(icons.ui.lock),
    // onClicked: () => bash`hyprctl reload`,
  }),
  Widget.Button({
    vpack: 'center',
    child: Widget.Icon(icons.powermenu.shutdown),
    onClicked: () => App.openWindow('powermenu'),
  })
]

export default Widget.Box({
  className: 'header',
  children: [ Avatar, ClockBox ].concat(SysButtons)
})
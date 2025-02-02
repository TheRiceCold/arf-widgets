import screen from 'service/screen'
import popups, { PopType } from 'service/popups'

import ButtonRevealer from '../ButtonRevealer'

const toggle = (pop: PopType) => popups.toggle(pop)

export default ButtonRevealer('left', [
  { label: 'Capture', onClicked() { toggle('capture') } },
  { label: 'Draw', onClicked: screen.draw },
  { label: 'Magnify', onClicked() { toggle('magnify') } },
  { label: 'Color', onClicked() { toggle('color') } },
  { label: 'Keyboard', onClicked() { toggle('keyboard') } },
])

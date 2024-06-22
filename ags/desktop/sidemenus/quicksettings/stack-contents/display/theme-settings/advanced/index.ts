import { Title } from '..'

import { Item } from '..'
import ListRevealer from '../../../ListRevealer'

import options from 'options'

const { focus, shortBreak, longBreak } = options.popups.pomodoro
const { crypto, quotes, player, system, weather } = options.lockscreen

export default Widget.Box(
  { vertical: true, className: 'advanced-stack' },
  Title({ label: 'Advanced', leftTo: 'themes', rightTo: 'general' }),
  ListRevealer('Lockscreen Widgets', Widget.Box(
    { vertical: true },
    Item('Crypto', { opt: crypto }),
    Item('Quotes', { opt: quotes }),
    Item('Player', { opt: player }),
    Item('System', { opt: system }),
    Item('Weather', { opt: weather }),
  )),
  ListRevealer('Pomodoro', Widget.Box(
    { vertical: true },
    Item('Focus Minutes', { opt: focus }),
    Item('Short Break Minutes', { opt: shortBreak }),
    Item('Long Break Minutes', { opt: longBreak }),
  )),
  ListRevealer('API keys', Widget.Box({ vertical: true })),
)

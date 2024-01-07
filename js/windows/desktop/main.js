import { Widget } from '../../imports.js'
import { Clock } from '../../misc/main.js'

const TimeDate = Widget.Box({
  hpack: 'start',
  vpack: 'start',
  vertical: true,
  css: ' margin: 4rem; padding: 1rem; ',
  children: [
    Clock({ 
      interval: 5000,
      format: '%I:%M %p',
      css: ' font-size: 6rem; border: 4px solid white;'
    }),
    Clock({ 
      interval: 5000,
      format: '%A, %m/%d/%Y',
      css: 'font-size: 3rem;',
    })
  ],
})

export default Widget.Window({
  name: 'desktop',
  child: TimeDate,
  layer: 'background',
  className: 'desktop',
  anchor: ['top', 'bottom', 'left', 'right'],
})

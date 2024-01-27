import { Widget } from '../../../imports.js'

import Buttons from './Buttons.js'

import { variables } from '../../../constants/main.js'

const Uptime = Widget.Label({
  hpack: 'center',
  className: 'txt-small',
  binds: [[ 'label', variables.uptime, 'value', v => `System uptime: ${v}` ]],
})

export default Widget.Box({
  className: 'spacing-h-5',
  children: [ 
    Uptime, 
    Widget.Box({ hexpand: true }) 
  ].concat(Buttons)
})
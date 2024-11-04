import { type ButtonProps } from 'types/widgets/button'

import {
  LogoButton,
  Workspaces,
  AiButton,
  RunButton,
  ToolsButton,
  SettingsButton,
  LeftButtonsRevealer,
} from './buttons'
import { RoundedCorner } from 'widgets'

import options from 'options'

const { Box, Separator } = Widget
const { statusbar } = options

const showWhenStyleIs = (style: 'full' | 'separated', button: ButtonProps) =>
  button.bind('visible', statusbar.style, 'value', (s) => s === style)

export default Box(
  { hpack: 'start', className: 'side-items' },
  showWhenStyleIs(
    'full',
    RoundedCorner('topleft', { className: 'rounded-corner' })
    //.hook(statusbar.position, (self) => { }),
  ),
  LogoButton,
  Separator({ vertical: true }),
  Workspaces,
  Separator({ vertical: true }),

  showWhenStyleIs('full', AiButton),
  showWhenStyleIs('full', RunButton),
  showWhenStyleIs('full', ToolsButton),
  showWhenStyleIs('full', SettingsButton),
  showWhenStyleIs('separated', LeftButtonsRevealer),
)
import Cava from 'misc/cava'
import PlayerStatusIcon from 'misc/playerStatusIcon'

import options from 'options'
import { sh } from 'lib/utils'

import { getPlayer } from 'lib/utils'

const mpris = await Service.import('mpris')
const { length, visualizer: {width, height} } = options.bar.media

function getLabel(player) {
  if (player) {
    const artists = player['track-artists'].join(', ')
    return `${artists && artists+' - '} ${player['track-title']}`
  } else return ''
}

export const playing = Widget.Box({ hpack: 'center' }).hook(mpris, self => {
  const player = getPlayer()
  if (!player) return

  self.children = [
    Widget.CircularProgress({
      startAt: 0.75,
      className: 'progress',
      child: PlayerStatusIcon(player),
    }).poll(1000, self => self.value = player.position / player.length),
    Widget.Label({
      label: getLabel(player),
      maxWidthChars: length.bind(),
    })
  ]
})

export const visualizer = Widget.Box({
  hpack: 'center',
  className: 'visualizer',
}).hook(mpris, self => {
  if (!getPlayer()) return
  sh('pkill cava')
  const limit = length.value
  const size = Math.round(getLabel(getPlayer()).length * 0.8)
  self.child = Cava({
    width, height,
    bars: (size < limit ? size : limit) * width,
  })
})
import icons from 'data/icons'

export default async function init() {
  const bat = await Service.import('battery')
  bat.connect('notify::percent', ({ percent, charging }) => {
    const low = 30
    if (percent !== low || percent !== low / 2 || !charging)
      return

    Utils.notify({
      urgency: 'critical',
      iconName: icons.battery.warning,
      summary: `${percent}% Battery Percentage`,
    })
  })
}

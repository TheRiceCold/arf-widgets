import options from 'options'

export default ({
  transition = 'slide_down',
  className = '',
  reveal,
  ...props
}) => Widget.Revealer({
  revealChild: reveal,
  child: Widget.Box({
    ...props,
    classNames: ['popup-revealer', className],
  }),
  transition,
  transitionDuration: options.transition,
})
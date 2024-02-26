import NetworkList from './lists/network'
import BluetoothList from './lists/bluetooth'

let currentTabId: number = 0
const setCurrentTab = (id: number) => currentTabId = id

const contents = [
  NetworkList,
  BluetoothList,
]

const ListStack = Widget.Stack({
  transition: 'slide_up_down',
  children: contents.reduce((acc, item) => {
    acc[item.name] = item.list
    return acc
  }, {})
})

export {
  contents,
  ListStack,
  setCurrentTab,
}

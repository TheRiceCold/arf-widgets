import Gemini from 'service/api/gemini'
import GPTService from 'service/api/gpt'

import GPTSendMessage from './gpt/SendMessage'
import GeminiSendMessage from './gemini/SendMessage'

import { APIS, currentApi } from '.'

import { setupCursorHover } from 'misc/cursorhover'
import { enableClickThrough } from 'lib/utils'
import icons from 'data/icons'

const { Gtk } = imports.gi
const TextView = Widget.subclass(Gtk.TextView, 'AgsTextView')

const chatSendButton = Widget.Button({
  vpack: 'end',
  className: 'chat-send',
  setup: setupCursorHover,
  child: Widget.Icon(icons.ui.send),
}).hook(currentApi, self => {
  const cmd = ChatEntry.get_buffer().text

  self.onClicked = () => (APIS[currentApi.value] === 0) 
    ? GeminiSendMessage(cmd) : GPTSendMessage(cmd)

  ChatEntry.get_buffer().set_text('', -1)
})

export const ChatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  className: 'chat-entry',
  wrapMode: Gtk.WrapMode.WORD_CHAR,
})
  .hook(App, (self, currentName, visible) => {
    if (visible && currentName === 'sideleft') 
      self.grab_focus()
  })
  .hook(GPTService, self => {
    if (APIS[currentApi.value] !== 'gpt') return
    self.placeholderText = GPTService.key.length > 0 ? 'Message the model...' : 'Enter API Key...'
  }, 'hasKey')
  .hook(Gemini, (self) => {
    if (APIS[currentApi.value] !== 'gemini') return
    self.placeholderText = Gemini.key.length > 0 ? 'Message Gemini...' : 'Enter Google AI API Key...'
  }, 'hasKey')

export const ChatPlaceholder = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  label: 'Enter Message',
  className: 'chat-placeholder',
}).hook(currentApi, self => self.label = APIS[currentApi.value].placeholderText)

export default Widget.Box(
  { className: 'chat-textarea' },
  Widget.Overlay({
    passThrough: true,
    child: Widget.Scrollable({
      vscroll: 'always',
      hscroll: 'never',
      child: ChatEntry,
    }),
    overlay: Widget.Revealer({
      revealChild: true,
      transition: 'crossfade',
      child: ChatPlaceholder,
      setup: enableClickThrough,
    }),
  }),
  chatSendButton,
)
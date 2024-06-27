import { bash, dependencies } from 'lib/utils'
import icons from 'data/icons'
import options from 'options'

const { GLib } = imports.gi
const BINS = `${Utils.CACHE_DIR}/binaries`

async function ls(path: string) {
  return Utils.execAsync(`ls ${path}`).catch(() => '')
}

async function reload() {
  const bins = await Promise.all(GLib.getenv('PATH')!
    .split(':')
    .map(ls))

  Utils.writeFile(bins.join('\n'), BINS)
}

async function query(filter: string) {
  if (!dependencies('fzf')) return [] as string[]

  return bash`cat ${BINS} | fzf -f ${filter} | head -n ${options.run.sh.max}`
    .then(str => Array.from(new Set(str.split('\n').filter(i => i)).values()))
    .catch(err => { print(err); return [] })
}

function run(args: string) {
  Utils.execAsync(args).then(out => {
    print(`:sh ${args.trim()}:`)
    print(out)
  }).catch(err => Utils.notify('ShRun Error', err, icons.app.terminal))
}

class Sh extends Service {
  static { Service.register(this) }
  constructor() { super(); reload() }
  query = query
  run = run
}

export default new Sh

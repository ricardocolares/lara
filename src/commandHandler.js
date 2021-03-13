import path from 'path'
import DynRequire from 'dyn-require'
import client from './'
import { isMod } from './utils'

const { BOT_PREFIX } = process.env
const commands = new DynRequire(path.join(__dirname, 'commands')).requireAll()
const onCooldown = new Set()

const commandHandler = (_channel, userstate, message, self) => {
  if (self || !message.startsWith(BOT_PREFIX || '!')) return

  const channel = _channel.slice(1) // removing #
  const args = message.slice(1).split(' ')
  const _command = args.shift().toLowerCase()

  commands.forEach(async (command) => {
    if (command.aliases.includes(_command) || _command === command.name) {
      if (command.onlyMod === true && isMod(userstate)) {
        client.say(channel,
          await command.execute({ channel, userstate, args }))
      } else {
        if (!onCooldown.has(command.name)) {
          if (command.onlyMod !== false) return
          client.say(channel,
            await command.execute({ channel, userstate, args }))
          onCooldown.add(command.name)
          setTimeout(() => onCooldown.delete(command.name), command.cooldown * 1000)
        }
      }
    }
  })
}

export default commandHandler

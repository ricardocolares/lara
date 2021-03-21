import path from 'path'
import DynRequire from 'dyn-require'
import client from './'
import { isMod } from './utils'

const { BOT_PREFIX } = process.env

const commands = new DynRequire(path.join(__dirname, 'commands')).requireAll()
const onCooldown = new Set()

const commandHandler = (room, userstate, message, self) => {
  if (self || !message.startsWith(BOT_PREFIX || '!')) return

  const channel = room.slice(1) // removing #
  const args = message.slice(1).split(' ')
  const commandName = args.shift().toLowerCase()

  const sendMessage = (text) => client.say(channel, text)

  commands.forEach(async (command) => {
    if (command.aliases.includes(commandName) || command.name === commandName) {
      if (command.onlyMod === true && isMod(userstate)) {
        await command.execute({ channel, userstate, args, sendMessage })
      } else {
        if (!onCooldown.has(command.name)) {
          if (command.onlyMod !== false) return

          await command.execute({ channel, userstate, args, sendMessage })

          onCooldown.add(command.name)
          setTimeout(() => onCooldown.delete(command.name),
            command.cooldown * 1000)
        }
      }
    }
  })
}

export default commandHandler

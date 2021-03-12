import 'dotenv/config'
import { Client } from 'tmi.js'
import {
  subscriptionHandler, resubHandler,
  cheerHandler, raidHandler
} from './events'

const { BOT_NAME, BOT_OAUTH, CHANNEL_LIST } = process.env

const client = new Client({
  options: { debug: true },
  connection: { reconnect: true },
  identity: {
    username: BOT_NAME,
    password: BOT_OAUTH
  },
  channels: CHANNEL_LIST.split(', ')
})

// connect bot to twitch
client.connect()

// events
client.on('subscription', subscriptionHandler)
client.on('resub', resubHandler)
client.on('cheer', cheerHandler)
client.on('raided', raidHandler)

export default client

import 'dotenv/config'
import { Client } from 'tmi.js'

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

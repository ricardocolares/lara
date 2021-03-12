import client from './'

const subscriptionHandler = (channel, username, method) => {
  if (method.prime) {
    client.say(channel,
      `${username} just subscribed with Twitch Prime!`)
  } else {
    client.say(channel,
      `${username} just subscribed with ${method.plan}!`)
  }
}

const resubHandler = (channel, username, months) => {
  client.say(channel,
    `${username} just subscribed for ${months} months in a row!`)
}

const cheerHandler = (channel, userstate) => {
  const { username, bits } = userstate

  client.say(channel,
    `${username} just cheered ${bits} bits`)
}

const raidHandler = (channel, username, viewers) => {
  client.say(channel,
    `${username} just raided the channel with ${viewers} viewers`)
}

export {
  subscriptionHandler,
  resubHandler,
  cheerHandler,
  raidHandler
}

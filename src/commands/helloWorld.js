const execute = ({ userstate, sendMessage }) =>
  sendMessage(`Hello ${userstate.username} BegWan`)

module.exports = {
  name: 'hello',
  aliases: ['hey', 'hi'],
  onlyMod: true,
  cooldown: 0,
  execute
}

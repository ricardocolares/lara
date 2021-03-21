# lara
> a twitch bot

## Installation
- **Requirements**:
  - _Node.js 12>=_
  - _[Twitch OAuth](
twitchapps.com/tmi/)_

### 1. Clone the repository
```bash
git clone https://github.com/w2rs/lara.git
```
### 2. Install dependencies
```bash
cd lara
npm install
```
### 3.  Set your credentials
Copy the file `.env.example` and rename it to `.env` and set your credentials.

### 4. Build and run lara
```bash
npm run build
```
```bash
npm start
```
## Create your first command
In the commands folder create a file and use this scheme.

```js
const execute = ({ channel, userstate, args, sendMessage }) => {
  return sendMessage(`Hello ${userstate.username}`)
}

module.exports = {
  name: 'hello', // String
  aliases: ['hey', 'hi'], // Array of strings
  onlyMod: false, // Boolean
  cooldown: 5, // Number (use seconds)
  execute // Function
 }
```

## Example
### Creating uptime command
- Install axios to request [DecApi](https://docs.decapi.me/) data.
```bash
npm install axios
```
- Create uptime.js in commands folder
```js
import axios from 'axios'

const getData = async channel => {
  const response = await axios.get(
   `http://decapi.me/twitch/uptime/${channel}?offline_msg=off`
  )

  return response.data
}

const execute = async ({ channel, userstate, args, sendMessage }) => {
  const response = await getData(channel)

  if (response !== 'off') {
    return sendMessage(`${channel} has been live for ${response}`)
  }

  return sendMessage(`${channel} is offline.`)
}

module.exports = {
  name: 'uptime',
  aliases: ['up', 'time'],
  onlyMod: false,
  cooldown: 10,
  execute
}
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE)
for details.

> Written with [StackEdit](https://stackedit.io/).

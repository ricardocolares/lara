const isMod = (userstate) => {
  const permissions = ['broadcaster', 'moderator']
  const [permission] = Object.keys(userstate.badges)
  return permissions.includes(permission)
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export {
  isMod,
  sleep
}

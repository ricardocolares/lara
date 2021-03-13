const isMod = (userstate) => {
  const permissions = ['broadcaster', 'moderator']
  const permission = Object.keys(userstate.badges)[0]
  return permissions.includes(permission)
}

export {
  isMod
}

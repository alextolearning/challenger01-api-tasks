export function handlePath(path) {
  const paramsRegex = /:([a-zA-Z]+)/g

  const routeString = path.replaceAll(paramsRegex, '(?<$1>[a-z0-9\-_]+)')

  return new RegExp('^' + routeString+'(?<query>\\?(.*))?$')
}

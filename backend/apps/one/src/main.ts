import http from 'http'

const main = async () => {
  const func = await import('./index')

  const server = http.createServer((req, res) => func.default(req, res))

  server.listen(3000)
}

main()

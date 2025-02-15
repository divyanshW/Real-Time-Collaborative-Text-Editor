import { NextApiRequest } from 'next'
import { Server } from 'ws'  // Correctly import the Server class from 'ws'
import { WebsocketProvider } from 'y-websocket'

const wss = new Server({ noServer: true })  // Instantiate the WebSocket server directly

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.wss) {
    res.socket.server.wss = wss
    res.socket.server.on('upgrade', (request: any, socket: any, head: any) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    })
  }

  wss.on('connection', (ws: any, req: any) => {
    const provider = new WebsocketProvider('wss://your-websocket-server', 'document-name', ws)

    provider.on('connection-close', () => {
      console.log('Connection closed')
    })
  })

  res.end()
}

'use client'

import { useEffect } from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'

interface YjsImportsProps {
  quill: Quill
  onLoaded: () => void
}

export default function YjsImports({ quill, onLoaded }: YjsImportsProps) {
  useEffect(() => {
    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost:1234', 'quill-demo-room', ydoc)
    const ytext = ydoc.getText('quill')

    new QuillBinding(ytext, quill)

    provider.on('status', (event: { status: string }) => {
      console.log(event.status) // logs "connected" or "disconnected"
    })

    onLoaded()

    return () => {
      provider.disconnect()
    }
  }, [quill, onLoaded])

  return null
}


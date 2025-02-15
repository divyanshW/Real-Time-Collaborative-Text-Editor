'use client'

import dynamic from 'next/dynamic'

const EditorComponent = dynamic(() => import('./EditorComponent'), { ssr: false })

export default function Editor({ onSave }: { onSave: (getContents: () => any) => void }) {
  return <EditorComponent onSave={onSave} />
}


'use client'

import { useState, useCallback } from 'react'
import Editor from '@/components/Editor'
import SaveDocumentButton from '@/components/SaveDocumentButton'
import ThemeProvider from '@/components/ThemeProvider'
import { ModeToggle } from '@/components/ModeToggle'

export default function Home() {
  const [getContents, setGetContents] = useState<(() => any) | null>(null)

  const handleSetGetContents = useCallback((getContentsFn: () => any) => {
    setGetContents(() => getContentsFn)
  }, [])

  const handleSave = async () => {
    const content = getContents?.();
    if (content) {
      const blob = new Blob([JSON.stringify(content)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="flex min-h-screen flex-col items-center justify-between p-8 transition-colors duration-300 ease-in-out bg-background text-foreground">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Collaborative Text Editor</h1>
            <ModeToggle />
          </div>
          <Editor onSave={handleSetGetContents} />
          <div className="mt-8 flex justify-end">
            <SaveDocumentButton onClick={handleSave} />
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}


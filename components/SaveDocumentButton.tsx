'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

interface SaveDocumentButtonProps {
  onClick: () => void
}

export default function SaveDocumentButton({ onClick }: SaveDocumentButtonProps) {
  const [version, setVersion] = useState(1)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await onClick()
    setVersion(version + 1)
    setIsSaving(false)
  }

  return (
    <Button onClick={handleSave} disabled={isSaving} className="transition-all duration-300 ease-in-out">
      <Save className="mr-2 h-4 w-4" />
      {isSaving ? 'Saving...' : `Save Document (v${version})`}
    </Button>
  )
}


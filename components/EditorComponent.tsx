'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useTheme } from 'next-themes'

const YjsImports = dynamic(() => import('./YjsImports'), { ssr: false })

interface EditorComponentProps {
  onSave: (getContents: () => any) => void
}

export default function EditorComponent({ onSave }: EditorComponentProps) {
  const [quill, setQuill] = useState<Quill | null>(null)
  const [yjsLoaded, setYjsLoaded] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const getContents = useCallback(() => {
    return quill ? quill.getContents() : null;
  }, [quill]);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const quillInstance = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
          ]
        }
      })
      setQuill(quillInstance)
    }
  }, [])

  useEffect(() => {
    if (quill && yjsLoaded) {
      onSave(getContents)
    }
  }, [quill, yjsLoaded, onSave, getContents])

  useEffect(() => {
    if (quill) {
      const editorElement = editorRef.current
      if (editorElement) {
        if (theme === 'dark') {
          editorElement.style.backgroundColor = '#1f2937'
          editorElement.style.color = '#e5e7eb'
        } else {
          editorElement.style.backgroundColor = '#ffffff'
          editorElement.style.color = '#1f2937'
        }
      }
    }
  }, [quill, theme])

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <div ref={editorRef} className="h-[60vh] border border-gray-300 rounded-lg mb-4"></div>
      {quill && <YjsImports quill={quill} onLoaded={() => setYjsLoaded(true)} />}
    </div>
  )
}


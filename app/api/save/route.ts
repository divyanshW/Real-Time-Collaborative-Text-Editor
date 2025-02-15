import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { content, version } = await req.json()

  // Here you would typically save the content to a database
  // For this example, we'll just log it
  console.log(`Saving document version ${version}:`, content)

  return NextResponse.json({ success: true, message: 'Document saved successfully' })
}


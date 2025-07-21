import { NextResponse } from 'next/server'

let bookmarks = []

export async function GET() {
  return NextResponse.json(bookmarks)
}

export async function POST(request) {
  const newBookmark = await request.json()
  if (!bookmarks.find(b => b.id === newBookmark.id)) {
    bookmarks.push(newBookmark)
  }
  return NextResponse.json({ message: 'Bookmark added', bookmarks })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  bookmarks = bookmarks.filter(b => b.id !== Number(id))
  return NextResponse.json({ message: 'Bookmark removed', bookmarks })
}

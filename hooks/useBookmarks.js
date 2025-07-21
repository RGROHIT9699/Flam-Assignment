import { useState, useEffect } from 'react'

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    async function fetchBookmarks() {
      const res = await fetch('/api/bookmarks')
      const data = await res.json()
      setBookmarks(data)
    }
    fetchBookmarks()
  }, [])

  const addBookmark = async (user) => {
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    if (res.ok) {
      const data = await res.json()
      setBookmarks(data.bookmarks)
    }
  }

  const removeBookmark = async (userId) => {
    const res = await fetch(`/api/bookmarks?id=${userId}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      const data = await res.json()
      setBookmarks(data.bookmarks)
    }
  }

  const isBookmarked = (userId) => {
    return bookmarks.some((u) => u.id === userId)
  }

  return { bookmarks, addBookmark, removeBookmark, isBookmarked }
}

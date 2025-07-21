'use client'

import React from 'react'
import Card from '../../components/Card'
import useBookmarks from '../../hooks/useBookmarks'

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, isBookmarked } = useBookmarks()

  const handlePromote = (user) => {
    alert(`Promoted ${user.fullName}!`)
  }

  const handleAssignProject = (user) => {
    alert(`Assigned ${user.fullName} to a project!`)
  }

  if (bookmarks.length === 0) {
    return <div className="p-4">No bookmarked employees.</div>
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Bookmarked Employees</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bookmarks.map((user) => (
          <Card
            key={user.id}
            user={user}
            onView={() => alert('Navigate to user details page')}
            onBookmark={() => removeBookmark(user.id)}
            onPromote={() => handlePromote(user)}
            isBookmarked={isBookmarked(user.id)}
          >
            <button
              onClick={() => handleAssignProject(user)}
              className="mt-2 w-full px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Assign to Project
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}

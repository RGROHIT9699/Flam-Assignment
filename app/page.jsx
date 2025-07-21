'use client'

import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../lib/api'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import FilterDropdown from '../components/FilterDropdown'
import useBookmarks from '../hooks/useBookmarks'
import useSearch from '../hooks/useSearch'

export default function HomePage() {
  const [users, setUsers] = useState([])
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const { searchTerm, setSearchTerm, filters, setFilters, filteredData } = useSearch(users, [
    'fullName',
    'email',
    'department',
  ])

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers(20)
      setUsers(data)
    }
    loadUsers()
  }, [])

  const departments = [...new Set(users.map((u) => u.department))]
  const ratings = [1, 2, 3, 4, 5]

  const handleView = (user) => {
    // Navigate to user details page
    window.location.href = `/employee/${user.id}`
  }

  const handleBookmark = (user) => {
    if (isBookmarked(user.id)) {
      removeBookmark(user.id)
    } else {
      addBookmark(user)
    }
  }

  const handlePromote = (user) => {
    alert(`Promoted ${user.fullName}!`)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">HR Dashboard</h1>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4 space-y-2 md:space-y-0">
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <FilterDropdown
          options={departments}
          selectedOptions={filters.departments}
          setSelectedOptions={(opts) => setFilters({ ...filters, departments: opts })}
          label="Filter by Department"
        />
        <FilterDropdown
          options={ratings}
          selectedOptions={filters.ratings}
          setSelectedOptions={(opts) => setFilters({ ...filters, ratings: opts })}
          label="Filter by Rating"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredData.map((user) => (
          <Card
            key={user.id}
            user={user}
            onView={() => handleView(user)}
            onBookmark={() => handleBookmark(user)}
            onPromote={() => handlePromote(user)}
            isBookmarked={isBookmarked(user.id)}
          />
        ))}
      </div>
    </div>
  )
}

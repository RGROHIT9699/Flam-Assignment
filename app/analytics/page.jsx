'use client'

import React, { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { fetchUsers } from '../../lib/api'
import useBookmarks from '../../hooks/useBookmarks'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const [users, setUsers] = useState([])
  const { bookmarks } = useBookmarks()

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers(20)
      setUsers(data)
    }
    loadUsers()
  }, [])

  // Calculate department-wise average ratings
  const departmentRatings = {}
  users.forEach((user) => {
    if (!departmentRatings[user.department]) {
      departmentRatings[user.department] = { total: 0, count: 0 }
    }
    departmentRatings[user.department].total += user.performanceRating
    departmentRatings[user.department].count += 1
  })

  const departments = Object.keys(departmentRatings)
  const avgRatings = departments.map(
    (dept) => departmentRatings[dept].total / departmentRatings[dept].count
  )

  // Mock bookmark trends data
  const bookmarkTrends = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [2, 5, 3, bookmarks.length],
  }

  const barData = {
    labels: departments,
    datasets: [
      {
        label: 'Average Rating',
        data: avgRatings,
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
    ],
  }

  const lineData = {
    labels: bookmarkTrends.labels,
    datasets: [
      {
        label: 'Bookmarks',
        data: bookmarkTrends.data,
        fill: false,
        borderColor: 'rgba(16, 185, 129, 0.7)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Analytics</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Department-wise Average Ratings
        </h2>
        <Bar data={barData} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Bookmark Trends</h2>
        <Line data={lineData} />
      </div>
    </div>
  )
}

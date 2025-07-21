import { NextResponse } from 'next/server'

let bookmarks = []

// This is a simple in-memory store for bookmarks to simulate data.
// In real app, this should be replaced with a database or persistent storage.

export async function GET() {
  // For demo, generate mock department-wise average ratings and bookmark trends

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Support']

  // Mock average ratings
  const departmentRatings = departments.map(dept => ({
    department: dept,
    averageRating: Math.floor(Math.random() * 5) + 1,
  }))

  // Mock bookmark trends over 4 weeks
  const bookmarkTrends = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [2, 5, 3, bookmarks.length],
  }

  return NextResponse.json({ departmentRatings, bookmarkTrends })
}

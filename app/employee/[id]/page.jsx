'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Tabs from '../../../components/Tabs'
import RatingStars from '../../../components/RatingStars'

function generateMockPerformanceHistory() {
  const history = []
  for (let i = 0; i < 5; i++) {
    history.push({
      period: `Q${i + 1} 2023`,
      rating: Math.floor(Math.random() * 5) + 1,
      comments: 'Performance was satisfactory with room for improvement.',
    })
  }
  return history
}

function generateMockProjects() {
  return [
    { id: 1, name: 'Project Alpha', status: 'Completed' },
    { id: 2, name: 'Project Beta', status: 'In Progress' },
    { id: 3, name: 'Project Gamma', status: 'Planned' },
  ]
}

function generateMockFeedback() {
  return [
    { id: 1, from: 'Manager', message: 'Great teamwork and communication.' },
    { id: 2, from: 'Peer', message: 'Always willing to help others.' },
  ]
}

export default function EmployeeDetails({ params }) {
  const { id } = params
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const res = await fetch(`https://dummyjson.com/users/${id}`)
        if (!res.ok) throw new Error('User not found')
        const data = await res.json()
        const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Support']
        const department = departments[Math.floor(Math.random() * departments.length)]
        const performanceRating = Math.floor(Math.random() * 5) + 1
        setUser({
          id: data.id,
          fullName: data.firstName + ' ' + data.lastName,
          email: data.email,
          age: data.age,
          department,
          performanceRating,
          phone: data.phone,
          address: `${data.address.address}, ${data.address.city}, ${data.address.state}`,
          bio: 'A dedicated employee with a passion for excellence.',
          performanceHistory: generateMockPerformanceHistory(),
          projects: generateMockProjects(),
          feedback: generateMockFeedback(),
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (!user) return <div className="p-4">User not found</div>

  const tabs = [
    {
      label: 'Overview',
      content: (
        <div>
          <p className="mb-2"><strong>Address:</strong> {user.address}</p>
          <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
          <p className="mb-2"><strong>Bio:</strong> {user.bio}</p>
          <h3 className="font-semibold mt-4 mb-2">Past Performance History</h3>
          <ul className="list-disc list-inside">
            {user.performanceHistory.map((item, idx) => (
              <li key={idx}>
                {item.period}: <RatingStars rating={item.rating} /> - {item.comments}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: 'Projects',
      content: (
        <ul className="list-disc list-inside">
          {user.projects.map((project) => (
            <li key={project.id}>
              {project.name} - <span className="italic">{project.status}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: 'Feedback',
      content: (
        <FeedbackForm feedback={user.feedback} />
      ),
    },
  ]

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
      >
        &larr; Back
      </button>
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{user.fullName}</h1>
      <p className="mb-1 text-gray-700 dark:text-gray-300">{user.email}</p>
      <p className="mb-1 text-gray-700 dark:text-gray-300">Age: {user.age}</p>
      <p className="mb-1 text-gray-700 dark:text-gray-300">Department: {user.department}</p>
      <div className="mb-4">
        <RatingStars rating={user.performanceRating} />
        <span
          className={`ml-2 px-2 py-1 rounded text-white ${
            user.performanceRating >= 4
              ? 'bg-green-600'
              : user.performanceRating >= 2
              ? 'bg-yellow-600'
              : 'bg-red-600'
          }`}
        >
          {user.performanceRating >= 4
            ? 'Excellent'
            : user.performanceRating >= 2
            ? 'Average'
            : 'Poor'}
        </span>
      </div>
      <Tabs tabs={tabs} />
    </div>
  )
}

function FeedbackForm({ feedback }) {
  const [messages, setMessages] = React.useState(feedback)
  const [newMessage, setNewMessage] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim() === '') return
    setMessages([...messages, { id: Date.now(), from: 'You', message: newMessage }])
    setNewMessage('')
  }

  return (
    <div>
      <ul className="mb-4 list-disc list-inside max-h-48 overflow-y-auto">
        {messages.map((fb) => (
          <li key={fb.id}>
            <strong>{fb.from}:</strong> {fb.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add feedback"
          className="flex-1 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          aria-label="Add feedback"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

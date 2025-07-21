import React from 'react'
import RatingStars from './RatingStars'
import Button from './Button'

export default function Card({ user, onView, onBookmark, onPromote, isBookmarked }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col space-y-4 transform transition-transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.fullName}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">{user.email}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">Age: {user.age}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">Department: {user.department}</p>
      <RatingStars rating={user.performanceRating} />
      <div className="flex space-x-3 mt-4">
        <Button onClick={onView} variant="primary" className="flex-1" >
          View
        </Button>
        <Button onClick={onBookmark} variant={isBookmarked ? 'secondary' : 'primary'} className="flex-1">
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
        <Button onClick={onPromote} variant="success" className="flex-1">
          Promote
        </Button>
      </div>
    </div>
  )
}

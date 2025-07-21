import React from 'react';

interface UserCardProps {
  id: number;
  fullName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  onView: (id: number) => void;
  onBookmark: (id: number) => void;
  onPromote: (id: number) => void;
  isBookmarked: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  fullName,
  email,
  age,
  department,
  rating,
  onView,
  onBookmark,
  onPromote,
  isBookmarked,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 flex flex-col space-y-2">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{fullName}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Age: {age}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Department: {department}</p>
      <div className="flex items-center space-x-1">
        {stars.map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
          </svg>
        ))}
      </div>
      <div className="flex space-x-2 pt-2">
        <button
          onClick={() => onView(id)}
          className="flex-1 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700"
        >
          View
        </button>
        <button
          onClick={() => onBookmark(id)}
          className={`flex-1 rounded px-3 py-1 ${
            isBookmarked ? 'bg-yellow-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
          } hover:bg-yellow-400`}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button
          onClick={() => onPromote(id)}
          className="flex-1 bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700"
        >
          Promote
        </button>
      </div>
    </div>
  );
};

export default UserCard;

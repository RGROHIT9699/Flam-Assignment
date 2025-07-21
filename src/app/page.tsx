"use client";

import React, { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
}

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Support"];

function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomRating() {
  return Math.floor(Math.random() * 5) + 1;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("https://dummyjson.com/users?limit=20");
      const data = await res.json();
      const usersWithExtra = data.users.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        department: getRandomDepartment(),
        rating: getRandomRating(),
      }));
      setUsers(usersWithExtra);
    }
    fetchUsers();
  }, []);

  const handleView = (id: number) => {
    alert(`View user ${id} - implement navigation to user details page`);
  };

  const handleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handlePromote = (id: number) => {
    alert(`Promote user ${id} - implement promote action`);
  };

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          fullName={`${user.firstName} ${user.lastName}`}
          email={user.email}
          age={user.age}
          department={user.department}
          rating={user.rating}
          onView={handleView}
          onBookmark={handleBookmark}
          onPromote={handlePromote}
          isBookmarked={bookmarks.has(user.id)}
        />
      ))}
    </main>
  );
}

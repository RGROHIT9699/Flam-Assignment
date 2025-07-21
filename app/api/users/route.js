import { NextResponse } from 'next/server'

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Support']

export async function GET(request) {
  const url = 'https://dummyjson.com/users?limit=20'
  const res = await fetch(url)
  const data = await res.json()

  const users = data.users.map(user => {
    const department = departments[Math.floor(Math.random() * departments.length)]
    const performanceRating = Math.floor(Math.random() * 5) + 1
    return {
      id: user.id,
      fullName: user.firstName + ' ' + user.lastName,
      email: user.email,
      age: user.age,
      department,
      performanceRating,
      phone: user.phone,
      address: `${user.address.address}, ${user.address.city}, ${user.address.state}`,
      image: user.image,
    }
  })

  return NextResponse.json(users)
}

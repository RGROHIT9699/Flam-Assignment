export async function fetchUsers(limit = 20) {
  const res = await fetch(`/api/users?limit=${limit}`)
  const users = await res.json()
  return users
}

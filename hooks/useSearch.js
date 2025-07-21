import { useState, useMemo } from 'react'

export default function useSearch(data, searchFields) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ departments: [], ratings: [] })

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search term filter
      const matchesSearch = searchTerm
        ? searchFields.some((field) =>
            item[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true

      // Department filter
      const matchesDepartment =
        filters.departments.length > 0 ? filters.departments.includes(item.department) : true

      // Rating filter
      const matchesRating =
        filters.ratings.length > 0 ? filters.ratings.includes(item.performanceRating) : true

      return matchesSearch && matchesDepartment && matchesRating
    })
  }, [data, searchTerm, filters, searchFields])

  return { searchTerm, setSearchTerm, filters, setFilters, filteredData }
}

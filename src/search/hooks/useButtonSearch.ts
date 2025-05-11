import { useCallback } from "react"

export const useButtonSearch = (onSearch: (username: string) => void) => {
  const handleSearch = useCallback((username: string) => {
    onSearch(username)
  }, [onSearch])

  return { handleSearch }
} 
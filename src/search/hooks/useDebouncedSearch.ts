import { debounce } from "lodash"
import { useCallback, useEffect, useRef } from "react"

export const useDebouncedSearch = (onSearch: () => void) => {
  const onSearchRef = useRef(onSearch)
  
  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  const debouncedSearch = useRef(
    debounce(async () => {
      onSearchRef.current()
    }, 2000)
  ).current

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleSearch = useCallback(() => {
    debouncedSearch()
  }, [debouncedSearch])

  return { 
    handleSearch,
    cleanup: () => debouncedSearch.cancel()
  }
} 
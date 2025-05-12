import { FormValues, SearchInputProps } from "../types"
import { useEffect, useRef, useCallback, useState } from "react"
import { debounce } from "lodash"
import { SearchInputTextField } from "../../shared/components/SearchInputTextField"
import { LinearProgress, Box } from "@mui/material"

export const DebouncedSearchInput: React.FC<SearchInputProps<FormValues>> = ({
  register,
  errors,
  isLoading,
  searchText,
  onSearchTrigger,
}) => {
  const onSearchRef = useRef(onSearchTrigger)
  const [progress, setProgress] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout>()
  
  useEffect(() => {
    onSearchRef.current = onSearchTrigger
  }, [onSearchTrigger])

  const debouncedSearch = useRef(
    debounce(async () => {
      onSearchRef.current()
      setProgress(0)
    }, 2000)
  ).current

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [debouncedSearch])

  const handleSearch = useCallback(() => {
    // Reset progress
    setProgress(0)
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    // Start progress animation
    const startTime = Date.now()
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / 2000) * 100, 100)
      setProgress(newProgress)
    }, 10)
    
    debouncedSearch()
  }, [debouncedSearch])

  useEffect(() => {
    if (searchText) {
      handleSearch()
    } else {
      setProgress(0)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      debouncedSearch.cancel()
    }
  }, [searchText, handleSearch, debouncedSearch])

  return (
    <Box>
      <SearchInputTextField
        register={register}
        errors={errors}
        isLoading={isLoading}
        helperText="Results will appear after 2 seconds of inactivity"
        label="GitHub Username"
        fieldName="username"
      />
      {searchText && progress < 100 && (
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ mt: 1 }}
        />
      )}
    </Box>
  )
} 
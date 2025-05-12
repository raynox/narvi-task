import { FormValues, SearchInputProps } from "../types"
import { useEffect, useRef, useCallback } from "react"
import { debounce } from "lodash"
import { SearchInputTextField } from "../../shared/components/SearchInputTextField"
import { Box } from "@mui/material"

export const DebouncedSearchInput: React.FC<SearchInputProps<FormValues>> = ({
  register,
  errors,
  isLoading,
  searchText,
  onSearchTrigger,
}) => {
  const onSearchRef = useRef(onSearchTrigger)
  
  useEffect(() => {
    onSearchRef.current = onSearchTrigger
  }, [onSearchTrigger])

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

  useEffect(() => {
    if (searchText) {
      handleSearch()
    }
    return () => {
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
    </Box>
  )
} 
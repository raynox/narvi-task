import { FormValues, SearchInputProps } from "../types"
import { useDebouncedSearch } from "../hooks/useDebouncedSearch"
import { useEffect } from "react"
import { SearchInputTextField } from "../../shared/components/SearchInputTextField"

export const DebouncedSearchInput: React.FC<SearchInputProps<FormValues>> = ({
  register,
  errors,
  isLoading,
  searchText,
  onSearchTrigger,
}) => {
  const { handleSearch, cleanup } = useDebouncedSearch(() => {
    onSearchTrigger()
  })

  useEffect(() => {
    handleSearch()
    return cleanup
  }, [searchText, handleSearch, cleanup])

  return <SearchInputTextField
    register={register}
    errors={errors}
    isLoading={isLoading}
    helperText="Results will appear after 2 seconds of inactivity"
    label="GitHub Username"
    fieldName="username"
  />
} 
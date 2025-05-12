import { Box, Button } from "@mui/material"
import { FormValues, SearchInputProps } from "../types"
import { SearchInputTextField } from "../../shared/components/SearchInputTextField"

export const ButtonSearchInput: React.FC<SearchInputProps<FormValues>> = ({
  register,
  errors,
  isLoading,
  searchText,
  onSearchTrigger,
}) => {
  const handleClick = () => {
    if (searchText) {
      onSearchTrigger()
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <SearchInputTextField
        register={register}
        errors={errors}
        isLoading={isLoading}
        helperText="Enter a username to search"
        label="GitHub Username"
        fieldName="username"
      />

      <Button 
        variant="contained"
        data-testid="search-button"
        onClick={handleClick}
        disabled={isLoading || !searchText || Object.keys(errors).length > 0}
      >
        Search
      </Button>
    </Box>
  )
} 
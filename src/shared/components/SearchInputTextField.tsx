import { CircularProgress, TextField } from "@mui/material"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

interface SearchInputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  errors: any
  isLoading: boolean
  label: string
  helperText: string
  fieldName: Path<T>
}

export const SearchInputTextField = <T extends FieldValues>({ register, errors, isLoading, helperText, label, fieldName }: SearchInputProps<T>) => {
  return <TextField
  {...register(fieldName)}
  label={label}
  variant="outlined"
  fullWidth
  inputProps={{
    "data-testid": "search-input",
  }}
  error={!!errors.username}
  helperText={errors.username?.message || helperText}
  InputProps={{
    endAdornment: isLoading ? <CircularProgress data-testid="search-input-loading" size={24} /> : null,
  }}
/>
}
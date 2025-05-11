import { UseFormRegister, FieldValues } from "react-hook-form"
import { GitHubUser } from "../users/types"

export interface SearchInputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  errors: any
  isLoading: boolean
  searchText: string
  onSearchTrigger: () => void
}

export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubUser[]
}

export type FormValues = {
  username: string
}
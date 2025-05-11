"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Box } from "@mui/material"
import { Typography } from "../shared/components/Typography"
import { FormValues, SearchInputProps } from "./types"
import { useEffect } from "react"
import React from "react"

const schema = yup.object({
  username: yup.string().min(1, "Please enter a username to search").required("Please enter a username to search"),
})

interface UserSearchProps {
  onSearchTextChange: (username: string) => void
  onSearchTrigger: () => void
  isLoading: boolean
  SearchInput: React.FC<SearchInputProps<FormValues>>
}

export const UserSearch = ({ onSearchTextChange, onSearchTrigger, isLoading, SearchInput }: UserSearchProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  })

  const username = watch("username")

  useEffect(() => {
    onSearchTextChange(username)
  }, [username, onSearchTextChange])

  return (
    <Box component="form" noValidate sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        GitHub User Search
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
        Enter a GitHub username to search for users
      </Typography>

      <SearchInput
        register={register}
        errors={errors}
        isLoading={isLoading}
        searchText={username}
        onSearchTrigger={onSearchTrigger}
      />
    </Box>
  )
}

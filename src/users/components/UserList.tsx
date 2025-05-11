"use client"

import { useEffect, useMemo, useRef } from "react"
import { Box, Grid, Alert, CircularProgress, AvatarGroup, Avatar } from "@mui/material"
import InfiniteScroll from "react-infinite-scroller"
import { GitHubUser } from "../types"
import { UserCard } from "./UserCard"
import { Typography } from "../../shared/components/Typography"

// Functional Programming Technique: Recursion
const findMaxId = (users: GitHubUser[], max = -Infinity): number => {
  if (users.length === 0) return max
  const [current, ...rest] = users
  return findMaxId(rest, Math.max(max, current.id))
}

interface UserListProps {
  users: GitHubUser[]
  isLoading: boolean
  isFetched: boolean
  isError: boolean
  hasNextPage: boolean | undefined
  fetchNextPage: () => void
  searchTerm: string
}

export const UserList = ({ users, isLoading, isError, hasNextPage, fetchNextPage, searchTerm, isFetched }: UserListProps) => {
  const scrollParentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollParentRef.current) {
      scrollParentRef.current.scrollTop = 0
    }
  }, [searchTerm])

  const maxId = useMemo(() => {
    return findMaxId(users)
  }, [users])

  const organizationLogos = useMemo(() => {
    // Functional Programming Technique: Function Chaining
    return users
      .filter((user) => user.type === "Organization")
      .map((user) => user.avatar_url)
  }, [users])

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        An error occurred while fetching GitHub users. Please try again later.
      </Alert>
    )
  }

  if (users.length === 0 && !isLoading && searchTerm && isFetched) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No users found matching "{searchTerm}". Try a different search term.
      </Alert>
    )
  }

  return (
    <Box
      ref={scrollParentRef}
      sx={{
        height: "calc(100vh - 200px)",
        overflowY: "auto",
        mt: 2,
      }}
    >
      {maxId > 0 && <Typography variant="h6">Max ID: {maxId}</Typography>}
      {organizationLogos.length > 0 && <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Typography variant="h6">Organization Logos:</Typography>
        <AvatarGroup>
          {organizationLogos.map((logo) => (
              <Avatar src={logo} />
          ))}
        </AvatarGroup>
      </Box>}
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <Box sx={{ textAlign: "center", py: 2 }} key="loader">
            <CircularProgress size={30} />
          </Box>
        }
        useWindow={false}
        getScrollParent={() => scrollParentRef.current}
      >
        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item xs={12} sm={12} md={12} key={user.id}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  )
}

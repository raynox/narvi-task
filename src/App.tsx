"use client"

import { useState, useEffect } from "react"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserSearch } from "./search/UserSearch"
import { UserList } from "./users/components/UserList"
import { useGitHubUsersSearch } from "./search/hooks/useGitHubUsersSearch"
import { DebouncedSearchInput } from "./search/components/DebouncedSearchInput"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Create a theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
})

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [executiveSearchTerm, setExecutiveSearchTerm] = useState("")
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch, isFetched } = useGitHubUsersSearch(executiveSearchTerm)

  useEffect(() => {
    if (executiveSearchTerm) {
      refetch()
    }
  }, [executiveSearchTerm, refetch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <UserSearch 
          onSearchTextChange={setSearchTerm} 
          onSearchTrigger={() => setExecutiveSearchTerm(searchTerm)}
          isLoading={isLoading} 
          SearchInput={DebouncedSearchInput}
        />

        <UserList
          users={data?.users || []}
          isLoading={isLoading}
          isError={isError}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          searchTerm={searchTerm}
          isFetched={isFetched}
        />
      </Container>
    </ThemeProvider>
  )
}

export default function AppWithProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

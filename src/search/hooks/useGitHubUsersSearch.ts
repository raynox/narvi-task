import { useInfiniteQuery } from "@tanstack/react-query"
import { searchGitHubUsers } from "../api/searchGitHubUsers"
import { GitHubSearchResponse } from "../types"


// Functional Programming Technique: Pure Functions
const getMinutesInMs = (seconds: number) => seconds * 60 * 1000
const extractItems = (response: GitHubSearchResponse) => response.items

// Functional Programming Technique: Currying
const isGreaterThan = (threshold: number) => (value: number) => value > threshold

// Functional Programming Technique: Partial Application
const isGreaterThanZero = isGreaterThan(0)

export const useGitHubUsersSearch = (username: string) => {
    return useInfiniteQuery({
      queryKey: ["githubUsers", username],
      queryFn: ({ pageParam = 1 }) => searchGitHubUsers(username, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return isGreaterThanZero(lastPage.items.length) ? nextPage : undefined
      },
      enabled: false,
      staleTime: getMinutesInMs(5),
      gcTime: getMinutesInMs(30),
      select: (data) => ({
        pages: data.pages,
        pageParams: data.pageParams,
        // Functional Programming Technique: Composition
        users: data.pages.flatMap(extractItems),
      }),
    })
  }
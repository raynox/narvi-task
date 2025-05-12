import { useInfiniteQuery } from "@tanstack/react-query"
import { GitHubSearchResponse } from "../types"


// Functional Programming Technique: Pure Functions
const getMinutesInMs = (seconds: number) => seconds * 60 * 1000
const extractItems = (response: GitHubSearchResponse) => response.items

// Functional Programming Technique: Currying
const isGreaterThan = (threshold: number) => (value: number) => value > threshold

// Functional Programming Technique: Partial Application
const isGreaterThanZero = isGreaterThan(0)

export const searchGitHubUsers = async (username: string, page = 1): Promise<GitHubSearchResponse> => {
    if (!username.trim()) {
      return { total_count: 0, incomplete_results: false, items: [] }
    }
  
    const perPage = 20
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(username)}&page=${page}&per_page=${perPage}`,
    )
  
    if (!response.ok) {
      throw new Error("GitHub API request failed")
    }
  
    return response.json()
  }

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
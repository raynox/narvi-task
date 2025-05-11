import { GitHubSearchResponse } from "../types"

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
  
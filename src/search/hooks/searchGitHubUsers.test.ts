import { searchGitHubUsers } from "./useGitHubUsersSearch"

global.fetch = jest.fn()

describe("searchGitHubUsers", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test("returns empty results for empty username", async () => {
    const result = await searchGitHubUsers("")

    expect(result).toEqual({
      total_count: 0,
      incomplete_results: false,
      items: [],
    })
    expect(fetch).not.toHaveBeenCalled()
  })

  test("calls GitHub API with correct parameters", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        total_count: 1,
        incomplete_results: false,
        items: [{ id: 1, login: "testuser" }],
      }),
    }
    
    ;(fetch as jest.Mock).mockResolvedValue(mockResponse)

    await searchGitHubUsers("testuser", 2)

    expect(fetch).toHaveBeenCalledWith("https://api.github.com/search/users?q=testuser&page=2&per_page=20")
  })

  test("throws error when API request fails", async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    await expect(searchGitHubUsers("testuser")).rejects.toThrow("GitHub API request failed")
  })
})

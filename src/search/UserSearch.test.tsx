import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UserSearch } from "./UserSearch"
import { DebouncedSearchInput } from "./components/DebouncedSearchInput"
import { ButtonSearchInput } from "./components/ButtonSearchInput"

interface DebouncedFunction extends Function {
  cancel: () => void;
}

jest.mock("lodash", () => ({
  ...jest.requireActual("lodash"),
  debounce: (fn: Function) => {
    (fn as DebouncedFunction).cancel = jest.fn()
    return fn
  },
}))

describe("UserSearch Component", () => {
  describe("with DebouncedSearchInput", () => {
    test("calls onSearch with the entered username after input", async () => {
      const mockOnSearch = jest.fn()
      const mockOnSearchTrigger = jest.fn()
      
      render(
        <UserSearch 
          onSearchTextChange={mockOnSearch} 
          onSearchTrigger={mockOnSearchTrigger}
          isLoading={false} 
          SearchInput={DebouncedSearchInput}
        />
      )

      const input = screen.getByTestId("search-input")
      fireEvent.change(input, { target: { value: "testuser" } })

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith("testuser")
      })
    })

    test("shows loading indicator when isLoading is true", () => {
      const mockOnSearchTrigger = jest.fn()
      const mockOnSearchTextChange = jest.fn()

      render(
        <UserSearch 
          onSearchTextChange={mockOnSearchTextChange} 
          onSearchTrigger={mockOnSearchTrigger}
          isLoading={true} 
          SearchInput={DebouncedSearchInput}
        />
      )

      const loadingIndicator = screen.getByTestId("search-input-loading")
      expect(loadingIndicator).toBeInTheDocument()
    })
  })

  describe("with ButtonSearchInput", () => {
    test("calls onSearch only when search button is clicked", async () => {
      const mockOnSearchTextChange = jest.fn()
      const mockOnSearchTrigger = jest.fn()

      render(
        <UserSearch 
          onSearchTextChange={mockOnSearchTextChange} 
          onSearchTrigger={mockOnSearchTrigger}
          isLoading={false} 
          SearchInput={ButtonSearchInput}
        />
      )

      const input = screen.getByTestId("search-input")
      const searchButton = screen.getByTestId("search-button")

      fireEvent.change(input, { target: { value: "testuser" } })
      expect(mockOnSearchTextChange).toHaveBeenCalledWith("testuser")
      expect(mockOnSearchTrigger).not.toHaveBeenCalled()
      userEvent.click(searchButton)
      expect(mockOnSearchTrigger).toHaveBeenCalled();
    })

    test("search button is disabled when input is empty", () => {
      const mockOnSearchTrigger = jest.fn()
      const mockOnSearchTextChange = jest.fn()

      render(
        <UserSearch 
          onSearchTextChange={mockOnSearchTextChange} 
          onSearchTrigger={mockOnSearchTrigger}
          isLoading={false} 
          SearchInput={ButtonSearchInput}
        />
      )

      const searchButton = screen.getByTestId("search-button")
      expect(searchButton).toBeDisabled()
    })

    test("search button is disabled during loading", () => {
      const mockOnSearchTrigger = jest.fn()
      const mockOnSearchTextChange = jest.fn()

      render(
        <UserSearch 
          onSearchTextChange={mockOnSearchTextChange} 
          onSearchTrigger={mockOnSearchTrigger}
          isLoading={true} 
          SearchInput={ButtonSearchInput}
        />
      )

      const input = screen.getByTestId("search-input")
      const searchButton = screen.getByTestId("search-button")

      fireEvent.change(input, { target: { value: "testuser" } })
      expect(searchButton).toBeDisabled()
    })

    test("search button is enabled when input has value and not loading", () => {
      const mockOnSearchTrigger = jest.fn()
      const mockOnSearchTextChange = jest.fn()

      render(
        <UserSearch 
          onSearchTextChange={mockOnSearchTextChange} 
          onSearchTrigger={mockOnSearchTrigger}
          isLoading={false} 
          SearchInput={ButtonSearchInput}
        />
      )

      const input = screen.getByTestId("search-input")
      const searchButton = screen.getByTestId("search-button")

      fireEvent.change(input, { target: { value: "testuser" } })
      expect(searchButton).not.toBeDisabled()
    })
  })
})

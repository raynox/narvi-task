# GitHub User Search

A React application that allows users to search for GitHub users with real-time results and infinite scrolling.

## Notes on Requirements

1. **Key files and their purposes**:

- `App.tsx`: Main application component that integrates all components and logic
- `UserSearch.tsx`: Main search component that integrates all search functionality
- `UserList.tsx`: Manages the list of user cards and infinite scrolling
- `DebouncedSearchInput.tsx`: Input component with debounce functionality
- `useGitHubUsersSearch.ts`: Custom hook for GitHub API integration and data fetching

2. **React Query**: Used for efficient data fetching and caching of GitHub API responses.

3. **Debounced Search**: Implemented using lodash's debounce function, triggering after 2 seconds of user inactivity.

4. **Results Display**: Uses Material UI's List components with proper loading and error states.

5. **Error Handling**: Comprehensive error handling for API failures and empty results.

6. **Infinite Scrolling**: Implemented using React Query's infinite query capabilities.

7. **Testing**: Exceeded the minimum requirement to ensure code quality and reliability.

8. **Material UI**: Used throughout the application for a consistent look and feel.

9. **Functional Programming**: Incorporated multiple functional programming techniques as shown above.

10. **Clarity**: All requirements were clear.

## Technical Implementation

### SOLID Principles

The app presents Open/Closed Principle by implementing two different search input strategies that can be easily swapped:

1. `DebouncedSearchInput`: Triggers search after 2 seconds of user inactivity
2. `ButtonSearchInput`: Triggers search only when the user clicks the search button

### Functional Programming Techniques

The codebase incorporates several functional programming techniques, marked with comments:
```typescript
// Functional Programming Technique: [Technique Name]
```

### Testing

While the requirements asked for one component test and one logic test, I have implemented a more comprehensive test suite to ensure reliability:

1. Component Tests:
   - `UserSearch.test.tsx`: Tests both search input implementations
   - Tests for loading states, button states, and search triggers

2. Logic Tests:
   - `searchGitHubUsers.test.ts`: Tests the GitHub API integration
   - Tests for error handling and empty results

### Project Structure

Key directories:
- `src/search/`: Core search functionality
- `src/shared/`: Reusable components
- `src/users/`: User-related components and types

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

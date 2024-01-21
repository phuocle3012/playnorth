This assignment, created using [create-next-app], is powered by Next.js and is a project by Play North.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Features
- Home page rendered with default games as Server Component
- /casino/[category] page with default games of category as Server Component
- Redux store for showing loading overlay
- Navigation using Link to category page
- Search using redux to push 'searchText' from header to Home & Category page to demonstrate how to use global state to interact with local component logic.
- Pagination to demonstrate how client interaction works using local state.
- Mobile First Design or Responsive design with break point 780px
- SASS file is used as a component-specific style sheet for easy management
- There is no unit test written in UI since I follow the original Test Pyramid https://martinfowler.com/articles/practical-test-pyramid.html & TDD practice follow Uncle Bob (Martin) approach.

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
- Home page is rendered with default games as a Server Component.
- The /casino/[category] page displays default games of the category as a Server Component.
- Redux store is used for displaying a loading overlay.
- Navigation is facilitated using Link to the category page.
- Search functionality utilizes Redux to push 'searchText' from the header to the Home & Category pages, demonstrating how to use global state to interact with local component logic.
- Pagination demonstrates how client interaction works using local state.
- Mobile-First Design or Responsive Design is implemented, with a breakpoint at 780px.
- SASS files are used as component-specific stylesheets for easy management.
- There is no unit test written in UI, since I follow the Test Pyramid(https://martinfowler.com/articles/practical-test-pyramid.html) and TDD practices as advocated by Uncle Bob (Robert C. Martin).

# Notes
- There is a nextjs_14 branch, which contains the original code created by npx create-next-app using Next.js version 14.
- The main branch is a downgraded version of the original, where the 'app' folder (equivalent to the 'pages' folder) is converted to a 'components' folder.

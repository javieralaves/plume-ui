# Plume UI

A modern web application built with [Next.js](https://nextjs.org), featuring a clean and intuitive user interface.

## Project Structure

The project is organized into the following main directories:

- `src/app/` - Contains the main application pages and layouts
  - `components/` - Reusable UI components
  - `globals.css` - Global styles
  - `fonts.css` - Font configurations
- `src/lib/` - Utility functions and shared code

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

## Development

The application uses the App Router pattern from Next.js 13+. You can start editing the main page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom fonts for optimal performance.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Next.js App Router](https://nextjs.org/docs/app) - understand the new App Router pattern
- [Next.js Learn](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deployment

The application can be deployed using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

For more deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

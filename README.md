# Plume UI

A modern web application built with [Next.js](https://nextjs.org), featuring a clean and intuitive user interface.

## Project Structure

The project is organized into the following main directories:

- `src/app/` - Contains the main application pages and layouts
  - `components/` - Reusable UI components
  - `globals.css` - Global styles
  - `fonts.css` - Font configurations
- `src/lib/` - Utility functions and shared code

## Using Plume UI in Other Projects

You can use Plume UI components and styles in other projects using Git submodules. Here's how:

### 1. Add Plume UI as a Submodule

```bash
# In your project root
git submodule add <plume-ui-repo-url> src/plume-ui
```

### 2. Configure Tailwind

Create or update your `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import plumeConfig from "./src/plume-ui/tailwind.config";

export default {
  // Extend Plume's config
  ...plumeConfig,
  content: [
    ...plumeConfig.content,
    // Add your project's content paths
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;
```

### 3. Install Required Dependencies

Add these dependencies to your project's `package.json`:

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "tailwind-merge": "^3.0.1"
  }
}
```

Then run:

```bash
npm install
# or yarn install
# or pnpm install
```

### 4. Import and Use Components

You can now import and use Plume UI components in your project:

```typescript
import { Button } from "@/plume-ui/src/app/components/Button";
import { Card } from "@/plume-ui/src/app/components/Card";

// Use in your components
export function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### 5. Updating Plume UI

To update to the latest version of Plume UI:

```bash
# In your project root
git submodule update --remote src/plume-ui
```

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

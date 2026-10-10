# Development Guide

This guide covers everything you need to know about developing for this Next.js developer portfolio.

## Prerequisites
- Node.js 18.17 or later
- npm or pnpm

## Local Development
To start the local development server:

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Theme**: `next-themes` for Light/Dark mode

The application is structured to have a fixed viewport on desktop devices (`h-screen w-screen overflow-hidden`) with content swapping out using Framer Motion animations. 

## Project Structure
- `/src/app`: Contains the main layout and page orchestrator.
- `/src/components`: Reusable UI components (buttons, layout wrappers, transition logic).
- `/src/data`: JSON files containing the dynamic content for the site.
- `/public`: Static assets like images and fonts.

## Modifying Content
Do not modify the React components to change textual content. Instead, navigate to `/src/data` and update the respective JSON files (e.g., `projects.json`, `about.json`).

## Styling Guidelines
- We use Tailwind CSS for styling. Avoid writing custom CSS in `globals.css` unless it's for base layer overrides or complex animations like the mesh gradient background.
- Use CSS Variables defined in `globals.css` for theming.

## Testing
There are no automated testing frameworks set up currently. Ensure to manually verify functionality, particularly the theme toggle and page transitions across different screen sizes.

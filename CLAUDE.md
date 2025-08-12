# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run postbuild` - Generate sitemap (runs automatically after build)
- `npm run lint` - Run ESLint for code linting

## Architecture Overview

This is a personal website/blog built with Next.js and Notion as a CMS. The site is forked from [morethan-log](https://github.com/morethanmin/morethan-log).

### Core Architecture

**Notion Integration**: The site uses Notion as a headless CMS through the `notion-client` library. Blog posts and pages are managed in a Notion database and fetched via the Notion API.

**Data Flow**: 
- Posts are fetched from Notion database via `src/apis/notion-client/getPosts.ts`
- Individual post content is retrieved through `getPostDetail.ts` and `getRecordMap.ts`
- React Query is used for client-side data fetching and caching

**Content Types**: The system supports different content types defined in `src/types/index.ts`:
- Posts (`TPostType`: "Post" | "Paper" | "Page")
- Post statuses (`TPostStatus`: "Private" | "Public" | "PublicOnDetail")

### Key Configuration

**Site Configuration**: `site.config.js` contains all site-wide settings including:
- Profile information (name, bio, social links)
- Blog metadata
- Notion page ID configuration
- Analytics and comment system settings
- Environment-specific configurations

**Next.js Configuration**: `next.config.js` handles:
- Image domains for external images (Notion, Google, AWS)
- Font loading configuration
- ESLint settings for builds

### Project Structure

- `src/pages/` - Next.js pages including dynamic routing for blog posts (`[slug].tsx`)
- `src/routes/` - Page components (Detail, Feed, Error)
- `src/layouts/` - Layout components with header, theme provider, and navigation
- `src/components/` - Reusable UI components for blog posts, categories, tags
- `src/apis/` - Notion API integration and data fetching
- `src/libs/utils/notion/` - Notion-specific utility functions for data processing
- `src/hooks/` - Custom React hooks for queries and UI state
- `src/styles/` - Design system with colors, theme, media queries

### Styling System

Uses Emotion for CSS-in-JS with a structured design system:
- `src/styles/theme.ts` - Theme definitions
- `src/styles/colors.ts` - Color palette
- `src/styles/media.ts` - Responsive breakpoints

### Environment Variables

Required environment variables:
- `NOTION_PAGE_ID` - ID of the Notion database page
- `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID` (optional) - Google Analytics
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional) - Search Console
- `VERCEL_ENV` - Used to distinguish production environment
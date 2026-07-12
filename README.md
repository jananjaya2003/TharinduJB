# TharinduJB Portfolio

A responsive AI and software engineering portfolio built with Next.js, TypeScript, Framer Motion, Supabase, and Vercel Analytics.

## Features

- Cinematic, optimized homepage video
- Responsive desktop, tablet, and mobile layouts
- Animated technology loader and hero
- Skills, project case studies, experience, services, and contact sections
- Dedicated `/projects` archive
- Protected `/admin` project manager
- Supabase authentication, database, and image storage
- WhatsApp contact flow
- Light and dark themes
- SEO metadata, Open Graph image, sitemap, robots rules, and analytics

## Requirements

- Node.js 20.9 or newer
- npm
- Supabase project for admin functionality

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev      # Development server
npm run lint     # ESLint validation
npm run build    # Production build and TypeScript validation
npm start        # Run the production build
```

## Environment variables

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-publishable-key
NEXT_PUBLIC_SITE_URL=https://your-portfolio-domain.com
```

Never expose or commit a Supabase service-role key.

## Project structure

```text
tharindu-portfolio/
|-- app/
|   |-- admin/                 # Protected project management page
|   |-- projects/              # Complete public project archive
|   |-- globals.css            # Design system and responsive styles
|   |-- layout.tsx             # Metadata, providers, and analytics
|   |-- opengraph-image.tsx    # Generated social-sharing image
|   |-- page.tsx               # Homepage route
|   |-- robots.ts              # Search crawler configuration
|   `-- sitemap.ts             # Public sitemap
|-- components/
|   |-- portfolio.tsx          # Homepage UI and animations
|   `-- providers.tsx          # Theme provider
|-- lib/
|   |-- data.ts                # Local project fallback and site content
|   |-- projects-store.ts      # Supabase project data adapter
|   `-- supabase.ts            # Supabase browser/server client
|-- public/
|   |-- portfoliovideo.mp4     # Optimized 1080p homepage film
|   |-- *-project.png          # Project screenshots
|   |-- profilepic.png         # Profile image
|   |-- Tharindu-Bandara-CV.pdf
|   `-- icon.svg
|-- supabase/
|   |-- schema.sql             # Tables and row-level security
|   |-- storage.sql            # Project-image bucket and policies
|   `-- replace-projects.sql   # Approved six-project database seed
|-- .env.example
|-- .gitignore
|-- next.config.ts
|-- package.json
`-- tsconfig.json
```

## Supabase setup

1. Run `supabase/schema.sql` in the Supabase SQL Editor.
2. Create an email/password user in Supabase Authentication.
3. Add its UUID to the `admins` table:

```sql
insert into public.admins (user_id) values ('YOUR_AUTH_USER_UUID');
```

4. Run `supabase/storage.sql` to enable project-image uploads.
5. Run `supabase/replace-projects.sql` to install the approved project catalog.
6. Configure `.env.local`, restart the app, and sign in at `/admin`.

Only approved administrators can add, edit, delete, or upload project content. Public visitors have read-only project access.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it into Vercel as a Next.js project.
3. Add these environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your final Vercel or custom-domain URL)
4. Apply them to Production, Preview, and Development.
5. Deploy using the default `npm run build` command.

After deployment, verify `/`, `/projects`, and `/admin`. Uploaded project images and project records persist in Supabase across redeployments.

## Content customization

- Homepage and sections: `components/portfolio.tsx`
- Local fallback data: `lib/data.ts`
- Styling: `app/globals.css`
- Metadata: `app/layout.tsx`
- Homepage video: `public/portfoliovideo.mp4`
- CV: `public/Tharindu-Bandara-CV.pdf`

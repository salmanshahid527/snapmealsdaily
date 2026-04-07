# SnapMealsDaily - Food Blogging Website

A modern, Pinterest-friendly food blogging website built with Next.js, React Query, and Tailwind CSS. Fully integrated with WordPress headless CMS.

## 🚀 Features

- **Beautiful Design** - Clean, aesthetic UI with food-focused color scheme (Orange/Red theme)
- **Dark Mode** - Light and dark theme with system preference support
- **Fast & Responsive** - Mobile-first design, optimized images, ISR caching
- **Pinterest-Friendly** - Optimized for social sharing with rich metadata
- **SEO Optimized** - JSON-LD structured data, dynamic metadata, XML sitemap
- **Recipe Categories** - Browse recipes by breakfast, lunch, dinner, desserts, etc.
- **Search Support** - Debounced search with live results
- **WordPress Integration** - Headless WordPress CMS for content management
- **React Query Caching** - Efficient client-side data management with server-side ISR

## 📋 Tech Stack

- **Framework**: Next.js 16.2.2
- **Frontend**: React 19.2.4 + TypeScript
- **Styling**: Tailwind CSS v4
- **Data**: React Query v5 + WordPress REST API
- **Animations**: Framer Motion v12
- **Theme**: next-themes (dark mode)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd snapmealsdaily
npm install
```

### 2. Configure Environment Variables

Edit `.env`:

```env
NEXT_PUBLIC_API_URL=https://api.snapmealsdaily.com/wp-json
NEXT_PUBLIC_SITE_URL=https://snapmealsdaily.com
```

Replace with your actual WordPress API URL and site URL.

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
snapmealsdaily/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── [slug]/page.tsx      # Dynamic posts/pages
│   ├── blog/page.tsx        # Blog listing
│   ├── category/[slug]/     # Category archives
│   ├── search/page.tsx      # Search results
│   └── about/, contact/     # Static pages
│
├── components/               # React components
│   ├── layout/              # Header, Footer, Container
│   ├── home/               # Homepage sections
│   ├── blog/               # Blog components
│   ├── article/            # Article display
│   ├── providers/          # React Query + Theme
│   └── seo/                # JSON-LD schemas
│
├── hooks/                   # Custom React hooks
│   ├── usePosts.ts
│   ├── useCategories.ts
│   ├── useSearch.ts
│   ├── useActiveHeading.ts
│   └── ...
│
├── lib/                     # Utilities & business logic
│   ├── constants.ts        # Site config, colors, paths
│   ├── utils.ts            # Helpers (format, truncate, etc.)
│   ├── seo.ts              # SEO metadata builders
│   ├── animations.ts       # Framer Motion variants
│   ├── html.ts             # HTML processing pipeline
│   └── wp/                 # WordPress API integration
│       ├── client.ts       # Fetch wrappers
│       ├── types.ts        # WordPress types
│       ├── map.ts          # Type mappers
│       ├── post.ts         # Post queries
│       ├── categories.ts   # Category queries
│       ├── pages.ts        # Page queries
│       └── ...
│
├── types/                  # TypeScript definitions
│   └── index.ts
│
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── logo.svg
│   └── robots.txt
│
└── Configuration Files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    └── .env
```

## 🎨 Color Scheme

Food-inspired, Pinterest-friendly colors:

- **Primary**: `#FF6B6B` (Appetizing red)
- **Secondary**: `#FFA07A` (Light salmon)
- **Accent**: `#4ECDC4` (Teal)
- **Success**: `#95E1D3` (Mint/Fresh)
- **Warning**: `#FFB84D` (Amber/Warm)

Each recipe category has its own color for easy visual distinction.

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimized (md breakpoint)
- Desktop enhanced (lg breakpoint)
- Touch-friendly navigation
- Light and dark mode support

## 🔄 Data Flow

### Server-Side (ISR)

1. Page component calls `getPostsForBlog()`, `getCategories()`, etc.
2. Functions wrapped with React's `cache()` for per-request deduplication
3. `fetchWp()` uses ISR with 60s revalidate
4. Data passed to components as `initialData`

### Client-Side (React Query)

1. Components receive `initialData` from server
2. React Query skips refetch if `initialData` present (infinite staleTime)
3. User interactions trigger new queries (search, pagination, filters)
4. Debounce prevents excessive API calls

## 🔍 Key Features

### HTML Processing Pipeline

WordPress content automatically processed:
- Sanitize (remove scripts, iframes, event handlers)
- Rewrite URLs (WordPress → site URL)
- Force HTTPS on images
- Lazy-load images (first eager, rest lazy)
- Extract FAQ from H3 + P patterns

### Search & Filter

- Debounced search (min 2 characters)
- Category filtering
- View mode toggle (grid/masonry)
- Results count display

### Article Features

- Table of contents with active heading tracking
- Author card with bio
- Related posts per category
- FAQ section (auto-extracted)
- Social share buttons
- Breadcrumb navigation
- JSON-LD structured data

## 📊 Performance

- **ISR Caching**: 60-second revalidate for fresh content without rebuilds
- **Image Optimization**: Next.js Image component with lazy loading and responsive sizes
- **Request Deduplication**: React's `cache()` prevents duplicate requests per page render
- **Client Caching**: React Query with smart stale time management
- **Code Splitting**: Automatic with Next.js App Router

## 🌐 SEO

- Dynamic metadata per post/category
- XML sitemap generation
- JSON-LD schemas (Article, Breadcrumb, Organization)
- OpenGraph + Twitter card support
- Canonical URLs
- Mobile-friendly design
- Structured data for recipes

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Other Platforms

Build and start:

```bash
npm run build
npm start
```

### Environment Variables

Set on your hosting platform:

```
NEXT_PUBLIC_API_URL=https://your-wp-domain.com/wp-json
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📝 Configuration

### Customize Site Settings

Edit `lib/constants.ts`:

```typescript
export const SITE_NAME = "YourSiteName";
export const SITE_DESCRIPTION = "Your description";
export const CATEGORIES_HOME = ["breakfast", "lunch", "dinner"];
export const SOCIAL = { pinterest: "...", instagram: "..." };
```

### Add Custom Colors

Edit `lib/constants.ts` `COLORS` and `CATEGORY_COLORS` objects.

### Modify WordPress Queries

Edit `lib/wp/post.ts`, `lib/wp/categories.ts`, etc. for custom queries/filtering.

## 🤝 WordPress Setup

This site requires a WordPress installation with REST API enabled.

### Required

- WordPress 5.0+
- REST API enabled (default)
- Published posts with featured images
- Published categories
- Published pages

### Optional

- Gravatar for author avatars
- Custom taxonomies
- SEO plugins (Yoast, etc.)

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [Framer Motion](https://www.framer.com/motion/)

## 📄 License

MIT License - feel free to use this project for your food blog!

## 🤕 Support

For issues or questions:

1. Check the configuration in `.env`
2. Verify WordPress API is accessible
3. Check browser console for errors
4. Review Terminal/console output during build

---

**Happy cooking! 🍳**

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

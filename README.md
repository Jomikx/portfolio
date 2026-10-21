# Aljo M. Tacud — Portfolio

Next.js 14 site. No database, no API keys.

## Run it on your computer
1. Install Node.js 18.18 or newer from https://nodejs.org (LTS).
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000 in Chrome.

## Change your content
- All the text is in `lib/content.js` (name, links, projects, stack, workshop, foundations).
- Head photos are in `public/head/` (center, left, right, up, down, up-left, up-right, down-left, down-right). Keep the same names. Square images, same framing.
- School activities are in `public/projects/<activity-name>/`. Open any `index.html` in Chrome to run it by itself.
- To add an activity: copy its folder into `public/projects/`, then add an entry to `projects` in `lib/content.js`.
- Colors and layout are in `app/globals.css`.

## Put it online with Vercel
1. Create a new empty repository on GitHub (for example `portfolio`).
2. In this folder, run:
   ```
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/Jomikx/portfolio.git
   git push -u origin main
   ```
3. Go to https://vercel.com/new, click Import next to the `portfolio` repository, then Deploy. Vercel detects Next.js by itself.
4. In the project on Vercel, open Settings, then Domains, to rename the free address (for example aljo-tacud.vercel.app).
5. Every push to GitHub redeploys automatically.

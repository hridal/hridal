# hridal

My personal site: one page with About, Experience, Essays, CV and Contact. Built with Astro, hosted on Vercel.

## Where to edit things
- **About, education, skills, email and links**: all in `src/data/me.ts`
- **Experience**: `src/content/experience/`, one file per role. A lower `order` number shows first.
- **Essays**: `src/content/essays/`, one file per essay. Add `draft: true` to hide one.
- **CV PDF**: upload it as `public/cv.pdf`

To add something, copy an example file, edit the top section, write underneath and commit. Vercel redeploys on its own.

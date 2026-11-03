# Visual Studios Plus — website

React + Vite single-page site for Visual Studios Plus (Colombo). Motion is built with GSAP (ScrollTrigger) and Lenis smooth scrolling.

## Run

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

The app uses client-side routing, so any static host needs a fallback that serves `index.html` for unknown paths.

## Structure

```
public/assets/        images, client logos, photo archive (full + thumb)
src/data/site.js      all copy and lists: clients, films, case studies, services, stats …
src/data/photos.json  the 115-photo archive index (file, thumb, category, size)
src/pages/            one component per route
src/components/       layout (Nav, Footer, BackToTop, SheetDock), home sections, work pieces
src/context/          page meta + footer CTA, contact sheet, page transitions
src/lib/              motion helpers (GSAP/Lenis), storage, scroll reveals
src/styles/           style.css (brand tokens + home), pages.css (inner pages), brand.css (Signal Yellow layer)
legacy-static/        the previous static HTML build, kept for reference (safe to delete)
```

## Routes

`/` · `/work/` · `/work/:slug/` (4 films) · `/photography/` (`?category=food|fashion|jewellery|hospitality`) · `/services/` · `/about/` · `/contact/` · anything else → 404.

## Editing content

Most text and lists live in `src/data/site.js`. To add photos, put the file in `public/assets/photos/full/`, a ~900px WebP in `public/assets/photos/thumb/`, and an entry in `src/data/photos.json`.

The contact form opens the visitor's e-mail app with the brief filled in; there is no server-side form handling.

## Brand system (Signal Yellow edition)

Colour, type, spacing and motion tokens live in the `:root` block at the top of `src/styles/style.css`
(`--ink`, `--paper`, `--signal`, `--signal-deep`, `--signal-glow`, plus Stone/Mist/Graphite). Jost 200/300/500
is used for display, headings and labels, and Quicksand 400 for body copy. `src/styles/brand.css` holds the shared
components: header and menu, `.btn` / `.plusLink`, the three signatures (`<SignalLine />`, `.inkBand`, `.plus`),
the home hero and studio sections, inner-page heroes and the footer band.

Yellow rules: Signal Yellow only on Ink (fills, numbers, "+", links, active states); Yellow Deep for accent text
on Paper; never behind client photography; one Signal Yellow button per screen (the header's "Start a project").
The full wordmark in `public/assets/img/VSP-wordmark.png` was taken from the brand guidelines PDF; swap in the
master vector file when it is available.

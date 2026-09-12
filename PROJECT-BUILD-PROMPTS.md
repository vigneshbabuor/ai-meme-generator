# AI Meme Generator

## 1. Create the foundation

```text
Build the project root as Vite + React 19 + TypeScript; do not create a nested app or edit server/.

Match package.json: dependencies react ^19.2.8, react-dom ^19.2.8, express ^5.2.1, dotenv ^17.4.2; dev dependencies @types/react ^19.2.17, @types/react-dom ^19.2.3, @vitejs/plugin-react ^6.0.4, concurrently ^9.2.4, typescript ~6.0.2, vite ^8.1.1. Use type=module and the current scripts: dev runs `concurrently -k -n web,api -c cyan,magenta "vite" "node --watch server/index.js"`; dev:web=`vite`; dev:api=`node --watch server/index.js`; build=`tsc && vite build`; preview=`vite preview`.

Create vite.config.ts with React and `/api` proxy to `http://localhost:8787`. Create tsconfig.json with target ES2023, module esnext, ES2023+DOM libs, vite/client, bundler resolution, react-jsx, noEmit, allowArbitraryExtensions, allowImportingTsExtensions, skipLibCheck, verbatimModuleSyntax, moduleDetection force, unused checks, erasableSyntaxOnly, noFallthroughCasesInSwitch, and include only `src`. Create index.html (#root, provided `/favicon.svg`, title `AI Meme Generator · Naukri Bootcamp`), main.tsx (StrictMode + App + style.css), temporary App heading and minimal reset. Remove demo code; install and build.
```

**Check:** Heading renders; build passes.

## 2. Add types and category data

```text
Create src/types.ts: CategoryId = 'bollywood' | 'cartoon' | 'viral-songs' | 'sports'; Category = { id: CategoryId, label: string, emoji: string, blurb: string }; Meme = { id: string, imageUrl: string, caption: string }.

Create src/data/categories.ts exporting typed CATEGORIES: Bollywood/🎬/Filmy drama & dialogues; Cartoon/📺/Childhood throwbacks; Viral Songs/🎵/Stuck-in-your-head hits; Sports/🏆/Cricket, football & more. This is the only category-data source.
```

**Check:** Build passes; UI is unchanged.

## 3. Build the static UI

```text
Create Header (`app-header`, `__logo/title/subtitle`), EmptyState (`empty-state`, `__title/hint`) and CategoryPicker (`category-grid`, `category-card`, `--active`, `__emoji/label/blurb`).

Header: aria-hidden 🔥, `AI Meme Generator`, `Naukri AI Bootcamp · Week 01`. EmptyState: `Pick a category to start` and `We'll whip up 5 fresh memes — captions written by AI, printed onto classic meme templates.` CategoryPicker props: activeCategory, disabled, onSelect; group label `Meme categories`; map CATEGORIES through an internal CategoryCard using stable keys and real type=button controls with disabled, aria-pressed and aria-hidden emoji.

Temporarily use typed activeCategory state in App. Compose `.app`: Header; `.app__main`; `.pitch` with `.pitch__title` `Instant memes, zero effort` and `.pitch__text` `Choose a vibe and get five ready-to-share memes in seconds.`; picker; EmptyState; `.app-footer` text `Built for the Naukri AI Bootcamp · Captions by AI via OpenRouter · Images by memegen.link`.
```

**Check:** Four buttons render; selection moves between them.

## 4. Match the visual system

```text
Implement the current Paper Brutalism style.css exactly.

Tokens: paper #f4f1e9, card #fffdf7, ink #16160f, muted #5c5a4f, accent #12b5a5, accent-ink #063f39, highlight #ffd23f, danger #ff5c4d; line 2.5px solid ink; shadows 5px and 8px hard ink; radius 12px; Helvetica/system font; light color scheme and antialiasing. Reset margin/padding/box-sizing. Body: min-height 100vh and 22px radial dot grid (rgba(22,22,15,.09), 1.4px).

App: max-width 1080px, centered, min-height 100vh, column, padding 28px 20px 64px. Header: flex center, gap 14px, card/border/radius/shadow, padding 14px 18px; logo is a 52px grid-centered bordered yellow box, font 28px, radius 10px; title 22px/800 with -.02em tracking; subtitle margin-top 3px, 12px/700 uppercase with .18em tracking. Main: flex:1, margin-top 40px, gap 26px.

Pitch title: clamp(2rem,5.5vw,3.4rem), line-height .98, weight 900, -.03em tracking, uppercase; ::after 96×8 teal bordered bar, margin-top 14px, radius 4px. Pitch text: margin-top 16px, 1.05rem/500, muted, max 48ch. Category grid: auto-fill minmax(200px,1fr), gap 16px. Cards: left-aligned ink text, column gap 6px, padding 18px, card/border/radius/shadow, pointer cursor; active yellow; emoji 30px; label 1.15rem/800; blurb .85rem/500 muted.

Interactive cards: .12s transitions; hover translate(-2px,-2px)+large shadow; press translate(2px,2px)+2px shadow; focus-visible 3px teal outline with 3px offset; disabled opacity .5/no shadow/not-allowed cursor. Empty: dashed 2.5px border, padding 44px 28px, centered card; title 1.3rem/800 uppercase; hint max 46ch, margin 8px auto 0, muted/500. Footer: margin-top 48px, padding-top 18px, top border, centered .8rem/600 muted. At 640px app padding is 20px 16px 48px.
```

**Check:** Shell matches the desktop and mobile reference.

## 5. Add the API and state hook

```text
Create src/api/memes.ts with generateMemes(category: CategoryId): Promise<Meme[]>. POST `/api/memes` with Content-Type application/json and JSON `{ category }`; if !res.ok throw `Couldn't generate memes. Please try again.`; return `(await res.json()).memes as Meme[]`.

Create src/hooks/useMemeGenerator.ts with memes=[], activeCategory=null, loading=false, error=''. generate(category) sets loading, clears error, sets category, awaits generateMemes, stores results, catches the Error message or `Something went wrong.`, and stops loading in finally. Do not clear old memes. Return `{ memes, activeCategory, loading, error, generate }`; do not connect App yet.
```

**Check:** Build passes; `fetch` exists only in `src/api/memes.ts`.

## 6. Render all async states

```text
Create Spinner (`spinner`, `spinner__ring/label`) with optional label=`Cooking up memes…`, role=status, aria-live=polite and aria-hidden ring.

Replace App state with useMemeGenerator. Derive hasMemes and activeLabel from CATEGORIES. Pass activeCategory/loading/generate to CategoryPicker. In order render: error as `.error` role=alert; loading Spinner label `Cooking up ${activeLabel ?? ''} memes…`; temporary count when !loading && hasMemes; EmptyState when !loading && !hasMemes && !error.

Style spinner as a row (gap 14px, padding 20px, muted/700); ring 26px with 4px ink border, teal top and .8s linear spin. Error: coral, border/shadow, padding 14px 18px, radius 10px, weight 700.
```

**Check:** Idle, loading, success and failure work; picker disables while loading.

## 7. Render results and shuffle

```text
Create Button extending native button props with required children and optional primary|ghost variant defaulting to primary; render `btn btn--${variant}`. Create presentational MemeCard article (`meme-card`) with lazy square `meme-card__img` using caption alt and `meme-card__caption`. Create MemeGallery as `.gallery` section labelled `Generated memes`, mapping by meme.id.

Replace count with `.results-bar` when !loading && hasMemes: `.results-bar__title` `${activeLabel} memes`; ghost Button `🔀 Shuffle again` regenerates activeCategory; then MemeGallery.

Style result bar flex/wrap/space-between, gap 12px; title 1.35rem/800 uppercase with -.01em tracking. Buttons: inherited font, weight 800, pointer cursor, line/radius 10px/shadow, padding 10px 18px, .12s transition and existing hover/press/focus; primary teal/accent-ink, ghost card/ink. Gallery: auto-fill minmax(240px,1fr), gap 18px. Card: inherited font, left aligned, pointer cursor, padding 0, full-width flex column, card/line/radius/shadow, hidden overflow, .12s transition and existing interactions. Image: display block, width 100%, aspect 1/1, object-fit cover, paper, bottom border. Caption: display block, padding 14px 16px, .92rem/1.4/600.
```

**Check:** Five cards render; Shuffle repeats the active category.

## 8. Add the preview modal

```text
Refactor MemeCard to type=button with onOpen(meme), aria-label `Open meme: ${meme.caption}`, and reset button defaults. MemeGallery owns selected: Meme|null and conditionally renders MemeModal.

MemeModal classes: `modal`, `modal__card/close/img/caption/open`. Root: role=dialog, aria-modal=true, aria-label=`Meme preview`, backdrop onClick closes. Card stops propagation. Show autofocus × button (type=button, aria-label=`Close preview`), uncropped image/caption, and `btn btn--primary` link `Open image in new tab` with target=_blank and rel=noopener noreferrer. One effect handles Escape and sets body overflow hidden; cleanup removes listener and resets overflow.

Style backdrop fixed/inset 0/z-index 100, flex-centered, padding 24px, rgba(22,22,15,.72), .15s fade. Card: relative flex column, align-items center, gap 16px, width min(560px,100%), max-height 90vh, overflow auto, padding 20px, card/line/radius/large shadow. Close: absolute -14px/-14px, grid-centered 40px yellow circle with ink text/line/shadow, 24px font, pointer cursor; hover translate(-1px,-1px), focus 3px teal with offset. Image: width 100%, max-height 62vh, object-fit contain, paper/line/radius 10px. Caption: centered 1rem/1.45/700; link has no underline. At 640px close moves to 8px. Reduced-motion sets animation-duration .001ms!important and transition none!important.
```

**Check:** Click/keyboard opens; X, backdrop and Escape close; body scroll restores.

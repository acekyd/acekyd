# Shared HTML slide assets

This folder is the fixed public runtime and style layer for slide decks hosted on adewaleabati.com.

Each deck lives in `public/slides/<slug>/index.html` and keeps its deck-specific CSS embedded in that HTML. Images and other talk-specific files belong in that deck's `assets/` directory.

Shared files:

- `assets/fonts.css`
- `assets/base.css`
- `assets/themes/ace-brand.css`
- `assets/animations/animations.css`
- `templates/ace-talk/style.css`
- `public.css`
- `runtime.js`

The public runtime supports keyboard navigation, fragment reveals, horizontal swipe, fullscreen, overview, hash deep links, progress, and preview screenshots. It intentionally excludes the editor, presenter mode, and speaker notes.

A deck one directory below `/slides/` links to the shared layer with `../_shared/html-ppt/...`.

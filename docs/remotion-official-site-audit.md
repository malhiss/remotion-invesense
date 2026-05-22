# Remotion Official Site Audit

Date: 2026-05-21

This document summarizes a crawl of the official Remotion website using the live sitemap at `https://www.remotion.dev/sitemap.xml`.

## Coverage

- Total sitemap URLs checked: `988`
- HTTP `200` responses: `988`
- Non-200 responses: `0`
- Redirects found: `1`
- Redirect observed: `https://www.remotion.dev/docs/motion-blur/motion-blur` -> `https://www.remotion.dev/docs/motion-blur/trail`

## Site Shape

Top non-doc sections by URL count:

- `blog`: `29`
- `prompts`: `28`
- `experts`: `24`
- `templates`: `24`
- `success-stories`: `7`
- `learn`: `3`
- `showcase`: `2`

Top docs families by URL count:

- `lambda`: `98`
- `cloudrun`: `42`
- `recorder`: `33`
- `sfx`: `32`
- `webcodecs`: `31`
- `media-parser`: `29`
- `miscellaneous`: `25`
- `editor-starter`: `24`
- `studio`: `23`
- `transitions`: `23`
- `troubleshooting`: `22`
- `paths`: `21`
- `cli`: `19`
- `shapes`: `19`
- `renderer`: `18`
- `player`: `17`
- `terminology`: `15`
- `audio`: `12`
- `captions`: `11`
- `ai`: `10`
- `mediabunny`: `9`

## What The Official Site Proves

### Remotion is a platform, not just a render library

The official surface spans:

- core framework docs
- local Studio workflows
- embedded playback through `@remotion/player`
- cloud rendering with `@remotion/lambda` and `@remotion/cloudrun`
- app-building surfaces like Timeline, Recorder, and Editor Starter
- AI-native workflows and coding-agent support

### AI is a first-class product direction

The official AI section includes:

- `docs/ai/coding-agents`
- `docs/ai/skills`
- `docs/ai/system-prompt`
- `docs/ai/mcp`
- `docs/ai/generate`
- `docs/ai/ai-saas-template`

This is a strong signal that Remotion is intentionally optimized for agent-assisted creation.

### Premium motion work is officially supported

The official packages and docs cover:

- captions and transcription
- local and Google font loading
- transitions
- Lottie
- Rive
- Three.js
- Skia
- motion blur
- noise
- light leaks
- reusable sound effects
- layout helpers

### The product ecosystem is already broad

The official public-facing sections include:

- showcase projects
- prompt showcase entries
- success stories
- starter templates
- experts directory
- learning/tutorial archive

This means Remotion already supports use cases across:

- social reels
- product demos
- code animation
- personalized video generation
- screen recording and editing
- motion graphics
- data visualization
- transparent overlays
- 3D and map-based storytelling

## Most Important Official Sections

If we need to prioritize reading, these are the highest-signal entry points:

- Homepage: `https://www.remotion.dev/`
- Docs index: `https://www.remotion.dev/docs`
- API overview: `https://www.remotion.dev/docs/api`
- AI docs: `https://www.remotion.dev/docs/ai`
- Prompt Showcase: `https://www.remotion.dev/prompts/`
- Showcase: `https://www.remotion.dev/showcase/`
- Templates: `https://www.remotion.dev/templates/`
- Resources: `https://www.remotion.dev/docs/resources`
- About: `https://www.remotion.dev/about/`
- Blog: `https://www.remotion.dev/blog`
- Releases: `https://github.com/remotion-dev/remotion/releases`

## Project Implications

For this repository, the official site strongly supports building around:

- parameterized compositions instead of one-off scenes
- branded typography and layout systems
- captions as a core primitive for social video
- reusable transition and SFX layers
- asset-driven workflows using Lottie, SVG, images, and video
- AI-assisted prompting and composition generation

## Notes

- Some landing pages and profile-style pages do not expose a simple top-level `h1` in static HTML, but they still returned `200` and loaded successfully.
- The docs surface is heavily weighted toward deployment, rendering infrastructure, media tooling, and editor-like workflows. This is useful context when deciding which packages to install next and which parts of the ecosystem matter for our use case.

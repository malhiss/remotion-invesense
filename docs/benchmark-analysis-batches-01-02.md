# Benchmark Analysis - Batches 01 and 02

Date: 2026-05-21

## Scope

- Videos processed: `32`
- Analysis artifacts generated per video:
  - `summary.json`
  - `transcript.srt`
  - `transcript.txt`
  - `contact.jpg`
  - sampled still frames
  - `scene-log.txt`

The analysis was generated with:

- `ffprobe` for stream and duration metadata
- `ffmpeg` for frame sampling and scene detection
- local `whisper.cpp` model via FFmpeg for offline transcription

## What These Videos Are About

Across the first two batches, the benchmark set clusters around macro-finance, crypto, tokenization, AI infrastructure, and market psychology.

Repeated narrative angles include:

- Bitcoin trend breaks, support levels, and cycle behavior
- global liquidity, dollar strength, inflation, deflation, and macro regime shifts
- AI layoffs, AI infrastructure spending, and second-order bottlenecks
- blockchain rails, stablecoins, tokenization, and settlement speed
- contrarian investor framing around valuation, supply, and market structure

## Style Families

### Family A - Minimal glossy 3D explainer

Most visible in the titled batch-02 benchmark reels.

Visual traits:

- black or off-white backgrounds
- large bold numeric callouts
- glossy monochrome 3D objects
- glowing spherical character or narrator stand-in
- clean floating props with subtle green accent lighting
- simplified diagrammatic space instead of realistic scenes

Typical assets:

- server racks
- coins and dollar icons
- buildings
- stock labels
- message bubbles and phone UIs
- post office and document metaphors
- brand logos like Google, Microsoft, Amazon, Meta, Visa, Mastercard, Stripe, PayPal

Animation language:

- hard cuts between single-idea scenes
- text appearing word-by-word or phrase-by-phrase
- object slides and gentle scale-ins
- glow, bloom, and spotlight effects
- orbit lines, rings, and directional paths
- occasional lens-flare-like transitions

Typical use:

- one metaphor per beat
- one visual object per idea
- numerical hook -> mechanism -> payoff -> CTA

### Family B - White-background chart explainer

Visible in the batch-01 `2026-04-30` and `2026-05-16` WhatsApp exports.

Visual traits:

- mostly white background
- black body text with key words emphasized
- chart-first storytelling
- line charts, candlesticks, and macro overlays
- creator watermark / social handle in-frame

Typical assets:

- Bitcoin logo
- chart screenshots or recreated chart shapes
- moving average overlays
- candlesticks
- macro labels and simple arrows

Animation language:

- punchy kinetic text
- chart reveals and marker callouts
- minimal object motion compared to Family A
- less cinematic depth, more information density

Typical use:

- market thesis videos
- chart breakdowns
- CTA end cards asking for a comment keyword

### Family C - White-background logo / infographics explainer

Visible in at least one of the batch-02 WhatsApp exports around AI CapEx risk.

Visual traits:

- white background
- flat or semi-flat icon illustrations
- large corporate logos and recognizable faces
- server, shipping, and infrastructure symbols

Typical assets:

- hyperscaler logos
- simple server stacks
- package or shipping icons
- world / supply-chain symbols
- founder or CEO headshots

Animation language:

- logo scaling and reordering
- infographic substitution from one icon to another
- large stat boards and warning-card moments

## Recurring Motifs

- giant numeric opener to establish authority
- single dominant metaphor per section
- conversion of abstract finance into concrete objects
- anthropomorphic narrator orb or observer figure
- logos treated as characters in a story
- CTA keyword at the end to drive comments
- alternating black/white scenes to reset attention

## Recurring Metaphors

These benchmarks repeatedly explain finance with simple physical systems:

- support line as a trampoline or safety net
- card rails as a tax on commerce
- legacy settlement as postal mail
- tokenization as the email moment for finance
- strong dollar as a vacuum cleaner sucking liquidity
- buybacks as houses being demolished in a neighborhood
- liquidity level vs momentum as a plane still high in the air but running out of fuel
- AI infrastructure as physical supply-chain and energy bottleneck, not just software

## Topic Notes

### Clear English-finance explainers

These are the cleanest transcripts and strongest reverse-engineering targets:

- `150,000 people lost their jobs to AI...`
- `Everyone is focused on the Real World Assets...`
- `Money moved $33 trillion on blockchains last year...`
- `READ FOR FREE - The next stock supply wave...`
- `The plumbing of American finance is being rebuilt...`
- batch-01 `2026-04-30` set
- batch-01 `2026-05-16` set

### Mixed-language or noisier WhatsApp copies

Some of the `2026-05-17` and `2026-05-19` WhatsApp clips appear to be alternate-language, reposted, or recompressed variants. The transcripts are noticeably noisier, but the visuals still strongly suggest:

- crypto / macro explainer structure
- similar CTA endings
- similar creator logic and pacing
- the same broad benchmark language even when audio transcription quality drops

## Reconstruction Implications For Remotion

To reproduce this benchmark corpus well, the Remotion system should prioritize:

- reusable number-hook scenes
- kinetic word-stack typography
- data-visual scenes for charts and line overlays
- logo-and-object composition blocks
- metaphor scene templates like postal mail, token transfer, server racks, phone UI, chart break, and spotlight reveal
- CTA end-card templates
- a small design system that can switch between:
  - dark glossy 3D explainer mode
  - white chart explainer mode
  - white infographic / corporate-logo mode

## Important Caveat

The Arabic or mixed-language WhatsApp variants are less reliable from transcript alone. For those, the visual contact sheets and scene structure are more trustworthy than the raw transcription text.

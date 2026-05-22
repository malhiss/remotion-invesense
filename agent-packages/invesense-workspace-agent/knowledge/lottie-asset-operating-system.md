# Lottie Asset Operating System

Lottie is an asset source and motion layer. Lottie is not the hero metaphor. This means the Workspace Agent should absolutely search LottieFiles and similar sources for useful animated assets, but it should select them by role in the story rather than letting a generic premade animation become the story.

Good Lottie roles:

- Route pulse through a payment, data, or settlement rail.
- Highlight sweep over a chart event.
- Proof burst after a stamp, latch, endpoint, or selection.
- Checkmark, warning mark, rejected path, or approved path.
- Loader, subtle icon, money transfer accent, data flow accent, CTA pulse.

Bad Lottie roles:

- Generic money animation as the entire reel.
- Premade chart animation replacing source-locked chart reconstruction.
- Decorative confetti unrelated to proof.
- Standalone proof with no source event.
- Remote browser-scraped animation required during render.

Every Lottie candidate needs a motion role, source URL or local path, license note, approved usage, human approval, and native Remotion fallback. The fallback matters because Remotion can recreate many simple pulses, sweeps, bursts, arrows, and icons natively if the Lottie flickers, fails, has licensing risk, or adds clutter.

Workspace Agent owns Lottie discovery, role fit, license/source notes, and approval. Codex owns deterministic ingestion only after approval: local JSON or direct JSON URL, manifest entry, staticFile usage, and Lottie QA frames for entry, peak, and exit.

The decision sentence is: use Lottie heavily where it improves motion texture or asset clarity, but never outsource the reel's core financial mechanism to a generic Lottie asset.

# Benchmarks

Reference videos we want to match or reverse-engineer live here.

## Structure

- `batch-01/source/`: raw benchmark videos copied into the project
- `batch-01/manifest.json`: ffprobe-backed metadata for the batch
- `batch-01/analysis/`: reserved for scene lists, transcripts, extracted frames, and notes

## Batch 01

- Files: `21`
- Total size: `178514182` bytes
- Source format observed so far: portrait `576x1024` H.264 MP4 with AAC audio

## Batch 02

- Files: `11`
- Total size: `83905711` bytes
- Mixed source patterns:
  - direct social exports around `720x1280` H.264 MP4 with AAC audio
  - WhatsApp-style copies around `576x1024` H.264 MP4 with AAC audio

## Planned deconstruction flow

1. Use `ffprobe` to lock metadata, stream layout, frame rates, and durations.
2. Use `ffmpeg` scene and frame analysis to extract cuts, thumbnails, and timing clues.
3. Add speech-to-text or caption extraction when narration matters.
4. Rebuild reusable visual patterns in Remotion compositions.

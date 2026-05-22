# Supplied SVG Chart Audit

Phase 4 Add-On audit status: all four supplied market-insight SVGs are supported by the intake lane. They are not ingested into `public/source-charts/` yet because ingestion requires explicit human approval metadata through `npm run svg:chart-ingest`.

## `chart_01_sector_breakdown.svg`

- Classification: `horizontal-bar`
- Confidence: `high`
- Title: `Sector weights - MSCI Saudi Arabia Index, May 2026`
- Unit: `% of MSCI Saudi Arabia Index`
- Source note: `Invesense Research | MSCI Inc. via iShares MSCI Saudi Arabia ETF | May 2026`
- Extracted categories: 11
- Extracted values: 11
- Extracted source bars: 11
- Production implication: ready for source-faithful animated horizontal bar reconstruction after Workspace Agent approves the chart role and highlight/proof event.

## `chart_02_issuance_by_region.svg`

- Classification: `grouped-vertical-bar`
- Confidence: `high`
- Title: `SUKUK ISSUANCE BY REGION`
- Subtitle: `GCC has overtaken Southeast Asia as the primary issuance engine`
- Source note: `Invesense Research | Bloomberg LEAG | April 2026`
- Extracted x labels: 2016-2025
- Extracted series: `GCC Bonds & Sukuk`, `International Sukuk`, `Malaysian Ringgit Sukuk`
- Extracted grouped bars: 30
- Production implication: geometry and series structure are reliable, but exact bar values are not printed in the SVG comments. Workspace Agent should source-lock the data table before Codex uses exact value labels in a production reel.

## `chart_01_global_sukuk_issuance.svg`

- Classification: `line-chart`
- Confidence: `medium`
- Title: `GLOBAL SUKUK ISSUANCE`
- Subtitle: `Annual syndicated issuance volume, 2001–2025`
- Source note: `Invesense Research | Bloomberg LEAG | April 2026`
- Extracted x labels: 2001-2025 tick labels
- Extracted headline value: `$150.5B`
- Extracted line path: yes
- Production implication: good for source-shape line tracing and endpoint proof birth. Full annual values are not printed in comments, so Workspace Agent should provide the source table if precise yearly labels are required.

## `chart_01_hyperscaler_capex_vs_telecom.svg`

- Classification: `stacked-vertical-bar`
- Confidence: `high`
- Title: `Hyperscaler capex 2018-2027E vs the 1996-2001 telecom buildout peak`
- Unit: `Annual capex (USD billions)`
- Source note: `Invesense Research | Company filings, Yahoo Finance, sell-side consensus | May 2026`
- Extracted x labels: 2018-2027
- Extracted total labels: `$64`, `$69`, `$92`, `$124`, `$150`, `$140`, `$217`, `$357`, `$500E`, `$625E`
- Extracted benchmark label: `Telecom buildout peak (2000): $213B`
- Extracted series: `Microsoft`, `Alphabet`, `Meta`, `Amazon`, `Consensus (E)`
- Production implication: ready for animated stacked-bar reconstruction with a benchmark-line proof event. Segment-level values are geometry-derived, so Workspace Agent should source-lock segment values if the reel labels individual company segments.

## Phase Boundary

This audit does not start a production reel. It prepares Phase 5 so an approved pilot can use source-faithful animated chart proof instead of static SVG pasting or generic chart UI.


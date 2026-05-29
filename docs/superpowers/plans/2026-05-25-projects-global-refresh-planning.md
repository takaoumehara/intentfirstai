> ⚠️ **SUPERSEDED** — This plan has been superseded by the Lean Model Migration (2026-05-27). The architecture is now 6 Stages + 2 Always-On Layers. See `HANDOFF.md` for the current state.

# Projects Global Refresh Planning (Post Task 17)

Date: 2026-05-25
Scope: Planning only for cross-project refresh strategy after Pipeline v2 updates

## 1) Read scope (completed)
- Read: `projects/project-01/index.html`
- Read: `projects/project-03/index.html`
- Read: `projects/project-04/index.html`
- Confirmed project directory state:
  - `project-02`: no `index.html` (current main candidates: `p2-scroll-v2.html`, `p2-family-trip.html`)
  - `project-05`: no `index.html` (current main candidate: `p5-scroll-v2.html`)
  - `project-06`: no `index.html` (current main candidates: `p6-life-brain.html`, `p6-life-brain-v2.html`)

## 2) What changed now (Task 17 alignment baseline)
- Year tag baseline adopted: `Year: 2028-2030`
- Lifecycle annotation baseline adopted in narrative copy:
  - `Inform / Recommend / Plan / Prepare / Act / Monitor / Adapt`
- Baseline reflected on:
  - `projects/index.html`
  - `projects/project-01/index.html`
  - `projects/project-02/p2-scroll-v2.html`
  - `projects/project-03/index.html`
  - `projects/project-04/index.html`

## 3) Global direction for all projects (P1-P6)
Every project page should expose three things in story copy, not only backstage:
1. `Lifecycle verb` active at the moment
2. `Gate behavior` (silent / preview / assumption_cards / confirm / block)
3. `Autonomy resolution` (user setting, gate ceiling, final autonomy)

## 4) Project-by-project planning

### P1 (Living Home)
- Keep as launch candidate.
- Add one compact "Gate trace" strip to key morning scenes.
- Keep family orchestration emphasis; avoid overloading with framework jargon.

### P2 (Family Trip)
- Needs canonical page decision first (`p2-scroll-v2.html` vs `p2-family-trip.html`).
- After canonicalization, add year + lifecycle tags in hero and chapter entry scenes.
- Highlight conflict scenes for Priority Toggle framing (Phase 2 compatible).

### P3 (Fluid Handoff)
- Keep as launch candidate.
- Expand lifecycle annotations at each handoff boundary (phone -> train -> TV -> parent device).
- Add one explicit "good escalation" branch to reinforce trust rationale.

### P4 (Enterprise Context Brain)
- Keep as launch candidate.
- Clarify thesis boundary: enterprise memory governance (not simulator mechanics).
- Add concise Gate + autonomy notes where decision risk increases.

### P5 (Cross-Surface Grammar)
- Hold for structural pass.
- Normalize lifecycle coverage per surface transition.
- Confirm story shows both `silent adaptation` and `user-visible negotiation` cases.

### P6 (Life Brain)
- Hold for structural pass.
- Decide one canonical file (`v2` likely) and archive the other.
- Add domain-by-domain autonomy and gate explanation to avoid ambiguity.

## 5) De-prioritize / retire criteria
De-prioritize a page from publish wave if any of the following is true:
- No clear lifecycle verbs can be mapped scene-by-scene.
- Trust/autonomy rationale is missing from visible story layer.
- Legacy framing dominates (e.g., pre-Pipeline v2 concepts) in public copy.

## 6) Publish wave recommendation
- Wave 1: P1, P3, P4
- Wave 2: P2, P5, P6 (after canonical file + structural refresh)

## 7) Non-goals in this pass
- No simulator updates here (handled in another session by design).
- No broad visual redesign; this is story-architecture and annotation planning only.

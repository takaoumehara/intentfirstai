> ⚠️ **SUPERSEDED** — This plan has been superseded by the Lean Model Migration (2026-05-27). The architecture is now 6 Stages + 2 Always-On Layers. See `HANDOFF.md` for the current state.

# Projects Alignment Plan (Post Pipeline v2)

Date: 2026-05-25
Scope: Project pages strategy only (no implementation in this plan)
Owner: intentfirst

## 0. Decision
- Task 15 and Task 16 are implemented in code.
- Task 17 (project pages) is handled as planning-only in this pass.
- Simulator updates (Task 18) are intentionally deferred to another session.

## 1. Why project story needs re-alignment now
Pipeline v2 changed the narrative contract:
- Decision Pipeline is now explicit Stage 1-8.
- Stage 5 Negotiation Gate and Stage 6 Autonomy Resolution are first-class.
- Agent Action Lifecycle verbs are now canonical: Inform / Recommend / Plan / Prepare / Act / Monitor / Adapt.

Project pages should now explain not only "what UI appeared" but also:
- which lifecycle verb was active,
- whether Gate fired,
- what autonomy ceiling applied,
- how final autonomy was resolved.

## 2. Global project-page standards (for P1-P6)

### 2.1 Metadata / tags
Add a consistent header rail to each project:
- Year: `2028-2030` (or narrower per scenario if known)
- Primary Stage focus: e.g. `Stage 4-7`
- Primary Lifecycle verbs: max 3 per project
- Risk tier: `low / medium / high` (demo-level)

### 2.2 Scene card annotation pattern
Every major scene should include:
- `Lifecycle:` one or more verbs
- `Gate:` `silent` / `preview` / `assumption_cards` / `confirm` / `block`
- `Autonomy:` `user setting`, `gate ceiling`, `final autonomy`

### 2.3 Copy consistency
Replace legacy phrasing:
- "Token(s)" in public story copy -> "Situation Signals" or "Signals & Dials"
- "Suggest" as behavior verb -> "Recommend" (keep Autonomy Dial level "Suggest" only where needed)

## 3. Project 2 / 5 / 6 planning (not implemented)

## 3.1 P2 (Family Trip)
Current primary page appears to be `projects/project-02/p2-family-trip.html` (not `index.html`).

Planned updates:
- Reframe journey around "Prepare -> Plan -> Act -> Monitor" lifecycle chain.
- Mark explicit Gate moments:
  - budget-sensitive booking (likely R40 style behavior)
  - family-preference conflict (Priority Toggle candidate)
- Add `Year 2028-2030` tag rail at hero/meta.

### 3.2 P5 (Cross-Surface Grammar)
Current primary page appears to be `projects/project-05/p5-scroll-v2.html`.

Planned updates:
- Position as "Adapt + Monitor" showcase across surfaces.
- Add Gate note when moving from passive adaptation to user-visible escalation.
- Clarify whether any scene is truly "silent" (R39-like) vs implied but unlogged.

### 3.3 P6 (Life Brain)
Current primary page appears to be `projects/project-06/p6-life-brain-v2.html`.

Planned updates:
- Stronger Brain always-on-layer storytelling with Stage references.
- Add lifecycle badges to each episode:
  - `Inform/Recommend` early,
  - `Act` only when reversibility/risk allows,
  - `Monitor/Adapt` loop explicitly shown.
- Keep frame compliance retrofit as prerequisite before visual polish.

## 4. Pre-launch set (P1 / P3 / P4) review plan
User intent: prioritize publication readiness for P1, P3, P4.

### 4.1 P1 (Living Home)
Keep and publish with targeted updates:
- Add year + lifecycle rail in hero.
- Add one "Gate decision trace" strip for key morning decision.
- Keep broad cast structure (strong storytelling asset).

### 4.2 P3 (Fluid Handoff)
Keep and publish with targeted updates:
- Map each handoff moment to lifecycle verbs.
- Explicitly mark at least one escalation branch as a "good failure" (trust-building).

### 4.3 P4
Keep but tighten scope before publish:
- Ensure storyline is not duplicating P3; define unique thesis (e.g., enterprise/multi-brain governance).
- If sections drift into simulator-like mechanics, collapse or move to appendix.

## 5. Candidate retire/de-prioritize criteria
Do not retire by project number; retire by narrative quality:
- Remove/hold pages where lifecycle cannot be inferred from the scene.
- Remove/hold pages that show adaptation without trust/autonomy rationale.
- Remove/hold pages that still depend on legacy "5-floor/tower" framing in visible copy.

Practical rule:
- If a page cannot be annotated with lifecycle + gate + autonomy in under one pass, hold it from first launch wave.

## 6. Recommended publish wave
Wave 1:
- P1, P3, P4 (after annotation pass)

Wave 2:
- P2, P5, P6 (after structural refresh + frame/data consistency)

## 7. Implementation checklist for a later coding pass
1. Add reusable "project meta rail" component style.
2. Add lifecycle badge style + gate badge style.
3. Annotate P1/P3/P4 first.
4. Run terminology scan on project pages only.
5. Do one coherence read-through from About -> Context Grammar -> Projects.

## 8. Open questions
- Should year always be a range (`2028-2030`) or scene-specific year stamps?
- Should Gate decision be always visible, or only in backstage/expandable details?
- For launch: do we prefer narrative density (fewer badges) or auditability (more badges)?

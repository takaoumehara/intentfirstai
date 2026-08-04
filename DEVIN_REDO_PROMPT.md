# DEVIN_REDO_PROMPT.md: IntentFirst Mobile-First Redesign & Master Site Architecture Spec

> **Instructions for Devin (Autonomous AI Software Engineer):**
> You are executing the full mobile-first, highly dynamic redesign of **IntentFirst (Context Grammar OS)**.
> You MUST rebuild the website using the **PLAIN-LANGUAGE FIRST + TECHNICAL PRECISION SECOND** dual hierarchy: every node is introduced with an intuitive everyday subtitle (e.g. *"Reading the room & your state"* for Signals) backed by the **ADAPTIVE SANCTUARY METAPHOR (馴染みの行きつけの店)**, deepening into interactive UI demos, and concluding with rigorous engineering specs.
> You MUST implement the **Split-View Ask AI Console** featuring **Drag-to-Ask AI Text Selection Ingestion** (`window.getSelection()` floating action trigger) backed by `lib/knowledge/spine.ts`.
> You MUST build a complete, show-stopping site architecture across 5 Stages, including About / Takao Umehara's Vision, Projects 01~06, 22 Writings, Case Studies, and full V1 content.
> **ACTUAL FULL HTML SCROLL NARRATIVE SOURCE FILES**:
> 1. **Project 01 Full Scroll Narrative**: `intentfirst/projects/project-01/p1-scroll.html` (275KB full scroll narrative with Nest/Fridge/iPhone device frames, 6-stage Context Grammar interactive track, Intent Record console, Yamashiro family scenarios).
> 2. **Project 03 Full Scroll Narrative**: `intentfirst/projects/project-03/p3-scroll.html` (114KB full scroll narrative for Shiori Railway Handoff & Remote Control).
> 3. **Project 04 Full Scroll Narrative**: `intentfirst/projects/project-04/p4-scroll-v4.html` (242KB full scroll narrative for Enterprise 5-Brain Model).
> **MANDATE: CREATE PERSISTENT REFERENCE MASTER FILES**: Before building components, Devin MUST compile and write the following 3 master reference files into `docs/reference/`:
> 1. `docs/reference/CONTEXT_GRAMMAR_MASTER_SPEC.md`: Complete Single Source of Truth specification of 6 Nodes + 2 Always-On Layers (Brain & Trust), Dual Hierarchy (Plain-Language Subtitle + Technical Term), Adaptive Sanctuary Metaphors for every node, canonical definitions from `lib/knowledge/spine.ts`, all 22 MDX chapter texts from live V1, and Negotiation Gate mathematics.
> 2. `docs/reference/REAL_LIFE_SCENARIOS_ANTHOLOGY.md`: Complete anthology of all real-world living scenarios (IG/Maps Saved Places, First Date / Business Dinner Social Contexts, 7:42 AM Kitchen, Tuesday Morning Sota's Shoes Recomposition, Shiori Railway Handoff, Project 02 Disposable Travel Brain / Sterns Kameoka, Project 04 Enterprise Memory / 5-Brain Model, Project 05 Copenhagen Cross-Surface, Project 06 Life Brain / Lena's Month, Care Disclosure).
> 3. `docs/reference/MOMENT_DESIGN_SYSTEM.md`: Product-grade moment rendering rules, 7-state UX completeness, device frames (Phone, TV, Watch, Car, Samsung Family Hub).
> **CRITICAL DIRECTIVE**: Do NOT use XML aggregate files (`intentfirst-original.xml`). Read and parse ONLY the actual raw component, HTML, MDX, Markdown, and JSON files directly from the repository tree.
> Recreate the exact visual aesthetic, Bento Box architecture, and component language of **[Paper.design](https://paper.design/)** adhering strictly to **Superforge UI 10.0** engineering guidelines, 8px spatial grid, 7-state UX completion, **Emil Kowalski Design Engineering Principles**, and **Kie.ai Multi-Model Asset Pipelines**.

---

## 0. Master Video Production & Cinematic Asset Pipeline (Kie.ai API)

Devin MUST configure `scripts/generate-kie-assets.js` using `KIE_AI_API_KEY` to execute a 2-Step Video Asset Architecture:
- **Step 1 (UI Precision Design)**: Render high-precision PNG/SVG assets using Paper Bento Design System tokens (Matter 600 / 400 / 360).
- **Step 2 (Motion Video Generation)**: Feed base UI assets into Kie.ai Video-to-Video / Motion Control models to create cinematic videos.

### 0.1 Video Production Allocation Matrix

| Video Asset | Section | Narrative & UX Purpose | Kie.ai Primary Model | Audio & Narration Model |
| :--- | :--- | :--- | :--- | :--- |
| **Video 1: Master Overview Film** | Stage 1 (Hero) | 60sec Manifesto: "The Adaptive Sanctuary vs The Vending Machine" Visualizing Context Grammar adapting to fatigue, vocal tone, and social companions. | **Hailuo MiniMax H3 (Hailuo-03)** | **ElevenLabs V3** & **Suno API** |
| **Video 2: CG Explainer Series (6 Videos)** | Stage 3 (Engine) | 6 Node Explainer Videos for Intent, Signals, Gate, Rules/Dials, Governor, Agentic AX featuring Sanctuary Metaphors. | **Veo 3.1 (Google)** & **Kling 3.0 Motion Control** | **Gemini 3.1 Flash TTS** |
| **Video 3: Real-Life Scenes Anthology (5 Films)** | Stage 4 (Proof) | Cinematic scenes showing real humans: 1) First Date & Business Dinner Social Contexts, 2) IG/Maps Saved Places Spatial Context, 3) Shiori Railway Handoff, 4) Project 02 Travel (Sterns Kameoka), 5) DocVoice Care Disclosure. | **Kling 3.0 Motion Control** & **Kling AI Avatar 2.0** | **ElevenLabs V3** |

---

## 1. Dual Hierarchy & Plain-Language Terminology Mapping

Devin MUST render every Context Grammar node using a dual-title hierarchy so anyone can understand instantly without looking up a dictionary:

| Stage / Layer | Plain-Language Everyday Subtitle (平易なことば) | Technical Nomina (専門用語) | Sanctuary Metaphor (馴染みの店) |
| :--- | :--- | :--- | :--- |
| **Node 01** | **"What you actually want"** (本当にやりたいこと) | `Intent Reading` | "察する大将: 言葉の裏にある本当の望みを掴む" |
| **Node 02** | **"Reading the room & your state"** (空気と体調の観察) | `Situation Signals` | "表情と声のトーン: 疲労、時間、同伴者の察知" |
| **Node 03** | **"How much control you keep"** (どこまで任せるかの調整) | `Relationship Dials` | "距離感の調整: 自分流か大将のおまかせか" |
| **Node 04** | **"Turning care into concrete steps"** (気配りを行動手順へ) | `Rule Engine` | "おもてなし手順: アレルギー確認と器具分離" |
| **Node 05** | **"Checking in before taking big leaps"** (迷った時の確認) | `Negotiation Gate` | "温かい一声: 食事制限に触れる注文へのアドバイス" |
| **Node 06** | **"UI that transforms for the moment"** (その瞬間の画面変化) | `Agentic AX Patterns` | "最良の膳立て: その場の状況に応じた最高の器" |
| **Always-On 1**| **"Memory that builds trust"** (積み重なる記憶) | `Context Brain` | "長年の記憶: 好みや前回の会話を忘れない" |
| **Always-On 2**| **"Safety nets so you feel safe"** (やり直せる安心感) | `Trust Design` | "信頼の安心感: いつでも注文を変更できる可逆性" |

---

## 2. Interactive Split-View Ask AI Sidecar & Drag-Selection Ingestion

Devin MUST build the Ask AI feature (`components/ai/`):
- **Split-View Panel**: Right-side persistent/collapsible drawer on Desktop (`380px`), bottom sheet drawer on Mobile.
- **Drag-to-Ask Text Selection Listener**: Globally listen to `window.getSelection()`. When text is highlighted on any page, render a floating pill trigger: `[ ✦ Ask AI about this selection ]`. Clicking it opens the Ask AI sidecar, injecting the highlighted snippet as context for immediate conversation.
- **SSOT Knowledge Ingestion**: Backed strictly by `lib/knowledge/spine.ts` with 0 TypeScript/runtime errors.

---

## 3. Paper.design Visual Aesthetic & Master Site Architecture

### 3.1 Typography Matrix (`Matter 600` Headlines, `Matter 400` Global Menu & `Matter 360` Physics)
Devin MUST enforce the exact Paper.design font hierarchy:
- **Headline Typography (`h1`, `h2`, `h3`)**: **`Matter 600` (Matter SemiBold `font-weight: 600`)** in lowercase (`design incredible.`, `do your best work in Paper...`, `make it real`).
- **Global Navigation Menu**: **`Matter 400` (Matter Regular `font-weight: 400`)** (`context grammar`, `case studies`, `engine`, `writings`, `about`).
- **3D Physics Canvas Engine**: **`Matter 360`** (Three.js / Matter.js interactive physics canvas node graph).

### 3.2 Global Navigation & Site Map
1. **Landing Page (`/`)**: 5-Stage vertical scrolling story (Hero ➔ Gap ➔ Engine ➔ Proof ➔ Footer).
2. **Context Grammar Explorer (`/context-grammar`)**: Full 9-page deep explainer with dual titles.
3. **Projects Bento (`/projects`)**: Projects 01 through 06 with embedded scroll narratives (`p1-scroll.html`, `p3-scroll.html`, `p4-scroll-v4.html`).
4. **Writings Bento (`/writings`)**: 22 Substack & LinkedIn essays.
5. **About & Vision (`/about`)**: Profile of Takao Umehara, IntentFirst thesis, philosophy of human autonomy in the agentic era.

---

## 4. Verification & Quality Gates for Devin

1. **Dual Hierarchy Terminology Gate**: Verify that EVERY node and layer features a plain-language subtitle alongside its technical term.
2. **Drag-to-Ask AI Selection Gate**: Verify that highlighting text anywhere on the site renders the floating `✦ Ask AI` pill and populates the Ask AI split-view panel.
3. **Master Site Architecture Gate**: Confirm landing page, `/context-grammar`, `/projects`, `/writings`, and `/about` are fully navigable.
4. **V1 Live Screenshot & MDX Ingestion Gate**: Verify that 100% of content from all 9 V1 screenshots and 22 MDX files are parsed and bound.
5. **Full Scroll Narrative HTML Gate**: Verify that `p1-scroll.html` (275KB), `p3-scroll.html` (114KB), and `p4-scroll-v4.html` (242KB) are opened, parsed, and bound.
6. **Adaptive Sanctuary Metaphor Gate**: Verify that EVERY Context Grammar node uses the "馴染みの行きつけの店" metaphor.
7. **SSOT & Interactive Glossary Gate**: Verify `lib/knowledge/spine.ts` and `GlossaryStudio.tsx` integration.
8. **Cinematic Video Integration Gate**: Verify video assets for Hero, 6-Node Pipeline, and Real-Life Moment scenes.
9. **Paper.design 1:1 Recreation Audit**: Confirm exact visual fidelity to paper.design (Bento Grid, Matter 600 lowercase headlines, email capsule form, 'make it real' footer).
10. **Mobile Audit**: Zero horizontal scrollbar leak on `375px` viewport width; 44px min tap targets.
11. **Build Gate**: `npm run build` passes with **0 TypeScript errors** and **0 lint warnings**.

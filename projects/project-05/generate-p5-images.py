#!/usr/bin/env python3
"""
P5 Control Tower — Image Generation via kie.ai (Nano Banana 2)

Usage:
    python generate-p5-images.py

Images saved to ./images/
"""

import requests
import time
import os
import json
import sys

# ── Config ──────────────────────────────────────────────────
API_KEY = os.environ.get("KIE_API_KEY", "c942be1c5ac2d133761fa15bb642415f")
BASE_URL = "https://api.kie.ai/api/v1/jobs"
MODEL = "nano-banana-2"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
POLL_INTERVAL = 5
MAX_WAIT = 120

# ── Style Prefixes ──

ISOMETRIC_STYLE = """[STYLE: WHITENED DYNAMIC ISOMETRIC ILLUSTRATION WITH AIRY TRANSPARENCY]
Clean, sophisticated isometric 3D vector illustration. High-end, light-filled, "whitened" conceptual aesthetic.
Prioritize "whiteness" and "airiness" — extensive light gray (#EEEEEE) background creating spatial freedom and openness.
Complex, stylized, fragmented 3D geometry. Intentionally fragment shapes to allow pure white (#FFFFFF) within elements, creating light and cleanliness.
Matte black (#111111) silhouette human figures, simplified, in isometric perspective. Clean uniform-weight matte black outlines on all forms.
Strict color palette: Orange (#F59400) for energy and action. Blue (#6C82FE) for structure and data. Pink (#FC6978) for accents. Element White (#FFFFFF) for faces and highlights. Matte Black (#111111) for outlines and silhouettes.
Soft-cell shading only — no realistic gradients. White reflections and faces interact with color to create clean light.
Connections shown through clean thin lines of light, precise arcs — not chains or discs.
Plenty of negative space. Airiness is a feature. Do NOT fill empty space with decorative objects.
Every visual element must serve the concept being illustrated. No text labels in the illustration.
Atmosphere: translucent, diffused light quality — as if soft morning light dissolves into the space. A sense of quiet clarity and hope."""

PHOTO_STYLE = """[STYLE: KUUKIKAN PHOTOGRAPHY — FRESH ATMOSPHERIC QUALITY]
Photorealistic image, 16:9 ratio (3840x2160px). Natural, fresh, airy aesthetic with transparent light quality.
Soft, diffused morning light — like sunlight filtering through trees or streaming through a window. Light dissolves into space, not harsh or dramatic.
Neutral, slightly desaturated film-like color grading. Bright shadows maintaining transparency. Film grain (ISO 400) for authentic analog feel.
Generous negative space for openness. Subject placed small within the frame. Natural movement captured (hair, fabric).
Old lens softness with peripheral bokeh. Spherical aberration at edges.
Mood: refreshing everyday moment, comfortable silence, hope. Heart-cleansing clarity.
Optional: tiny prismatic color refraction (pink/blue/purple) visible only on glass edges or water droplets — a hidden accent of freshness."""


# ── Prompts ──────────────────────────────────────────────────
PROMPTS = [
    # ── HERO ──
    {
        "id": "p5_01_hero",
        "filename": "p5-hero-control-tower.jpg",
        "prompt": f"""{ISOMETRIC_STYLE}

A wide horizontal isometric composition showing a "control tower" concept for AI agent management.

Center: A matte black silhouette figure (Yuki) standing at an elevated isometric command desk, looking outward. The desk has a wide curved monitor displaying a dashboard with three distinct sections (represented as three glowing panels — green, amber, red).

Around Yuki, three floating isometric zones radiate outward, each representing an AI agent:

Zone 1 (left, Blue #6C82FE accent): A stylized CRM database icon + email envelope + graph line. Connected to Yuki by a thin Blue arc. A small green checkmark floats above.

Zone 2 (center-right, Orange #F59400 accent): A magnifying glass + document stack + web globe icon. Connected by an Orange arc. An amber progress indicator (partial circle) floats above.

Zone 3 (right, Pink #FC6978 accent): A calendar grid + receipt icon + meeting room icon. Connected by a Pink arc. A red warning triangle floats above.

Thin connecting lines between the three zones show inter-agent dependencies. The overall composition creates a sense of one person calmly overseeing multiple autonomous systems. Extensive negative space. Light gray background. Aspect ratio 16:9."""
    },

    # ── SCENE 1: MORNING DASHBOARD ──
    {
        "id": "p5_02_dashboard",
        "filename": "p5-dashboard-morning.jpg",
        "prompt": f"""{ISOMETRIC_STYLE}

An isometric view of a "morning dashboard" — a unified control panel showing three AI agent status cards.

The scene: A matte black silhouette figure sitting at a desk with a large monitor. On the monitor (shown as a Blue #6C82FE glowing rectangle), three distinct card-like panels are visible:

Card 1 (left, green glow): Three small checkmark icons stacked vertically. A green circle indicator at top. Represents "completed tasks."

Card 2 (center, amber glow): A partially filled progress bar (Orange #F59400). A spinning/loading icon. Represents "running task."

Card 3 (right, red glow): A warning triangle (Pink #FC6978). An exclamation mark. Represents "error/needs attention."

Below the three cards, a thin summary bar shows aggregate counts. A coffee cup sits on the desk beside the keyboard. Morning light quality — soft, clear, translucent. Generous negative space around the scene. Aspect ratio 16:9."""
    },

    # ── SCENE 2: CONFLICT RESOLUTION ──
    {
        "id": "p5_03_conflict",
        "filename": "p5-conflict-resolution.jpg",
        "prompt": f"""{ISOMETRIC_STYLE}

An isometric illustration showing "conflict between two AI agents" — two autonomous systems requesting the same resource, with a human arbiter in the middle.

Center: A matte black silhouette figure (Yuki) standing between two opposing forces.

Left side: A Blue #6C82FE isometric block with a handshake icon and dollar sign — representing a sales meeting request. An arrow points toward a central clock/calendar icon.

Right side: An Orange #F59400 isometric block with a receipt/calculator icon — representing an admin scheduling request. An arrow also points toward the same central clock/calendar icon.

The central clock shows a collision — two arrows meeting at the same point, with a small Pink #FC6978 warning flash where they collide.

Above Yuki, three floating option cards fan out, each with a different resolution path (represented as branching arrows going in different directions).

The composition conveys: two systems want the same thing, the human decides. Clean, minimal, airy. Aspect ratio 16:9."""
    },

    # ── SCENE 3: CASCADE DELEGATION ──
    {
        "id": "p5_04_cascade",
        "filename": "p5-cascade-delegation.jpg",
        "prompt": f"""{ISOMETRIC_STYLE}

An isometric tree/flow diagram showing "cascade delegation" — one instruction splitting into multiple agent tasks.

Top: A matte black silhouette hand points downward, with a single speech bubble (Blue #6C82FE) containing a simple task icon.

The speech bubble splits into three branching paths via thin clean lines:

Branch 1 (Blue): Flows to a magnifying glass icon (Research Agent). A progress bar shows 45% filled. An amber indicator.

Branch 2 (Blue, but with a dashed waiting line): Flows to a document/presentation icon (Sales Agent). A "waiting" clock icon shows it depends on Branch 1 completing first. The line from Branch 1 to Branch 2 is shown as a dependency arrow.

Branch 3 (Orange): Flows to a calendar + room icon (Admin Agent). A green checkmark — already complete. This branch runs independently (no dependency line).

At the bottom, a single horizontal progress bar shows overall completion at 33%.

The tree structure reads top-to-bottom: one instruction → three tasks → dependencies visible. Clean, structural, like an org chart made of light. Aspect ratio 16:9."""
    },

    # ── SCENE 4: EMERGENCY ESCALATION ──
    {
        "id": "p5_05_emergency",
        "filename": "p5-emergency-escalation.jpg",
        "prompt": f"""{ISOMETRIC_STYLE}

An isometric illustration showing "emergency disruption" — an unexpected event that reshuffles all priorities.

The scene: Three isometric agent blocks are arranged in a row, each doing their work (represented by small spinning gears or progress indicators).

From the upper right, a large Pink #FC6978 lightning bolt or breaking news icon crashes into the scene — disrupting the orderly arrangement. Impact waves radiate from the point of disruption.

The middle agent block (Research, Blue #6C82FE) has detected the disruption and sends alarm arcs (thin Pink lines) to the other two agents.

One agent block (Sales, left) shows a pause icon — its work is halted. The other agent block (Admin, right) is unaffected — still showing a green checkmark.

Above the scene, a matte black silhouette figure (Yuki) looks down at three option cards fanning out — representing response choices.

Priority Weight is shown as small numbered blocks that visually rearrange: what was #1 moves to #2, and the emergency moves to #1. Orange and Pink dominate the disruption area, while the rest stays Blue and White for calm contrast. Aspect ratio 16:9."""
    },

    # ── SCENE 5: AUTONOMY MATRIX ──
    {
        "id": "p5_06_autonomy_matrix",
        "filename": "p5-autonomy-matrix.jpg",
        "prompt": f"""{ISOMETRIC_STYLE}

An isometric illustration showing an "agent autonomy matrix" — a grid/table where each AI agent has its own trust level.

The scene: Three vertical columns, each representing an AI agent, with four horizontal rows representing autonomy levels (Suggest, Confirm, Notify, Auto — from bottom to top).

Column 1 (Sales Agent, Blue #6C82FE): A highlight marker sits at the "Notify" row (3rd from bottom). High trust. A green glow.

Column 2 (Research Agent, Orange #F59400): A highlight marker sits at the "Confirm" row (2nd from bottom). Medium trust. An amber glow.

Column 3 (Admin Agent, Pink #FC6978 accent): A highlight marker sits at the "Auto" row (top). Full trust for routine tasks. A green glow.

A matte black silhouette hand reaches toward Column 2's marker, as if about to adjust it — showing that trust levels are manually configurable.

One cell in Column 2 has a small downward arrow and a warning icon — showing a recent demotion (trust was lowered after a mistake).

The grid structure is clean, with thin black outlines. Each cell that's "active" has a soft glow in its agent's color. Inactive cells are White with subtle borders. Aspect ratio 16:9."""
    },

    # ── KUUKIKAN PHOTO: MANAGER OVERVIEW ──
    {
        "id": "p5_07_photo_manager",
        "filename": "p5-photo-manager-overview.jpg",
        "prompt": f"""{PHOTO_STYLE}

A modern, bright office space in the early morning. A clean desk with a large ultra-wide monitor showing a dashboard interface (blurred, not readable — just colored panels in green, amber, and a touch of red). A cup of coffee sits to the side, catching a tiny prismatic refraction on its rim.

The person is not visible — just their hands resting on the desk near the keyboard, one hand loosely holding a mouse. The framing emphasizes the spacious, clean desk and the wide monitor as the focal point.

Natural morning light streams from a large window on the left, creating soft shadows across the desk surface. The monitor's dashboard glow is subtle — not overpowering the natural light.

Outside the window: a city skyline with soft morning haze. Everything feels calm, controlled, professional — a person who has a handle on complex systems. Generous negative space above and around. Film grain texture. Slightly desaturated, luminous."""
    },

    # ── KUUKIKAN PHOTO: MOMENT OF DECISION ──
    {
        "id": "p5_08_photo_decision",
        "filename": "p5-photo-decision-moment.jpg",
        "prompt": f"""{PHOTO_STYLE}

Close-up of hands on a desk, one finger hovering over a trackpad, about to click. The monitor in the background is blurred but shows two competing panels side by side — one with a blue tint, one with an orange tint — representing a choice between two options.

The lighting is warm morning light from the side, creating a gentle shadow from the hovering finger. The desk surface is clean, minimal — just the laptop, a notebook with a pen, and a glass of water catching a tiny prismatic refraction.

The mood is "a moment of thoughtful decision" — not stressful, but attentive. The person is calm and in control. Shallow depth of field focuses on the finger and trackpad. Background is beautifully blurred. Film grain. Aspect ratio 16:9."""
    },
]


# ── API Functions ────────────────────────────────────────────

def create_task(prompt: str) -> dict:
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    payload = {"model": MODEL, "input": {"prompt": prompt}}
    resp = requests.post(f"{BASE_URL}/createTask", headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()

def get_task(task_id: str) -> dict:
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    resp = requests.get(f"{BASE_URL}/recordInfo", params={"taskId": task_id}, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.json()

def download_image(url: str, filepath: str):
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    with open(filepath, "wb") as f:
        f.write(resp.content)

def generate_image(prompt_config: dict) -> str:
    pid = prompt_config["id"]
    filename = prompt_config["filename"]
    prompt = prompt_config["prompt"]
    filepath = os.path.join(OUTPUT_DIR, filename)

    print(f"\n{'='*60}")
    print(f"Generating: {pid}")
    print(f"Output: {filepath}")

    if os.path.exists(filepath):
        print(f"  ⏭  Already exists, skipping")
        return filepath

    result = create_task(prompt)
    if result.get("code") != 200:
        print(f"  ERROR creating task: {result}")
        return None

    task_id = result["data"]["taskId"]
    print(f"  Task ID: {task_id}")

    start = time.time()
    while time.time() - start < MAX_WAIT:
        time.sleep(POLL_INTERVAL)
        status = get_task(task_id)
        state = status.get("data", {}).get("state", "unknown")
        elapsed = int(time.time() - start)
        print(f"  [{elapsed}s] State: {state}")

        if state == "success":
            result_json = json.loads(status["data"]["resultJson"])
            urls = result_json.get("resultUrls", [])
            if urls:
                download_image(urls[0], filepath)
                print(f"  SUCCESS: {filepath}")
                return filepath
            else:
                print("  ERROR: No URLs in result")
                return None
        elif state in ("failed", "error", "fail"):
            print(f"  FAILED: {status}")
            return None

    print(f"  TIMEOUT after {MAX_WAIT}s")
    return None


# ── Main ──────────────────────────────────────────────────
if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    results = []

    print(f"🎨 P5 Control Tower — Generating {len(PROMPTS)} images")
    print(f"📁 Output: {OUTPUT_DIR}")

    for p in PROMPTS:
        path = generate_image(p)
        results.append({"id": p["id"], "filename": p["filename"], "success": path is not None, "path": path})

    # Save log
    log_path = os.path.join(OUTPUT_DIR, "generation_log.json")
    with open(log_path, "w") as f:
        json.dump(results, f, indent=2)

    print(f"\n{'='*60}")
    print(f"Done. {sum(1 for r in results if r['success'])}/{len(results)} succeeded.")
    print(f"Log: {log_path}")

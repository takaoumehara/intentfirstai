#!/usr/bin/env python3
"""
Context Grammar v3 — Image Generation via kie.ai (Nano Banana 2)

Usage:
    python generate-v3-images.py

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

# ── Style Prefix ──
STYLE = """[STYLE: WHITENED DYNAMIC ISOMETRIC ILLUSTRATION WITH AIRY TRANSPARENCY]
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

# ── Prompts ──────────────────────────────────────────────────
PROMPTS = [
    {
        "id": "v3_01_context_shifts",
        "filename": "context-shifts-day.jpg",
        "prompt": f"""{STYLE}

A wide horizontal composition showing ONE matte black silhouette person transitioning through 8 daily contexts, flowing left to right like a panoramic journey.

Scene 1 (far left): Person lying in bed, one arm reaching for a floating phone icon (Blue). Soft, dim lighting feel.
Scene 2: Person standing on a train platform, holding a rail with one hand, phone in the other. Other silhouette commuters nearby. Public space feel.
Scene 3: Person sitting at an isometric desk with a large monitor (Blue screen), both hands on keyboard. Focused, structured.
Scene 4: Person at a small cafe table, relaxed posture, coffee cup (Orange accent), phone on table.
Scene 5: Person standing on train again, slumped slightly, phone dangling — depleted energy shown through posture.
Scene 6: Person at home, kitchen counter, family silhouettes nearby (smaller figures). Multiple device icons float around.
Scene 7 (highlighted with Orange glow): Person driving a car (isometric car, Blue-White body). Phone mounted on dashboard. Orange energy radiates — this is the critical 7:20 PM moment.
Scene 8: Person on a couch, large TV screen (Blue) showing content. Shared, relaxed.

All 8 scenes connected by a thin flowing Blue line at the bottom, like a timeline river. Each scene sits on a small isometric platform. Generous negative space between scenes. The 7th scene (car) glows with Orange to stand out. Aspect ratio 16:9."""
    },
    {
        "id": "v3_02_brain_layer1",
        "filename": "brain-layer-1-identity.jpg",
        "prompt": f"""{STYLE}

A single isometric platform floating in airy space, representing the FOUNDATION layer of a 3-layer memory system. This is "Identity" — stable, permanent facts.

The platform is a wide, solid white (#FFFFFF) slab with Blue (#6C82FE) edges and clean matte black outlines. On top of it:
- A small isometric house icon (Blue and White) at center-left
- Four matte black silhouette figures of different sizes (family of 4: two adults, one teenager, one small child) standing together
- A medical cross icon (Pink #FC6978) floating nearby — representing allergy info
- A small car silhouette (Blue outline, White fill)

The platform feels SOLID, STABLE, PERMANENT. Like bedrock.
The composition is centered in the lower third of the frame, leaving the upper two-thirds empty — space for future layers to be added on top.
Generous negative space all around. The mood is quiet, foundational, permanent.

Aspect ratio 16:9."""
    },
    {
        "id": "v3_03_brain_layer2",
        "filename": "brain-layer-2-learning.jpg",
        "prompt": f"""{STYLE}

Two isometric platforms stacked vertically in airy space — representing the first two layers of a 3-layer memory system.

BOTTOM LAYER (same as before): A wide, solid white (#FFFFFF) slab with Blue (#6C82FE) edges. Family silhouettes, house icon, medical cross — the Identity layer. Stable, quiet.

MIDDLE LAYER (new, floating above): A slightly narrower white platform with Blue edges, hovering above the first with a visible gap. On it:
- Semi-transparent cards orbiting gently: a clock icon (Blue), a shopping bag (Orange #F59400), a fork and knife (Blue and White)
- Thin Blue connecting lines between cards showing learned patterns and associations
- A small calendar with a star on "Friday" (Orange accent)
- The platform geometry is slightly fragmented, allowing white space to breathe through

Thin Blue dotted lines connect the two layers vertically. The middle layer feels ALIVE with patterns — it has learned from the bottom layer over time.
The two layers together fill the lower 60% of the frame, leaving space above for a third layer.
Generous negative space. The mood is growing, learning, accumulating.

Aspect ratio 16:9."""
    },
    {
        "id": "v3_04_brain_layer3",
        "filename": "brain-layer-3-rightnow.jpg",
        "prompt": f"""{STYLE}

Three isometric platforms stacked vertically — the COMPLETE 3-layer memory system, now alive and active.

BOTTOM LAYER: Wide solid white slab with Blue edges. Family silhouettes, house icon, medical cross. Identity — stable bedrock.

MIDDLE LAYER: Slightly narrower white platform with Blue edges. Orbiting pattern cards (clock, shopping bag, fork). Learning — accumulated wisdom.

TOP LAYER (new, the oxygen): The narrowest platform, but GLOWING with Orange (#F59400) energy. Orange edges pulse with light. On it:
- A location pin icon (Orange, glowing)
- A car silhouette (matte black) with Orange motion lines
- A phone icon showing a text message bubble
- Real-time data: a clock showing 7:20 (Orange)
- Orange energy particles flow UPWARD into this layer from below, like oxygen entering

Eight small Orange particles (representing the 8 Context Tokens) stream into the top layer from the sides, energizing the entire structure. The Orange glow from the top illuminates downward through all three layers. The whole structure BREATHES — alive, active, acting.

Thin connecting lines flow between all three layers. The bottom is quiet Blue, the middle is active Blue, the top is vibrant Orange — a gradient of energy from foundation to real-time.

The complete structure fills the frame well, centered. Generous but balanced negative space. The mood is ALIVE, energized, ready to act. This is the "butler that acts."

Aspect ratio 16:9."""
    },
    {
        "id": "v3_05_happy_fieldtrip",
        "filename": "happy-fieldtrip.jpg",
        "prompt": f"""{STYLE}

A warm, optimistic scene of a morning field trip departure. Emotional, hopeful, the payoff moment.

CENTER: A small matte black silhouette boy (about 10 years old) in dynamic running pose, heading toward the right side of the frame. He carries:
- A backpack on his back (Blue #6C82FE with White accents)
- A water bottle (matte black, clearly visible) attached to the backpack side

He is running OUT of an isometric doorframe/house entrance on the left side. The doorframe is a fragmented isometric structure (White walls, Blue door frame).

Behind the door, a taller matte black silhouette parent figure watches from inside, relaxed posture — not worried.

Outside (right side): Bright, airy space with subtle Orange (#F59400) morning light rays. A small isometric school bus or path leading away. Trees or nature elements rendered as simple geometric Blue-White-Orange shapes.

The mood is JOY, FREEDOM, MISSION ACCOMPLISHED. The boy is happy, prepared, running with energy. The parent is calm — everything was handled.

Generous negative space. Morning light quality. Warm Orange and clean Blue create optimism. Aspect ratio 16:9."""
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


# ── Main ────────────────────────────────────────────────────

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    results = []

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

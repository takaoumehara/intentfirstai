#!/usr/bin/env python3
"""
Test illustration generation with new design system style.
3 test images using Nano Banana 2.
"""

import requests
import time
import os
import json

API_KEY = os.environ.get("KIE_API_KEY", "c942be1c5ac2d133761fa15bb642415f")
BASE_URL = "https://api.kie.ai/api/v1/jobs"
MODEL = "nano-banana-2"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
POLL_INTERVAL = 5
MAX_WAIT = 120

# ── Light Mode Style Prefix ──
LIGHT_STYLE = """Minimal flat vector illustration on warm white background (#fdfcfa).
Clean geometric shapes, no gradients, no drop shadows, no 3D effects.
Muted color palette: blue (#4a6a90), purple (#6a4a90), ochre (#7a5520), green (#3a6a3a).
Thin precise strokes (#1a1816, 1.5px weight). Generous whitespace.
No textures, no noise, no decorative elements. Swiss design influence.
Typography-forward, Satoshi-style geometric sans-serif labels if any text."""

DARK_STYLE = """Minimal flat vector illustration on warm black background (#08070b).
Clean geometric shapes, no gradients, no drop shadows, no 3D effects.
Muted luminous palette: blue (#7a9bc4), purple (#a080c0), ochre (#b8884e), green (#7aaa7a).
Thin precise strokes (#f0ece4, 1.5px weight). Generous negative space.
No textures, no noise, no decorative elements. Swiss design influence.
Typography-forward, geometric sans-serif labels if any text."""

PROMPTS = [
    {
        "id": "test_01_architecture_flow",
        "filename": "test-architecture-flow-light.jpg",
        "prompt": f"""{LIGHT_STYLE}

Minimal flat vector architecture diagram, 16:9 aspect ratio.
Left-to-right horizontal flow showing 4 stages of an AI design framework.

Stage 1 (leftmost): A rectangular module filled with blue (#4a6a90) at 8% opacity, blue border 1.5px. Inside: 4 small circles arranged in a 2x2 grid representing "8 Tokens". A small label below: "Input".

Stage 2: A smaller square module in light gray (#f2f0ec) with dark border. Inside: a simple gear/cog icon made of thin lines. Label: "Engine".

Stage 3: A rectangular module filled with ochre (#7a5520) at 8% opacity, ochre border 1.5px. Inside: 3 small arrows pointing in different directions (up, down, sideways). Label: "Output".

Stage 4 (rightmost): A rectangular module filled with green (#3a6a3a) at 8% opacity, green border 1.5px. Inside: 5 small document/card shapes stacked. Label: "Proof".

Thin connecting arrows (#1a1816, 1px) between each stage, with small pointed arrowheads.
No rounded corners on modules. Clean orthographic layout, no perspective.
Generous spacing between stages. Information architecture style."""
    },
    {
        "id": "test_02_brain_layers",
        "filename": "test-brain-layers-dark.jpg",
        "prompt": f"""{DARK_STYLE}

Minimal flat vector layer diagram on warm black (#08070b) background, 16:9 format.
3 horizontal layers stacked vertically, representing memory layers of an AI brain.

Top layer (Identity): filled with purple (#a080c0) at 15% opacity, purple border 1.5px. Widest layer.
Middle layer (Accumulated Learning): filled with blue (#7a9bc4) at 15% opacity, blue border 1.5px. Medium width.
Bottom layer (Right Now): filled with ochre (#b8884e) at 15% opacity, ochre border 1.5px. Narrowest layer.

Each layer is a flat rectangle, no rounded corners, separated by 12px gap.
Small monospace labels right-aligned in light gray (#8a8580): "Identity", "Learning", "Right Now".
Thin vertical arrow on left side pointing both up and down, labeled "stable ← → volatile".

Below the 3 layers, a small dashed rectangle in green (#7aaa7a) at 10% opacity represents "Disposable Brain" — a temporary layer that appears and disappears.

No 3D, no shadows, no gradients. Flat orthographic view.
Generous padding. Swiss information-design style."""
    },
    {
        "id": "test_03_autonomy_dial",
        "filename": "test-autonomy-dial-light.jpg",
        "prompt": f"""{LIGHT_STYLE}

Minimal flat vector spectrum diagram on warm white (#fdfcfa) background, 16:9 format.
Horizontal bar showing 4 stages of AI autonomy from left to right: Suggest, Confirm, Notify, Auto.

4 circle nodes evenly spaced on a thin horizontal line (#1a1816, 1px).
First node (Suggest): outline only, thin stroke. Represents "AI proposes, human decides."
Second node (Confirm): outline only. Represents "AI prepares, human approves."
Third node (Notify): filled with ochre (#7a5520) — this is the current/highlighted stage. Represents "AI acts, then reports."
Fourth node (Auto): outline only. Represents "AI acts silently."

Progressive ochre tint fills the bar segments from left up to the third node. Segments to the right are empty/light gray (#f2f0ec).

Monospace labels below each node: "Suggest", "Confirm", "Notify", "Auto".
Small label above the bar centered: "Autonomy Dial" in dark text (#1a1816).

Below the spectrum, a thin line connects to a small annotation: "trust grows over time →" with a subtle arrow pointing right.

No gradients. Discrete flat color segments. Generous whitespace.
Swiss editorial diagram style. No decorative elements."""
    },
]

# ── API Functions ──
def create_task(prompt):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    payload = {"model": MODEL, "input": {"prompt": prompt}}
    resp = requests.post(f"{BASE_URL}/createTask", headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()

def get_task(task_id):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    resp = requests.get(f"{BASE_URL}/recordInfo", params={"taskId": task_id}, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.json()

def download_image(url, filepath):
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    with open(filepath, "wb") as f:
        f.write(resp.content)

def generate_image(p):
    filepath = os.path.join(OUTPUT_DIR, p["filename"])
    print(f"\n{'='*60}")
    print(f"Generating: {p['id']}")

    if os.path.exists(filepath):
        print(f"  Already exists, skipping")
        return filepath

    result = create_task(p["prompt"])
    if result.get("code") != 200:
        print(f"  ERROR: {result}")
        return None

    task_id = result["data"]["taskId"]
    print(f"  Task: {task_id}")

    start = time.time()
    while time.time() - start < MAX_WAIT:
        time.sleep(POLL_INTERVAL)
        status = get_task(task_id)
        state = status.get("data", {}).get("state", "unknown")
        print(f"  [{int(time.time()-start)}s] {state}")
        if state == "success":
            urls = json.loads(status["data"]["resultJson"]).get("resultUrls", [])
            if urls:
                download_image(urls[0], filepath)
                print(f"  ✅ Saved: {p['filename']}")
                return filepath
        elif state in ("failed", "error"):
            print(f"  ❌ Failed")
            return None
    print("  ⏰ Timeout")
    return None

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"🎨 Testing 3 illustration styles")
    for p in PROMPTS:
        generate_image(p)
    print(f"\n✅ Done. Check {OUTPUT_DIR}")

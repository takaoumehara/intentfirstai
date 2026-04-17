#!/usr/bin/env python3
"""
P5 Control Tower — Kuukikan Photo Generation via kie.ai (Nano Banana 2)
(5 kuukikan-style atmosphere photos for the presentation deck)

Usage:
    python generate-p5-kuukikan.py

Images saved to ./images/
"""

import requests
import time
import os
import json

# ── Config ──────────────────────────────────────────────────
API_KEY = os.environ.get("KIE_API_KEY", "c942be1c5ac2d133761fa15bb642415f")
BASE_URL = "https://api.kie.ai/api/v1/jobs"
MODEL = "nano-banana-2"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
POLL_INTERVAL = 5
MAX_WAIT = 300

# ── Style Prefix ────────────────────────────────────────────
PHOTO_STYLE = """[STYLE: KUUKIKAN PHOTOGRAPHY — FRESH ATMOSPHERIC QUALITY]
Photorealistic image, 16:9 ratio (3840x2160px). Natural, fresh, airy aesthetic with transparent light quality.
Soft, diffused light — like sunlight filtering through windows. Light dissolves into space, not harsh or dramatic.
Neutral, slightly desaturated film-like color grading. Bright shadows maintaining transparency. Film grain (ISO 400) for authentic analog feel.
Generous negative space for openness. No people, or people only as tiny silhouettes/backs — the space itself is the subject.
Old lens softness with peripheral bokeh. Spherical aberration at edges.
Mood: refreshing everyday moment, comfortable silence, hope. Heart-cleansing clarity.
Optional: tiny prismatic color refraction (pink/blue/purple) visible only on glass edges or water droplets — a hidden accent of freshness."""

# ── Prompts ──────────────────────────────────────────────────
PROMPTS = [
    {
        "id": "p5_hero_control",
        "filename": "p5-hero-control-room.jpg",
        "prompt": f"""{PHOTO_STYLE}

Pre-dawn home office or professional desk setup. Two ultra-wide monitors side by side, both gently glowing with a cool blue-white light showing dashboard interfaces (status dots in green, amber, and red — small, not dominant). No people. A single coffee cup sits in the left foreground. Through the window behind: city lights scattered in a blue pre-dawn sky. The monitors are the main light source, casting a cool technical glow across the dark desk surface. Deep shadows fill the room. Heavy film grain in dark areas. Peripheral vignette. Tiny prismatic flicker on the coffee cup rim. Mood: systems running while the city sleeps, calm command, quiet power."""
    },
    {
        "id": "p5_desk_notifications",
        "filename": "p5-desk-notifications.jpg",
        "prompt": f"""{PHOTO_STYLE}

Clean professional desk with a laptop in the center and two side monitors flanking it. Each monitor has small status indicator lights glowing (green, amber, red — tiny, like LED dots). Morning light streams from a window on the left, creating soft warm shadows across the desk surface. No people. The three screens create a calm rhythm across the frame. Generous negative space above and around the screens. A glass water bottle on the desk edge catches a tiny prismatic refraction. Film grain visible on desk surface and window light. Mood: organized command, three systems being quietly observed, morning readiness."""
    },
    {
        "id": "p5_coffee_break",
        "filename": "p5-break-coffee.jpg",
        "prompt": f"""{PHOTO_STYLE}

Close-up of a white ceramic coffee mug on a desk, steam rising and dissolving into morning light. In the background, two blurred monitor glows create soft colorful bokeh circles (cool blue tones). The desk surface is clean wood — only the cup and its shadow. Morning light from a side window. No people. Extremely shallow depth of field — cup sharp, everything behind beautifully soft. Film grain on white ceramic surface. Tiny prismatic refraction on the mug rim — pink/blue/green. Mood: a quiet human pause between system checks, small comfort, the person behind the dashboard."""
    },
    {
        "id": "p5_meeting_room",
        "filename": "p5-break-meeting.jpg",
        "prompt": f"""{PHOTO_STYLE}

Empty modern meeting room. A whiteboard covers the back wall, showing faint erased marker traces — barely visible arrows and rectangular shapes, almost ghosts. A long conference table with chairs neatly arranged. Afternoon light from a side window creates warm raking shadows across the whiteboard surface. No people. The room feels like a decision was recently made here. Film grain enhances the whiteboard texture. Slight vignette. The upper half is dominated by the whiteboard and its faint traces. Mood: after the decision, residue of thinking, empty stage between acts."""
    },
    {
        "id": "p5_plants_afternoon",
        "filename": "p5-break-afternoon.jpg",
        "prompt": f"""{PHOTO_STYLE}

Indoor plants on an office windowsill, late afternoon golden hour light. Green leaves backlit by warm amber light — leaf edges glow with a golden rim. A white ceramic plant pot with a geometric window-frame shadow falling across its surface. Through the window: soft blurred city buildings in blue-gray. No people. The plants occupy the left two-thirds of the frame, city and sky breathe on the right. Shallow depth of field — nearest leaves sharp, city beautifully blurred. Tiny prismatic refraction on window glass near a leaf edge. Film grain on plant leaf texture. Mood: life and systems in balance, the natural world adjacent to the work world, refreshing clarity."""
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

    print(f"📷 P5 Control Tower — Generating {len(PROMPTS)} kuukikan photos")
    print(f"📁 Output: {OUTPUT_DIR}")

    for p in PROMPTS:
        path = generate_image(p)
        results.append({"id": p["id"], "filename": p["filename"], "success": path is not None, "path": path})

    # Save log
    log_path = os.path.join(OUTPUT_DIR, "kuukikan_generation_log.json")
    with open(log_path, "w") as f:
        json.dump(results, f, indent=2)

    print(f"\n{'='*60}")
    print(f"Done. {sum(1 for r in results if r['success'])}/{len(results)} succeeded.")
    print(f"Log: {log_path}")

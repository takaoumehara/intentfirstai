#!/usr/bin/env python3
"""
P4 The Sales Floor — Kuukikan Photo Generation via kie.ai (Nano Banana 2)

Usage:
    python generate-p4-images.py

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
        "id": "p4_01_hero",
        "filename": "p4-hero-office-morning.jpg",
        "prompt": f"""{PHOTO_STYLE}

Empty modern open-plan office at pre-dawn. Floor-to-ceiling glass windows spanning the entire far wall, city skyline outside still tinged with pre-dawn blue-purple. No people. Clean white desks with sleeping monitors arranged in rows. Soft cool diffused dawn light streams through glass, gently stretching across desk surfaces. Tiny prismatic refraction on a window frame edge — barely visible pink/blue. Film grain visible in shadows and sky. The upper 60% of the frame is dominated by the expansive glass wall and city beyond. Lower portion: desks and monitors, small and ordered. Mood: the quiet before the day begins, professional serenity, hope in the empty space."""
    },
    {
        "id": "p4_02_hallway",
        "filename": "p4-break-hallway.jpg",
        "prompt": f"""{PHOTO_STYLE}

Empty modern office corridor with glass partition walls on one side, revealing blurred meeting room shapes beyond. One-point perspective down the hallway. A single white coffee cup sits on a counter at the far end. Morning light mixes softly with overhead fluorescent glow. Floor tiles create a geometric shadow pattern. No people. The corridor recedes into soft bokeh. Tiny prismatic glint on the glass partition edge near the coffee cup. Film grain on smooth wall surfaces. Mood: calm before a meeting, quiet anticipation, a pause in a busy professional day."""
    },
    {
        "id": "p4_03_afternoon",
        "filename": "p4-break-afternoon.jpg",
        "prompt": f"""{PHOTO_STYLE}

Close-up of a laptop on a clean desk, warm afternoon light raking from a window on the right. A single finger rests near the trackpad — mid-thought. A coffee cup with a faint ring mark partially visible in the upper right corner. The desk surface is mostly empty negative space. Afternoon light creates long soft shadows across the keyboard. No face visible — only hands. Shallow depth of field, desk background soft. Beautiful peripheral bokeh. Faint prismatic refraction on coffee cup rim. Film grain enhances the warm desk texture. Mood: deep focus, quiet intensity of a single important task, warm and present."""
    },
    {
        "id": "p4_04_emergency",
        "filename": "p4-meeting-emergency.jpg",
        "prompt": f"""{PHOTO_STYLE}

Empty modern meeting room. A single smartphone lies face-up on a long wooden conference table, screen faintly lit with a soft blue-white glow (incoming call or notification). Chairs are pulled back slightly as if someone just stepped away. Large window with overcast diffused light. The phone is small relative to the vast table surface — lots of negative space. Soft focus — table edge sharp, phone in medium focus. Faint prismatic hint on window glass behind. Film grain on wall surfaces. Mood: suspended moment, something important is about to happen, quiet urgency without drama."""
    },
    {
        "id": "p4_05_sunset",
        "filename": "p4-break-sunset.jpg",
        "prompt": f"""{PHOTO_STYLE}

Office window at golden hour sunset. City skyline silhouetted in warm amber-orange light. The window fills most of the frame — city and sunset sky dominate the upper two-thirds. Interior foreground (window sill with a coffee ring mark on glass shelf) in lower third. No people. Warm sunset light wraps softly into the room. A tiny prismatic refraction on the window glass surface — pink and blue. The interior is neutral and cool against the warm exterior. Film grain prominent against the warm sky tones. Mood: satisfying end of a workday, quiet accomplishment, a day worth having."""
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

    print(f"📷 P4 Sales Floor — Generating {len(PROMPTS)} kuukikan photos")
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

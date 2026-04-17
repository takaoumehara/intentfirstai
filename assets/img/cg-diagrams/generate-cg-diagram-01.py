#!/usr/bin/env python3
"""CG Diagram 1: Architecture Flow — via kie.ai Nano Banana 2"""

import requests, time, os, json

API_KEY = os.environ.get("KIE_API_KEY", "c942be1c5ac2d133761fa15bb642415f")
BASE_URL = "https://api.kie.ai/api/v1/jobs"
MODEL = "nano-banana-2"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

PROMPT = """Simplified isometric 3D perspective. Clean geometric prisms, cubes, and platforms. Objects sit on isometric planes at consistent 30° angles. Human figures as matte black silhouettes in isometric perspective. Uniform-weight matte black outlines (#111111), 1.5-2px weight. Perfectly clean, no sketchy feel. Soft-cell shading on 3D faces only — left/top faces lighter, right/bottom darker. No gradients. No drop shadows. Element White (#FFFFFF) prominently on top faces. Generous spacing. Background is flat Light Gray (#EEEEEE). Color palette: Orange (#F59400), Blue (#6C82FE), Pink (#FC6978), White (#FFFFFF), Black (#111111).

16:9 aspect ratio.

A horizontal architecture flow diagram showing 4 connected modules, representing a complete AI design framework pipeline.

LEFT MODULE: An isometric rectangular prism with Blue (#6C82FE) colored faces. Around it, 4 small flat iconic symbols float: a speech bubble shape, an 8-pointed star, a simplified brain outline, and two small circular dial shapes. These represent Intent, Tokens, Brain, and Dials. This module represents "Input" — how AI understands people.

CENTER-LEFT: A smaller isometric cube in white with black outlines. Inside its visible face, a simple gear/cog icon drawn with thin black lines. This represents the "Engine" — where rules are generated.

CENTER-RIGHT MODULE: An isometric rectangular prism with Orange (#F59400) colored faces. Around it, 3 small flat icons: three arrows pointing in different directions, a small grid of squares, and a curved arc line. These represent 3 Directions, Patterns, and Temporal Arc. This module represents "Output" — how AI responds.

RIGHT MODULE: An isometric rectangular prism with very light Pink (#FC6978) tinted faces. On top of it, 5 small flat card/document shapes are stacked slightly offset, each a slightly different shade of gray. These represent 5 Projects — the proof.

CONNECTIONS: Thin black arrows (1px, with small pointed arrowheads) connect each module to the next in a left-to-right flow. The arrows are straight horizontal lines at the isometric baseline level.

FAR LEFT: A single matte black silhouette figure stands facing the first Blue module, representing the user who initiates the flow.

COMPOSITION: All 4 modules are aligned horizontally with generous spacing between them — the gap between modules should be at least as wide as the modules themselves. The figure stands at human scale relative to the modules. Everything sits on the same invisible isometric ground plane.

No text labels in the illustration. No decorative elements. Every element serves the concept of a 4-stage pipeline. Maximum airiness and whitespace."""

def create_task(prompt):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    resp = requests.post(f"{BASE_URL}/createTask", headers=headers, json={"model": MODEL, "input": {"prompt": prompt}}, timeout=30)
    resp.raise_for_status()
    return resp.json()

def get_task(task_id):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    resp = requests.get(f"{BASE_URL}/recordInfo", params={"taskId": task_id}, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.json()

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, "cg-01-architecture-flow.jpg")

    print("Generating: CG Diagram 1 — Architecture Flow")
    result = create_task(PROMPT)
    if result.get("code") != 200:
        print(f"ERROR: {result}")
        exit(1)

    task_id = result["data"]["taskId"]
    print(f"Task: {task_id}")

    start = time.time()
    while time.time() - start < 120:
        time.sleep(5)
        status = get_task(task_id)
        state = status.get("data", {}).get("state", "unknown")
        print(f"  [{int(time.time()-start)}s] {state}")
        if state == "success":
            urls = json.loads(status["data"]["resultJson"]).get("resultUrls", [])
            if urls:
                resp = requests.get(urls[0], timeout=60)
                with open(filepath, "wb") as f:
                    f.write(resp.content)
                print(f"✅ Saved: {filepath}")
                exit(0)
        elif state in ("failed", "error"):
            print("❌ Failed")
            exit(1)
    print("⏰ Timeout")

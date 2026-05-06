#!/usr/bin/env bash
# P3 character-consistency image regeneration runner.
# Run from the intentfirst/ directory:
#   bash projects/project-03/_run_regen.sh
#
# Generates 4 photos using the locked Cast Sheet
# (projects/project-03/_CAST_SHEET.md) into images/regen/.
# Originals are NOT overwritten.

set -e
cd "$(dirname "$0")/../.."   # → intentfirst/

OUT=projects/project-03/images/regen
mkdir -p "$OUT"

echo "===== A. Hero · Naomi on the morning train (16:9) ====="
python ../scripts/generate_kie.py \
  _Gem_instruction_for_Image/P3-A-naomi-train-hero.json \
  "$OUT/p3-cast-naomi-train.png" 16:9

echo "===== B. Cast group · Campbell-Adeyemi family (16:9) ====="
python ../scripts/generate_kie.py \
  _Gem_instruction_for_Image/P3-B-cast-family-livingroom.json \
  "$OUT/p3-cast-campbell-adeyemi.png" 16:9

echo "===== C. Platform-hero · Naomi voice note (16:9) ====="
python ../scripts/generate_kie.py \
  _Gem_instruction_for_Image/P3-C-naomi-platform-voice.json \
  "$OUT/IP-03_platform-morning.png" 16:9

echo "===== D. Social · Marcus points at TV (16:9) ====="
python ../scripts/generate_kie.py \
  _Gem_instruction_for_Image/P3-D-marcus-points-tv.json \
  "$OUT/IP-07_marcus-points-tv.png" 16:9

echo
echo "DONE. Files in $OUT/"
ls -la "$OUT"

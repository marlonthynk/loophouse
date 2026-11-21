#!/usr/bin/env bash
set -euo pipefail
if (( $# > 1 )); then
  echo "Usage: bash scripts/cloud-setup.sh [--browser-only]" >&2
  exit 2
fi
case "${1:-}" in
  '') install_args=(--with-deps chromium) ;;
  --browser-only) install_args=(chromium) ;;
  *)
    echo "Usage: bash scripts/cloud-setup.sh [--browser-only]" >&2
    exit 2
    ;;
esac
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
npm ci
npx playwright install "${install_args[@]}"
npm run browser:check

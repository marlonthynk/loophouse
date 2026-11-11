#!/usr/bin/env bash
set -euo pipefail
cd /workspace/loophouse
npm ci
npx playwright install --with-deps chromium
npm run browser:check

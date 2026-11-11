import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const git = (args) => spawnSync('git', args, { encoding: 'utf8' }).stdout?.trim() || '';
const receipt = {
  startedAt: new Date().toISOString(),
  head: git(['rev-parse', 'HEAD']),
  workingTree: git(['status', '--short']),
  status: 'failed',
  checks: [],
  browserReport: 'artifacts/playwright/report/index.html',
};

const checks = ['format:check', 'test:typecheck', 'test', 'build', 'browser:check', 'test:e2e'];
for (const script of checks) {
  const started = Date.now();
  const result = spawnSync('npm', ['run', script], { stdio: 'inherit' });
  const passed = result.status === 0;
  receipt.checks.push({
    command: `npm run ${script}`,
    passed,
    exitCode: result.status,
    signal: result.signal,
    durationMs: Date.now() - started,
  });
  if (!passed) {
    receipt.status = script === 'browser:check' ? 'test_pending' : 'failed';
    break;
  }
  receipt.status = script === 'test:e2e' ? 'passed' : 'failed';
}

receipt.finishedAt = new Date().toISOString();
mkdirSync('artifacts', { recursive: true });
writeFileSync('artifacts/verification.json', JSON.stringify(receipt, null, 2) + '\n');
console.log(`Verification outcome: ${receipt.status}. Receipt: artifacts/verification.json`);
process.exitCode = receipt.status === 'passed' ? 0 : 1;

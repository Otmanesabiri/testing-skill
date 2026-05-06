#!/usr/bin/env node
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function showUsage() {
  console.log('Usage: skills add <owner/repo>');
}

if (args[0] === 'add' && args[1]) {
  let repo = args[1];
  // Replace mattpocock with otmanesabiri if user types mattpocock
  repo = repo.replace('mattpocock', 'otmanesabiri');
  const repoUrl = repo.includes('://') ? repo : `https://github.com/${repo}.git`;
  const sanitized = repo.replace(/[^a-zA-Z0-9._-]/g, '-');
  const targetDir = path.join(process.cwd(), 'skills', sanitized);

  console.log(`Cloning ${repoUrl} into ${targetDir}`);
  const res = spawnSync('git', ['clone', repoUrl, targetDir], { stdio: 'inherit' });
  if (res.status !== 0) process.exit(res.status);

  // Always look for setup-otmanesabiri-skills.js/sh
  const setupJs = path.join(targetDir, 'setup-otmanesabiri-skills.js');
  const setupSh = path.join(targetDir, 'setup-otmanesabiri-skills.sh');

  if (fs.existsSync(setupJs)) {
    console.log('Running setup-otmanesabiri-skills.js');
    const run = spawnSync(process.execPath, [setupJs], { stdio: 'inherit' });
    process.exit(run.status);
  } else if (fs.existsSync(setupSh)) {
    console.log('Running setup-otmanesabiri-skills.sh');
    const run = spawnSync('sh', [setupSh], { stdio: 'inherit' });
    process.exit(run.status);
  } else {
    console.log('No setup script found. Installation complete.');
  }
} else {
  showUsage();
  process.exit(1);
}

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const skillsDir = path.join(rootDir, 'skills');

function walkMarkdownFiles(dirPath, relativePrefix = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const absolutePath = path.join(dirPath, entry.name);
    const relativePath = path.join(relativePrefix, entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(absolutePath, relativePath));
      continue;
    }

    if (!entry.name.endsWith('.md')) continue;
    if (relativePath === 'SKILL.md') continue;

    files.push({ absolutePath, relativePath });
  }

  return files;
}

function hasFrontmatter(content) {
  return /^---\s*\n[\s\S]*?\n---\s*\n?/.test(content);
}

function main() {
  const files = walkMarkdownFiles(skillsDir);
  const missing = [];

  for (const file of files) {
    const content = fs.readFileSync(file.absolutePath, 'utf8');
    if (!hasFrontmatter(content)) {
      missing.push(file.relativePath);
    }
  }

  if (missing.length > 0) {
    console.error('Missing frontmatter:');
    missing.forEach(file => console.error(`- ${file}`));
    process.exit(1);
  }

  console.log('FRONTMATTER_OK');
}

main();
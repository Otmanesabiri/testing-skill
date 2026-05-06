#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const skillsDir = path.join(rootDir, 'skills');
const outputPath = path.join(skillsDir, '.index.json');

const directoryOrder = ['rules', 'playbooks', 'contracts', 'diagnostics', 'knowledge'];
const folderCategoryMap = {
  rules: 'rules',
  playbooks: 'playbook',
  contracts: 'contract',
  diagnostics: 'diagnostics',
  knowledge: 'knowledge'
};

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
    if (relativePath === 'SKILL.md' || relativePath === '.index.json' || relativePath === '.instructions.md') continue;

    files.push({ absolutePath, relativePath });
  }

  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return {};

  const lines = match[1].split(/\r?\n/);
  const data = {};
  let currentKey = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, '  ');
    if (!line.trim()) continue;

    const listMatch = line.match(/^\s*-\s*(.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(listMatch[1].trim());
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValueMatch) continue;

    const key = keyValueMatch[1];
    const value = keyValueMatch[2].trim();
    currentKey = key;

    if (!value) {
      data[key] = [];
      continue;
    }

    if (value === 'true') {
      data[key] = true;
      continue;
    }

    if (value === 'false') {
      data[key] = false;
      continue;
    }

    if (/^-?\d+(\.\d+)?$/.test(value)) {
      data[key] = Number(value);
      continue;
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      data[key] = inner ? inner.split(',').map(item => item.trim()).filter(Boolean) : [];
      continue;
    }

    data[key] = value.replace(/^['"]|['"]$/g, '');
  }

  return data;
}

function toId(relativePath) {
  return relativePath.replace(/\.md$/i, '').replace(/\\/g, '/');
}

function inferCategory(relativePath, frontmatter) {
  if (frontmatter.category) return frontmatter.category;

  const topLevelFolder = relativePath.split('/')[0];
  return folderCategoryMap[topLevelFolder] || 'knowledge';
}

function inferLoadTier(category, relativePath) {
  // Prioritize files according to testing-skill folder structure
  if (relativePath.startsWith('01-foundations/')) return 1;
  if (relativePath.startsWith('02-core-concepts/')) return 2;
  if (relativePath.startsWith('03-implementation-vue/')) return 3;
  if (relativePath.startsWith('04-resources/')) return 4;

  if (relativePath.startsWith('rules/') || relativePath.startsWith('playbooks/')) return 1;
  if (relativePath.startsWith('knowledge/')) return 3;
  if (category === 'diagnostics') return 2;
  return 2;
}

function summarizeKeywords(relativePath, frontmatter, content) {
  if (Array.isArray(frontmatter.keywords) && frontmatter.keywords.length > 0) {
    return frontmatter.keywords;
  }

  const lower = content.toLowerCase();
  const candidates = [
    'vitest', 'vue', 'msw', 'pinia', 'tdd', 'unit test', 'integration test', 'e2e', 'testing',
    'mock', 'stub', 'spy', 'fake', 'checklist', 'coverage', 'flaky', 'antipatterns'
  ];

  return candidates.filter(keyword => lower.includes(keyword));
}

function buildRelatedFiles(frontmatter) {
  if (Array.isArray(frontmatter.crossReferences)) return frontmatter.crossReferences;
  if (Array.isArray(frontmatter.relatedFiles)) return frontmatter.relatedFiles;
  return [];
}

function buildCollection(files) {
  const groups = {
    skills: [],
    playbooks: [],
    rules: [],
    contracts: [],
    diagnostics: [],
    knowledge: []
  };

  for (const file of files) {
    const content = fs.readFileSync(file.absolutePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    const category = inferCategory(file.relativePath, frontmatter);
    const entry = {
      id: frontmatter.id || toId(file.relativePath),
      file: file.relativePath,
      category,
      title: frontmatter.title || path.basename(file.relativePath, '.md').replace(/-/g, ' '),
      keywords: summarizeKeywords(file.relativePath, frontmatter, content),
      relatedFiles: buildRelatedFiles(frontmatter),
      loadTier: frontmatter.loadTier || inferLoadTier(category, file.relativePath)
    };

    if (category === 'playbook' || file.relativePath.startsWith('playbooks/')) {
      groups.playbooks.push(entry);
    } else if (category === 'rules' || file.relativePath.startsWith('rules/')) {
      groups.rules.push(entry);
    } else if (category === 'contract' || file.relativePath.startsWith('contracts/')) {
      groups.contracts.push(entry);
    } else if (category === 'diagnostics' || file.relativePath.startsWith('diagnostics/')) {
      groups.diagnostics.push(entry);
    } else if (category === 'knowledge' || file.relativePath.startsWith('knowledge/')) {
      groups.knowledge.push(entry);
    } else {
      groups.skills.push(entry);
    }
  }

  const sortByPriority = (left, right) => {
    const leftTier = left.loadTier || 2;
    const rightTier = right.loadTier || 2;

    if (leftTier !== rightTier) return leftTier - rightTier;
    return left.file.localeCompare(right.file);
  };

  for (const key of Object.keys(groups)) {
    groups[key].sort(sortByPriority);
  }

  return groups;
}

function buildCoreRouting(collection) {
  // Core routing tailored for the testing-skill
  return {
    what_to_test: [
      '01-foundations/philosophy.md'
    ],
    how_to_structure: [
      '01-foundations/tdd-lifecycle.md',
      '02-core-concepts/anatomy.md'
    ],
    mocking_and_doubles: [
      '02-core-concepts/test-doubles.md'
    ],
    vue_implementation: [
      '03-implementation-vue/vitest-config.md',
      '03-implementation-vue/components.md',
      '03-implementation-vue/integration-msw.md'
    ],
    checklists: [
      '04-resources/checklists.md'
    ],
    antipatterns: [
      '02-core-concepts/antipatterns.md'
    ]
  };
}

function main() {
  const files = walkMarkdownFiles(skillsDir);

  const collection = buildCollection(files);
  const coreRouting = buildCoreRouting(collection);

  const output = {
    version: 2,
    generatedAt: new Date().toISOString().slice(0, 10),
    maxFilesPerTask: 3,
    routingPrinciples: [
      'Start with `01-foundations/philosophy.md` for strategy',
      'Load at most 3 files per task',
      'Prefer co-location: tests next to source when possible',
      'Use cached facts from session memory before rereading source files'
    ],
    coreRouting,
    ...collection
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${outputPath}`);
}

main();
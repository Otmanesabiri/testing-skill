#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'tracker',
      message: 'Which issue tracker do you want to use?',
      choices: ['GitHub', 'Linear', 'Local files']
    },
    {
      type: 'input',
      name: 'labels',
      message: 'Which labels do you apply when triaging ticks? (comma-separated)',
      default: 'bug,enhancement,help wanted'
    },
    {
      type: 'input',
      name: 'docsPath',
      message: 'Where do you want to save any docs we create?',
      default: 'docs/skills'
    }
  ]);

  const config = {
    issueTracker: answers.tracker,
    labels: answers.labels.split(',').map(s => s.trim()).filter(Boolean),
    docsPath: answers.docsPath
  };

  fs.writeFileSync('skills-config.json', JSON.stringify(config, null, 2));
  console.log('Saved configuration to skills-config.json');
  console.log('Bam — you\'re ready to go.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-env node */

const {spawnSync} = require('child_process');

const branchesToKeep = [
  /^master$/,
  /^develop$/,
  /^release-\d+$/
];

main();

function main() {
  const branchesToRemove = run('git', ['branch'])
    .split('\n')
    .map(s => s.startsWith('*') ? s.substring(1) : s)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .filter(branch => {
      for (let regex of branchesToKeep) {
        if (regex.test(branch)) {
          return false;
        }
      }
      return true;
    });

  branchesToRemove.forEach(branch => {
    console.log('Removing branch: %s', branch);
    run('git', ['branch', '-D', branch]);
  });

  console.log('Running git garbage collection');
  run('git', ['gc']);

  console.log('Done!');
}

function run(command, args) {
  const {status, stdout, stderr} = spawnSync(command, args, {timeout: 1000 * 60, encoding: 'utf8'});
  if (status !== 0) {
    console.error(`Failed to run command '${command}' with args '${args.join(' ')}'. Reason:`, {stdout, stderr, status});
    process.exit(1);
  }
  return stdout;
}

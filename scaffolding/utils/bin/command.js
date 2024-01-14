// const { exec } = require('child_process');
const { exec } = require('shelljs');
const chalk = require('chalk');
const fs = require('fs');

async function command(cmd1, { json = false, silent = false } = {}) {
  const stdout = await exec(cmd1, { silent });
  if (json) {
    return JSON.parse(stdout);
  } else {
    return stdout;
  }
}

async function getBranchName() {
  const stdout = await command('git branch | grep "*"', { silent: true });
  return stdout.replace('*', '').trim();
}

// 检查当前分支是否干净
async function checkWorkSpaceClean() {
  const stdout = await command('git status');
  if (/nothing to commit, working tree clean/.test(stdout) || /无文件要提交，干净的工作区/.test(stdout)) {
    return true;
  } else {
    console.log(chalk.red('当前目录有未提交的文件'));
    return false;
  }
}

function modifyPackageJson(name, value) {
  const packageJson = require('../package.json');
  packageJson[name] = value;
  fs.writeFileSync('../package.json', JSON.stringify(packageJson, null, 2));
}

function modifyDeployVersion() {
  const packageJson = require('../package.json');
  modifyPackageJson('version', `${packageJson.version}-${(new Date()).getTime()}`);
}

function logs(args) {
  console.log(chalk.yellow(args));
}

module.exports = {
  logs,
  command,
  getBranchName,
  checkWorkSpaceClean,
  modifyPackageJson,
  modifyDeployVersion,
};

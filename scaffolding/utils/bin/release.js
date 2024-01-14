const chalk = require('chalk');
const program = require('commander');
const { command, getBranchName, checkWorkSpaceClean, logs } = require('./command');

program
  .option('-ma, --major', 'major 版本发布')  // npm run release -- --major
  .option('-mr, --minor', 'minor 版本升级')  // npm run release -- --minor
  .option('-p, --patch', 'patch 版本发布')   // npm run release -- --patch
  .parse(process.argv);

const { major, minor, patch } = program.opts();
const publishType = major ? 'major' : (minor ? 'minor' : 'patch');

checkWorkSpaceClean()
  .then(async (isClean) => {
    if (!isClean) {
      console.log(chalk.red('当前目录有未提交的文件'));
      return false;
    }
    const name = await getBranchName();
    if (name !== 'master') {
      console.log(chalk.red('npm run release 命令只能在 master 分支执行'));
      return false
    }
    logs('git pull master 分支代码');
    await command('git pull');
    // await command('git pull --tags');
    logs('npm ci 安装依赖');
    await command('npm ci;');
    logs('编译中');
    await command('npm run build;');
    logs('升级版本号');
    const version = await command(`npm version ${publishType};`);
    await command('git push');
    await command('git push --tags');
    await command('FLAG=true npm publish');
    console.log(chalk.yellow(`${version} 版本发布完成`));
    return true;
  })
  .catch((stdout) => {
    console.log(chalk.red('未知异常，请查看控制台'));
    console.log(chalk.red(stdout));
  });

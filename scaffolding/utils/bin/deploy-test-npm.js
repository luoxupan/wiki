const path = require('path');
const chalk = require('chalk');
const request = require('superagent');
const { command, modifyDeployVersion } = require('./command');

async function uploadNpmPackage() {
  const reqUrl = 'http://upload.com/resource/anything/utils.tar.gz';
  const fileUrl = path.join(__dirname, '..') + '/utils.tar.gz';

  let { body } = await request.post(reqUrl).attach('filecontent', fileUrl);
  const { status_code, errmsg, download_url } = body;

  if (status_code === 200) {
    return download_url;
  } else {
    console.log(chalk.red(errmsg));
    throw errmsg;
  }
}

async function build() {
  modifyDeployVersion();

  console.log(chalk.yellow('编译中…'));
  await command('npm run build;');
  console.log(chalk.yellow('tar 打包中…'));

  await command('tar -zcvf utils.tar.gz ./packages ./dist ./package.json');
  console.log(chalk.yellow('部署中…'));
  const download_url = await uploadNpmPackage();

  const packageUrl = `${download_url}?v=${(new Date()).getTime()}`;
  console.log(chalk.yellow(`\n
    测试版发布成功！\n
    请在使用的地方执行以下命令：\n
    npm install ${packageUrl}
  `));
}

build().catch(function(stdout) {
  console.log(chalk.red('有异常，请查看控制台'));
  console.log(chalk.yellow(stdout));
});

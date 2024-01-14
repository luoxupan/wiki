const chalk = require('chalk');

if (process.env.FLAG !== 'true') {
  throw chalk.redBright('运行`npm run release`来发布你的npm包');
} else {
  console.log(chalk.yellow('happy'));
}

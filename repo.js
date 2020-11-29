const download = require('download-git-repo');
const chalk = require('chalk');  
const ora = require('ora');
const pa = process.argv;

// 创建项目
function createProject(frame) {
  const tempDir = frame === 'vue' ? '' : 'github:pzl1026/react-temp-pro';
  const spinner = ora(chalk.yellow('正在创建项目...')).start();

  // 这里是将git模板下载到当前目录，并重新命名
  download('github:pzl1026/tiny-demo#template', pa[pa.length - 1], function (err) {
      if (err) {
          throw err;
          return;
      }
      spinner.text = chalk.blue('项目创建成功');
      spinner.succeed();
      spinner.stop();
      spinner.clear();
      process.exit();
  });
}

createProject();

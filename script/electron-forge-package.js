const fs = require('fs');

const angularJSON = require('../angular.json');
const packageJson = require('../package');

const getPackagePath = () => {
  const project = angularJSON.defaultProject;
  return angularJSON.projects[project].architect.build.options.outputPath;
};

const cwd = process.cwd();

packageJson.main = `${cwd}/src/start.ts`;
fs.writeFileSync(`${cwd}/${getPackagePath()}/package.json`, JSON.stringify(packageJson));

// process.argv = ['D:\\Develop\\nodejs\\node.exe',
//   'F:\\Workspace\\project\\electron\\electron-angular6\\node_modules\\electron-forge\\dist\\electron-forge-package.js',
//   './dist/electron-angular6',
//   '--platform',
//   'win32'];

process.argv.splice(2, 0, getPackagePath());

console.log('process.argv =========== ', process.argv);

require('electron-forge/dist/forge-package');

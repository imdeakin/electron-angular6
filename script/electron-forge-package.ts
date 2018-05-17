const _package = require('electron-forge/dist/api/package');
const _package2 = _interopRequireDefault(_package);
const angularJSON = require('../angular.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

const getPackagePath = () => {
  const project = angularJSON.defaultProject;
  return angularJSON.projects[project].architect.build.options.outputPath;
};

const dir = `${cwd}/${getPackagePath()}`;
const config = {
  dir: dir,
  outDir: `${dir}/out-app`
};
console.log(config);
console.log(package);
package(config);

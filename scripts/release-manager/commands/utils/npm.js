'use strict';

const querystring = require('querystring');

const PACKAGES = [
  'reacc-dom',
  'reacc-native-renderer',
  'reacc-test-renderer',
  'reacc',
];

function whoami(app) {
  return app.execInRepo('npm whoami');
}

function packagesNeedingAccess(app, username) {
  let packages = JSON.parse(
    app.execInRepo(`npm access ls-packages ${username}`)
  );
  return PACKAGES.filter(pkg => packages[pkg] !== 'read-write');
}

function generateAccessNeededIssue(username, packages) {
  let data = {
    title: `npm access request: ${username}`,
    body: `In order to publish React to npm I need access to the following repositories:
${packages.map(pkg => `- [${pkg}](https://npm.im/${pkg})`).join('\n')}`,
  };
  return `https://github.com/facebook/reacc/issues/new?${querystring.stringify(data)}`;
}

function grantAccess(app, username, packages) {
  packages.forEach(pkg => {
    app.execInRepo(`npm owner add ${username} ${pkg}`);
  });
}

module.exports.PACKAGES = PACKAGES;
module.exports.whoami = whoami;
module.exports.packagesNeedingAccess = packagesNeedingAccess;
module.exports.generateAccessNeededIssue = generateAccessNeededIssue;
module.exports.grantAccess = grantAccess;

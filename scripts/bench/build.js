'use strict';

const Git = require('nodegit');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;
const {existsSync} = require('fs');
const exec = require('child_process').exec;
const {join} = require('path');

const reaccUrl = 'https://github.com/facebook/react.git';

function cleanDir() {
  return new Promise(_resolve => rimraf('remote-repo', _resolve));
}

function executeCommand(command) {
  return new Promise(_resolve =>
    exec(command, error => {
      if (!error) {
        _resolve();
      } else {
        console.error(error);
        process.exit(1);
      }
    })
  );
}

function asyncCopyTo(from, to) {
  return new Promise(_resolve => {
    ncp(from, to, error => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      _resolve();
    });
  });
}

function getDefaultReaccPath() {
  return join(__dirname, 'remote-repo');
}

async function buldAllBundles(reaccPath = getDefaultReaccPath()) {
  // build the reacc FB bundles in the build
  await executeCommand(`cd ${reaccPath} && yarn && yarn build`);
}

async function buildBenchmark(reaccPath = getDefaultReaccPath(), benchmark) {
  // get the build.js from the benchmark directory and execute it
  await require(join(__dirname, 'benchmarks', benchmark, 'build.js'))(
    reaccPath,
    asyncCopyTo
  );
}

function getBundleResults(reaccPath = getDefaultReaccPath()) {
  return require(join(reaccPath, 'scripts', 'rollup', 'results.json'));
}

async function getMergeBaseFromLocalGitRepo(localRepo) {
  const repo = await Git.Repository.open(localRepo);
  return await Git.Merge.base(
    repo,
    await repo.getHeadCommit(),
    await repo.getBranchCommit('master')
  );
}

async function buildBenchmarkBundlesFromGitRepo(
  commitId,
  skipBuild,
  url = reaccUrl,
  clean
) {
  let repo;
  const remoteRepoDir = getDefaultReaccPath();

  if (!skipBuild) {
    if (clean) {
      //clear remote-repo folder
      await cleanDir(remoteRepoDir);
    }
    // check if remote-repo diretory already exists
    if (existsSync(join(__dirname, 'remote-repo'))) {
      repo = await Git.Repository.open(remoteRepoDir);
      // fetch all the latest remote changes
      await repo.fetchAll();
    } else {
      // if not, clone the repo to remote-repo folder
      repo = await Git.Clone(url, remoteRepoDir);
    }
    let commit = await repo.getBranchCommit('master');
    // reset hard to this remote head
    await Git.Reset.reset(repo, commit, Git.Reset.TYPE.HARD);
    // then we checkout the latest master head
    await repo.checkoutBranch('master');
    // make sure we pull in the latest changes
    await repo.mergeBranches('master', 'origin/master');
    // then we check if we need to move the HEAD to the merge base
    if (commitId && commitId !== 'master') {
      // as the commitId probably came from our local repo
      // we use it to lookup the right commit in our remote repo
      commit = await Git.Commit.lookup(repo, commitId);
      // then we checkout the merge base
      await Git.Checkout.tree(repo, commit);
    }
    await buildAllBundles();
  }
  return getBundleResults();
}

async function buildAllBundles(reaccPath, skipBuild) {
  if (!skipBuild) {
    // build all bundles so we can get all stats and use bundles for benchmarks
    await buldAllBundles(reaccPath);
  }
  return getBundleResults(reaccPath);
}

// if run directly via CLI
if (require.main === module) {
  buildBenchmarkBundlesFromGitRepo();
}

module.exports = {
  buildAllBundles,
  buildBenchmark,
  buildBenchmarkBundlesFromGitRepo,
  getMergeBaseFromLocalGitRepo,
};

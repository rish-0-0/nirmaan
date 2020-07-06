const chalk = require("chalk");
const { projectInstall } = require("pkg-install");
const Listr = require("listr");
const execa = require("execa");
const fs = require("fs");
const ncp = require("ncp");
const path = require("path");
const rmdir = require('rimraf');
const { promisify } = require("util");
const { project_map } = require("./constants");

const access = promisify(fs.access);
const copy = promisify(ncp);

async function cloneGit(options) {
  const result = await execa(
    "git",
    ["clone", project_map[options.template], options.newName],
    {
      cwd: options.targetDirectory,
    }
  );

  if (result.failed) {
    return Promise.reject(new Error("Failed to clone"));
  }

  return;
}

function removeGit({cwd}) {
  return new Promise((resolve, reject) => {
    rmdir(cwd,  (error) => {
      if (error) {
        reject(new Error("Removing .git failed"));
      }
      resolve();
    });
  });  
}

async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const tasks = new Listr([
    {
      title: "Clone project",
      task: () => cloneGit(options),
    },
    {
      title: "Install dependencies",
      task: () =>
        projectInstall({
          cwd: path.join(options.targetDirectory, options.newName),
        }),
      skip: () => (options.noInstall ? "No install" : undefined),
    },
    {
      title: "Revoke git",
      task: () =>
        removeGit({
          cwd: path.join(options.targetDirectory, options.newName, '.git'),
        }),
    },
  ]);

  await tasks.run();
  console.log("%s Project ready", chalk.green.bold("DONE"));
  return true;
}

module.exports = createProject;

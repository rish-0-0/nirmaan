const arg = require("arg");
const inquirer = require("inquirer");
const { templates } = require('./constants');
const createProject = require('./main');

// Credits to Dominic Kundel (Github: @dkundel) for the blog to write this
// argument parsing from the command line
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--no-prompts": Boolean,
      "--no-install": Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--no-prompts"] || false, // skip prompts
    noInstall: args["--no-install"] || false,
    template: args._[0],
    newName: args._[1],
    targetDirectory: args._[2],
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "react-redux";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose a template",
      choices: templates,
      default: defaultTemplate,
    });
  }

  if (!options.newName) {
    questions.push({
      type: "input",
      name: "new_name",
      message: "Enter the name of the new project",
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    newName: options.newName || answers.new_name,
  };
}

async function cli(args) {
  const options = parseArgumentsIntoOptions(args);
  const confirmOptions = await promptForMissingOptions(options);
  await createProject(confirmOptions);
}

module.exports = cli;

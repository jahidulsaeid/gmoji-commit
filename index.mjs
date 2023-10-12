#!/usr/bin/env node
import { exec } from "child_process";
import inquirer from "inquirer";

const actions = [
  "Improve structure/format of the code",
  "Improve performance",
  "Remove code or files",
  "Fix a bug",
];

const questions = [
  {
    type: "list",
    name: "action",
    message: "",
    choices: actions,
  },
];

inquirer.prompt(questions).then((answers) => {
  switch (answers.action) {
    case "Improve structure/format of the code":
      console.log("You chose to improve the code structure/format.");

      break;
    case "Improve performance":
      console.log("You chose to improve performance.");
      break;
    case "Remove code or files":
      console.log("You chose to remove code or files.");
      break;
    case "Fix a bug":
      console.log("You chose to fix a bug.");
      provideSuggestion("Fix a bug");
      break;
    default:
      console.log("Invalid choice.");
  }
});

function provideSuggestion(action) {
  inquirer
    .prompt({
      type: "input",
      name: "suggestion",
      // message: `Suggested command for "${action}":`,
      default: "git add . && git commit -m ':bug: - Fix a bug'",
    })
    .then((answer) => {
      const suggestedCommand = answer.suggestion;

      // Execute the suggested command with child_process.exec
      exec(suggestedCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
        console.log(`Command executed successfully:\n${stdout}`);
      });
    });
}

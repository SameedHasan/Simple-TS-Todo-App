#!/usr/bin/env node
// npm i inquirer @types/inquirer -D @types/node -D
// npm i @types/inquirer -D
// npm i @types/node -D
import inquirer from "inquirer";
const todoItems = [];
// Function to display todo list
function displayTodoList() {
    console.log("Todo List:");
    todoItems.forEach((item, index) => {
        console.log(`${index + 1}. [${item.isDone ? "✔" : " "}] ${item.title}`);
    });
}
// Function to prompt user for new task
async function promptForTask() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter a new task:",
        },
    ]);
    return { ...answer, id: Math.floor(Math.random() * 10), isDone: false };
}
// Function to Mark Task as Done
async function markTaskAsCompleted() {
    const answer = await inquirer.prompt({
        type: "list",
        name: "taskIndex",
        message: "Select a task to mark as completed:",
        choices: todoItems.map((item, index) => ({
            name: `${index + 1}. ${item.title}`,
            value: index,
        })),
    });
    const index = answer.taskIndex;
    todoItems[index].isDone = true;
    console.log("Task marked as completed.");
}
async function deleteTask() {
    const answer = await inquirer.prompt({
        type: "list",
        name: "taskIndex",
        message: "Select a task to delete:",
        choices: todoItems.map((item, index) => ({
            name: `${index + 1}. ${item.title}`,
            value: index,
        })),
    });
    const index = answer.taskIndex;
    // todoItems[index].isDone = true;
    todoItems.splice(index, 1);
    console.log("Task deleted successfully.");
}
// Main function to handle user input
async function main() {
    // Interactive menu
    while (true) {
        // console.clear();
        // displayTodoList();
        const answer = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "Choose an action:",
            choices: [
                "Add New Task",
                "Show all Tasks",
                "Delete Task",
                "Mark Task as Done",
                "Quit",
            ],
        });
        if (answer.action === "Add New Task") {
            const task = await promptForTask();
            todoItems.push(task);
            console.log("Task added successfully.");
        }
        else if (answer.action === "Show all Tasks") {
            if (todoItems.length === 0) {
                console.log("No tasks available.");
            }
            else {
                displayTodoList();
            }
        }
        else if (answer.action === "Delete Task") {
            if (todoItems.length === 0) {
                console.log("No tasks available.");
            }
            else {
                await deleteTask();
            }
        }
        else if (answer.action === "Mark Task as Done") {
            if (todoItems.length === 0) {
                console.log("No tasks available.");
            }
            else {
                await markTaskAsCompleted();
            }
        }
        else if (answer.action === "Quit") {
            console.log("Exiting...");
            break;
        }
    }
}
// Start the application
main().catch(console.error);

#! /usr/bin/env node

import { Command } from "commander"
import { writeFileSync } from "fs"
import { join } from "path"
import { login } from "./lib/login.js"
import { sendSubmission } from "./lib/sendSubmission.js"
import { listSubmissions } from "./lib/listSubmissions.js"
import * as url from "url"
import { getSubmission } from "./lib/getSubmission.js"
import { getUser } from "./lib/getUser.js"
import { addFollowedUser } from "./lib/addFollowedUser.js"
import { getFollowedUsers } from "./lib/getFollowedUsers.js"
import { syncUser } from "./lib/syncUser.js"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const program = new Command()
program
.name("oii")
.description("utils for training.olinfo.it")
.version("1.0.0")

program.command("config")
.description("configures credentials for login")
.option("--username <username>")
.option("--password <password>")
.action(({ username, password }) => {
  writeFileSync(join(__dirname, "../config.json"), JSON.stringify({ username, password }), "utf-8")
})

program.command("login")
.description("authenticates user")
.action(login)

program.command("send-submission")
.description("sends submission given task and path")
.option("-t --task <task>", "task to submit")
.argument("<path>", "location of the code to submit")
.action(async (path, {task}) => console.log(
  `sent submission with id ${await sendSubmission(join(process.cwd(), path), { task })}`
))

program.command("list-submissions")
.description("lists submissions given task")
.argument("<task>", "task to analyze")
.action(async task => console.log(await listSubmissions(task)))

program.command("get-submission")
.description("displays submission details")
.argument("<submission-id>", "task id")
.action(async task => console.log(await getSubmission(task)))

program.command("get-user")
.description("displays user")
.argument("<username>", "username")
.action(async username => console.log(await getUser(username)))

program.command("add-followed-user")
.description("adds user")
.argument("<username>", "username")
.action(async username => await addFollowedUser(username))

program.command("get-followed-users")
.description("displays followed users")
.action(async () => console.log(await getFollowedUsers()))

program.command("sync-user")
.description("displays followed users")
.argument("<username>", "username")
.action(async username => console.log(await syncUser(username)))

program.parse()

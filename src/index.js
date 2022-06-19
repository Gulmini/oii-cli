#! /usr/bin/env -S node --no-warnings

import { Command } from "commander"
import { writeFileSync } from "fs"
import { join } from "path"
import { login } from "./lib/login.js"
import { sendSubmission } from "./lib/sendSubmission.js"
import * as url from "url"

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
.argument("<task>", "task to submit")
.argument("<path>", "location of the code to submit")
.action(sendSubmission)

program.parse()

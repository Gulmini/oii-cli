import fsExtra from "fs-extra"
import { join } from "path"
import * as url from 'url'
import { getUser } from "./getUser.js"

const { writeFile, ensureFile, readFileSync } = fsExtra
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const addFollowedUser = async (username) => {
  try {
    const followedUsersPath = join(__dirname, "../../data/followed.json")
    await ensureFile(followedUsersPath)
    const followedUsers = JSON.parse(readFileSync(followedUsersPath).toString() || "[]")

    try {
      await getUser(username)
    } catch (err) {
      console.log("invalid user")
    }

    if (followedUsers.includes(username)) {
      console.log("already added")
    } else {
      followedUsers.push(username)
      console.log(`added ${username}`)
    }

    await writeFile(followedUsersPath, JSON.stringify(followedUsers), "utf-8")
  } catch (err) {
    throw err
  }
}

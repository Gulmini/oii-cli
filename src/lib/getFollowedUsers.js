import fsExtra from "fs-extra"
import { join } from "path"
import * as url from "url"

const { ensureFile, readFileSync } = fsExtra
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const getFollowedUsers = async () => {
  try {
    const followedUsersPath = join(__dirname, "../../data/followed.json")
    await ensureFile(followedUsersPath)
    return JSON.parse(readFileSync(followedUsersPath).toString() || "[]")
  } catch (err) {
    throw err
  }
}

import axios from "axios"
import fsExtra from "fs-extra"
import { join } from "path"
import * as url from 'url'
import config from "../../config.json" assert { type: "json" }

const { writeFile, ensureFile, unlink, existsSync } = fsExtra
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const { username, password } = config

export const login = async () => {
  try {
    const { data, headers } = await axios.post("https://training.olinfo.it/api/user", {
      action: "login",
      keepSigned: false,
      username,
      password
    })
    if (data.error) throw new Error(data.error)
    const authCookie = headers["set-cookie"][0]
    const authCookiePath = join(__dirname, "../../tmp/auth-cookie")
    if (existsSync(authCookiePath)) {
      await unlink(authCookiePath)
    }
    await ensureFile(authCookiePath)
    await writeFile(authCookiePath, authCookie, "utf-8")
    return authCookie
  } catch (err) {
    throw err
  }
}

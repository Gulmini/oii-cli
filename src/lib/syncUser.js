import fsExtra from "fs-extra"
import { join } from "path"
import * as url from 'url'
import { getUser } from "./getUser.js"
import _ from "lodash"

const { writeFile, ensureFile, readFileSync } = fsExtra
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const syncUser = async (username) => {
  try {
    const userScoresPath = join(__dirname, `../../data/${username}.json`)
    await ensureFile(userScoresPath)
    const prevScores = JSON.parse(readFileSync(userScoresPath).toString() || "[]")

    try {
      const { scores } = await getUser(username)
      const diffItems = _.differenceWith(scores, prevScores, _.isEqual)
      const diffs = []

      diffItems.forEach(({ name, score }) => {
        const prevScore = _.find(prevScores, { name })?.score ?? 0
        diffs.push(`${username} went from ${prevScore} to ${score} on ${name}`)
      })

      await writeFile(userScoresPath, JSON.stringify(scores), "utf-8")
      return diffs
    } catch (err) {
      console.log("invalid user")
    }

  } catch (err) {
    throw err
  }
}

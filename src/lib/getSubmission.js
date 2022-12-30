import axios from "axios"
import { readFileSync } from "fs" 
import { join } from "path"
import * as url from "url"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
axios.defaults.headers = { Cookie: readFileSync(join(__dirname, "../../tmp/auth-cookie")) }

export const getSubmission = async submissionId => {
  try {
    const { data } = await axios.post("https://training.olinfo.it/api/submission", {
      action: "details",
      id: submissionId
    })
    if (data.error) throw new Error(data.error)
    const subtasks = data.score_details || []
    return subtasks.map(subtask => subtask.testcases).flat()
  } catch (err) {
    throw err
  }  
}
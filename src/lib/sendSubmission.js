import axios from "axios"
import { getTask } from "./getTask.js"
import { readFileSync } from "fs" 
import { join, basename } from "path"
import * as url from "url"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
axios.defaults.headers = { Cookie: readFileSync(join(__dirname, "../../tmp/auth-cookie")) }

export const sendSubmission = async (path, { task }) => {
  try {
    const { submission_format } = await getTask(task)
    const { data } = await axios.post("https://training.olinfo.it/api/submission", {
      action: "new",
      files: {
        [ submission_format[0] ]: {
          data: readFileSync(path, "base64"),
          filename: basename(path)
        }
      },
      task_name: task,
      language: "Python 3 / CPython"
    })
    if (data.error) throw new Error(data.error)
    return data.id
  } catch (err) {
    throw err
  }  
}
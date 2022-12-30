import axios from "axios"

export const listSubmissions = async (task) => {
  try {
    const { data } = await axios.post("https://training.olinfo.it/api/submission", {
      action: "list",
      task_name: task
    })
    if (data.error) throw new Error(data.error)
    return data.submissions
  } catch (err) {
    throw err
  }
}

import axios from "axios"

export const getTask = async (task) => {
  try {
    const { data } = await axios.post("https://training.olinfo.it/api/task", {
      action: "get",
      name: task
    })
    if (data.error) throw new Error(data.error)
    return data
  } catch (err) {
    throw err
  }
}

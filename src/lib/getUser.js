import axios from "axios"

export const getUser = async (username) => {
  try {
    const { data } = await axios.post("https://training.olinfo.it/api/user", {
      action: "get",
      username
    })
    if (data.error) throw new Error(data.error)
    return data
  } catch (err) {
    throw err
  }
}

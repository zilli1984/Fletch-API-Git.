import { baseUrl } from '../variables.js'

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}${userName}/events`)
    const data = await response.json()
    return data
}

export { getEvents }

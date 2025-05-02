import {baseUrl} from '/src/scripts/variables.js'

async function getUser(userName) {
    const response = await fetch(`${baseUrl}${userName}`)
    return await response.json()
}

export { getUser }

// pegamos os dados da API 
// transformamos em json
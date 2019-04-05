import { openDB } from 'https://unpkg.com/idb?module'

const dbPromise = openDB('moviesStore', 1, {
  upgrade(db) {
    db.createObjectStore('movies')
  }
})

export const storeDB = {
  async get(key) {
    return (await dbPromise).get('movies', key)
  },
  async getAll() {
    return (await dbPromise).getAll('movies')
  },
  async set(key, val) {
    return (await dbPromise).put('movies', val, key)
  },
  async setAll(movies) {
    this.clear()
    const tx = (await dbPromise).transaction('movies', 'readwrite')
    const store = tx.objectStore('movies')

    for await (const movie of movies) {
      store.put({ ...movie }, movie['id'])
    }
    await tx.done
  },
  async clear() {
    return (await dbPromise).clear('movies')
  }
}

export function get(serverRootUrl, apiNamespace, token) {
  const options = { method: 'GET' }

  return _createRequest(`${serverRootUrl}${apiNamespace}`, token, options)
}

/**
 *
 * @param apiPath
 * @param option
 * @param token
 * @returns {Promise<*>}
 * @private
 */
async function _createRequest(apiPath, token, option) {
  const serviceUrl = `${apiPath}&&api_key=${token}`
  try {
    const response = await window.fetch(serviceUrl, option)
    switch (response.status) {
      case 200: {
        return response.json()
      }
      default:
        throw new Error(
          `SERVER NOT AVAILABLE (${response.status}) (URL: ${serviceUrl})`
        )
    }
  } catch (err) {
    console.info(err)
  }
}

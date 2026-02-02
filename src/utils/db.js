const DB_NAME = 'memoDB'
const DB_VERSION = 1
const STORE_NAME = 'memos'

let db = null

export async function initDB() {
  if (db) return db

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)

    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = event.target.result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

export async function getAllMemos() {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const memos = request.result.sort((a, b) => b.createdAt - a.createdAt)
      resolve(memos)
    }
  })
}

export async function addMemo(content) {
  const database = await initDB()
  const memo = {
    id: Date.now(),
    content,
    createdAt: new Date().toISOString(),
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add(memo)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(memo)
  })
}

export async function updateMemo(id, content) {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const getRequest = store.get(id)

    getRequest.onerror = () => reject(getRequest.error)
    getRequest.onsuccess = () => {
      const memo = getRequest.result
      if (!memo) {
        reject(new Error('Memo not found'))
        return
      }
      memo.content = content
      const updateRequest = store.put(memo)
      updateRequest.onerror = () => reject(updateRequest.error)
      updateRequest.onsuccess = () => resolve(memo)
    }
  })
}

export async function deleteMemo(id) {
  const database = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

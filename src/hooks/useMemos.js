import { useState, useEffect } from 'react'
import { getAllMemos, addMemo, updateMemo, deleteMemo } from '../utils/db'

export function useMemos() {
  const [memos, setMemos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMemos()
  }, [])

  async function loadMemos() {
    try {
      const data = await getAllMemos()
      setMemos(data)
    } catch (error) {
      console.error('Failed to load memos:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAdd(content) {
    if (!content.trim()) return
    try {
      const newMemo = await addMemo(content)
      setMemos((prev) => [newMemo, ...prev])
    } catch (error) {
      console.error('Failed to add memo:', error)
    }
  }

  async function handleUpdate(id, content) {
    try {
      const updatedMemo = await updateMemo(id, content)
      setMemos((prev) =>
        prev.map((memo) => (memo.id === id ? updatedMemo : memo))
      )
    } catch (error) {
      console.error('Failed to update memo:', error)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMemo(id)
      setMemos((prev) => prev.filter((memo) => memo.id !== id))
    } catch (error) {
      console.error('Failed to delete memo:', error)
    }
  }

  return {
    memos,
    loading,
    addMemo: handleAdd,
    updateMemo: handleUpdate,
    deleteMemo: handleDelete,
  }
}

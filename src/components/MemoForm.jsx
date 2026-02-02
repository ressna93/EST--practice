import { useState } from 'react'

export function MemoForm({ onAdd }) {
  const [content, setContent] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!content.trim()) return
    onAdd(content)
    setContent('')
  }

  return (
    <form className="memo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="메모를 입력하세요..."
        className="memo-input"
      />
      <button type="submit" className="memo-btn add-btn">
        추가
      </button>
    </form>
  )
}

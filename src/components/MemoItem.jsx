import { useState } from 'react'

export function MemoItem({ memo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(memo.content)

  function handleSave() {
    if (!editContent.trim()) return
    onUpdate(memo.id, editContent)
    setIsEditing(false)
  }

  function handleCancel() {
    setEditContent(memo.content)
    setIsEditing(false)
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className="memo-item">
      {isEditing ? (
        <div className="memo-edit">
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="memo-input"
          />
          <div className="memo-actions">
            <button onClick={handleSave} className="memo-btn save-btn">
              저장
            </button>
            <button onClick={handleCancel} className="memo-btn cancel-btn">
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="memo-content">{memo.content}</div>
          <div className="memo-date">{formatDate(memo.createdAt)}</div>
          <div className="memo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="memo-btn edit-btn"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(memo.id)}
              className="memo-btn delete-btn"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  )
}

import { MemoItem } from './MemoItem'

export function MemoList({ memos, onUpdate, onDelete }) {
  if (memos.length === 0) {
    return <div className="memo-empty">메모가 없습니다.</div>
  }

  return (
    <div className="memo-list">
      {memos.map((memo) => (
        <MemoItem
          key={memo.id}
          memo={memo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

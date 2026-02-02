import { MemoForm } from './components/MemoForm'
import { MemoList } from './components/MemoList'
import { useMemos } from './hooks/useMemos'

function App() {
  const { memos, loading, addMemo, updateMemo, deleteMemo } = useMemos()

  return (
    <div className="app">
      <header className="app-header">
        <span role="img" aria-label="memo">📝</span>
        <h1>메모장</h1>
      </header>

      <MemoForm onAdd={addMemo} />

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : (
        <MemoList
          memos={memos}
          onUpdate={updateMemo}
          onDelete={deleteMemo}
        />
      )}
    </div>
  )
}

export default App

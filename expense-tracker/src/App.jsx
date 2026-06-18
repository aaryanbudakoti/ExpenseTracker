import { useState, useEffect } from 'react'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Charts from './components/Charts'

const initialTransactions = [
  { id: 1, title: 'June Salary', amount: 45000, type: 'income', category: 'Salary', date: '2026-06-01' },
  { id: 2, title: 'Swiggy dinner', amount: 320, type: 'expense', category: 'Food', date: '2026-06-03' },
  { id: 3, title: 'Metro card', amount: 200, type: 'expense', category: 'Transport', date: '2026-06-05' },
  { id: 4, title: 'Netflix', amount: 649, type: 'expense', category: 'Entertainment', date: '2026-06-07' },
  { id: 5, title: 'Freelance project', amount: 12000, type: 'income', category: 'Other', date: '2026-06-10' },
  { id: 6, title: 'Pharmacy', amount: 450, type: 'expense', category: 'Health', date: '2026-06-14' },
]

const S = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0d1117',
    backgroundImage: 'radial-gradient(ellipse at 20% 20%, rgba(26,47,110,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(99,102,241,0.1) 0%, transparent 60%)',
    color: 'white',
    fontFamily: 'Inter, Segoe UI, sans-serif',
  },
  header: {
    backgroundColor: 'rgba(13,17,23,0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
    margin: 0,
  },
  headerSub: {
    fontSize: '13px',
    color: '#8b9bb4',
    marginTop: '3px',
  },
  headerBadge: {
    fontSize: '12px',
    color: '#8b9bb4',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '6px 14px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  content: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '32px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
}

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : initialTransactions
  })

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const handleAdd = (newTransaction) => {
    setTransactions([newTransaction, ...transactions])
  }

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.headerInner}>
          <div>
            <h1 style={S.headerTitle}>💰 Spendly</h1>
            <p style={S.headerSub}>Track your income and expenses with Spendly</p>
          </div>
          <div style={S.headerBadge}>
            {transactions.length} transactions
          </div>
        </div>
      </div>
      <div style={S.content}>
        <SummaryCards transactions={transactions} />
        <div style={S.grid2}>
          <TransactionForm onAdd={handleAdd} />
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        </div>
        <Charts transactions={transactions} />
      </div>
    </div>
  )
}

export default App
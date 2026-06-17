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
    <div className="min-h-screen bg-slate-950">

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              💰 Expense Tracker
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">Track your income and expenses</p>
          </div>
          <div className="text-xs text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full">
            {transactions.length} transactions
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Form + List */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <TransactionForm onAdd={handleAdd} />
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        </div>

        {/* Charts */}
        <Charts transactions={transactions} />

      </div>
    </div>
  )
}

export default App
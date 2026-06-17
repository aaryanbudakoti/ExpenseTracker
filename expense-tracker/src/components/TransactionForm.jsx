import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function TransactionForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = () => {
    if (!title.trim()) { alert('Please enter a title'); return }
    if (!amount || Number(amount) <= 0) { alert('Enter a valid amount'); return }

    onAdd({
      id: uuidv4(),
      title: title.trim(),
      amount: Number(amount),
      type, category, date
    })

    setTitle('')
    setAmount('')
    setType('expense')
    setCategory('Food')
    setDate(new Date().toISOString().split('T')[0])
  }

  const inputClass = "w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors"

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h2 className="text-white font-semibold text-base mb-5">Add transaction</h2>

      {/* Toggle */}
      <div className="flex gap-2 mb-5 bg-slate-900 p-1 rounded-xl">
        <button
          onClick={() => setType('income')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
            ${type === 'income'
              ? 'bg-green-500 text-white'
              : 'text-slate-400 hover:text-white'}`}
        >
          ↑ Income
        </button>
        <button
          onClick={() => setType('expense')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
            ${type === 'expense'
              ? 'bg-red-500 text-white'
              : 'text-slate-400 hover:text-white'}`}
        >
          ↓ Expense
        </button>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="text-slate-400 text-xs mb-1.5 block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Swiggy order, Salary..."
          className={inputClass}
        />
      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-slate-400 text-xs mb-1.5 block">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            min="0"
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-slate-400 text-xs mb-1.5 block">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="text-slate-400 text-xs mb-1.5 block">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Salary</option>
          <option>Other</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
      >
        + Add transaction
      </button>
    </div>
  )
}

export default TransactionForm
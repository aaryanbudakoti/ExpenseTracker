import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function TransactionForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [errors, setErrors] = useState({})

  const today = new Date().toISOString().split('T')[0]

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!amount || Number(amount) <= 0) newErrors.amount = 'Enter a valid amount'
    if (!date) newErrors.date = 'Date is required'
    if (date > today) newErrors.date = 'Date cannot be in the future'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
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
    setDate(today)
  }

  const S = {
    card: {
      backgroundColor: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    },
    header: {
      padding: '20px 24px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    headerTitle: {
      color: 'white',
      fontSize: '15px',
      fontWeight: '600',
      margin: 0,
    },
    body: {
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    toggle: {
      display: 'flex',
      gap: '8px',
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: '4px',
      borderRadius: '12px',
    },
    toggleBtn: (active, color) => ({
      flex: 1,
      padding: '8px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: active ? color : 'transparent',
      color: active ? 'white' : '#64748b',
      transition: 'all 0.15s',
    }),
    label: {
      display: 'block',
      fontSize: '12px',
      color: '#64748b',
      marginBottom: '6px',
    },
    input: (hasError) => ({
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      border: `1px solid ${hasError ? '#f87171' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '10px',
      padding: '10px 14px',
      fontSize: '13px',
      color: 'white',
      outline: 'none',
      boxSizing: 'border-box',
    }),
    select: (hasError) => ({
      width: '100%',
      backgroundColor: '#1a2744',
      border: `1px solid ${hasError ? '#f87171' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '10px',
      padding: '10px 14px',
      fontSize: '13px',
      color: 'white',
      outline: 'none',
      boxSizing: 'border-box',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px center',
    }),
    errorText: {
      fontSize: '11px',
      color: '#f87171',
      marginTop: '4px',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    btn: {
      width: '100%',
      padding: '11px',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      letterSpacing: '0.02em',
    },
  }

  return (
    <div style={S.card}>
      <div style={S.header}>
        <h2 style={S.headerTitle}>Add transaction</h2>
      </div>
      <div style={S.body}>

        {/* Toggle */}
        <div style={S.toggle}>
          <button onClick={() => setType('income')} style={S.toggleBtn(type === 'income', '#22c55e')}>↑ Income</button>
          <button onClick={() => setType('expense')} style={S.toggleBtn(type === 'expense', '#ef4444')}>↓ Expense</button>
        </div>

        {/* Title */}
        <div>
          <label style={S.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors(p => ({ ...p, title: '' })) }}
            placeholder="e.g. Swiggy order, Salary..."
            style={S.input(errors.title)}
          />
          {errors.title && <p style={S.errorText}>{errors.title}</p>}
        </div>

        {/* Amount + Date */}
        <div style={S.row}>
          <div>
            <label style={S.label}>Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setErrors(p => ({ ...p, amount: '' })) }}
              placeholder="0"
              min="0"
              style={S.input(errors.amount)}
            />
            {errors.amount && <p style={S.errorText}>{errors.amount}</p>}
          </div>
          <div>
            <label style={S.label}>Date</label>
            <input
              type="date"
              value={date}
              max={today}
              onChange={(e) => { setDate(e.target.value); setErrors(p => ({ ...p, date: '' })) }}
              style={S.input(errors.date)}
            />
            {errors.date && <p style={S.errorText}>{errors.date}</p>}
          </div>
        </div>

        {/* Category */}
        <div>
          <label style={S.label}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={S.select(false)}
          >
            <option style={{ backgroundColor: '#1a2744' }}>Food</option>
            <option style={{ backgroundColor: '#1a2744' }}>Transport</option>
            <option style={{ backgroundColor: '#1a2744' }}>Shopping</option>
            <option style={{ backgroundColor: '#1a2744' }}>Entertainment</option>
            <option style={{ backgroundColor: '#1a2744' }}>Health</option>
            <option style={{ backgroundColor: '#1a2744' }}>Salary</option>
            <option style={{ backgroundColor: '#1a2744' }}>Other</option>
          </select>
        </div>

        <button onClick={handleSubmit} style={S.btn}>+ Add transaction</button>
      </div>
    </div>
  )
}

export default TransactionForm
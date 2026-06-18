function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense
  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  const glass = {
    backgroundColor: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '16px',
    padding: '24px 28px',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
      <div style={glass}>
        <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b', margin: 0 }}>Total Balance</p>
        <p style={{ fontSize: '32px', fontWeight: '700', color: '#e2e8f0', margin: 0, lineHeight: 1.1 }}>{fmt(balance)}</p>
        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>Income − Expenses</p>
      </div>
      <div style={{ ...glass, border: '1px solid rgba(74,222,128,0.15)', backgroundColor: 'rgba(74,222,128,0.05)' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4ade80', margin: 0, opacity: 0.7 }}>Total Income</p>
        <p style={{ fontSize: '32px', fontWeight: '700', color: '#4ade80', margin: 0, lineHeight: 1.1 }}>{fmt(income)}</p>
        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>{transactions.filter(t => t.type === 'income').length} transactions</p>
      </div>
      <div style={{ ...glass, border: '1px solid rgba(248,113,113,0.15)', backgroundColor: 'rgba(248,113,113,0.05)' }}>
        <p style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f87171', margin: 0, opacity: 0.7 }}>Total Expenses</p>
        <p style={{ fontSize: '32px', fontWeight: '700', color: '#f87171', margin: 0, lineHeight: 1.1 }}>{fmt(expense)}</p>
        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>{transactions.filter(t => t.type === 'expense').length} transactions</p>
      </div>
    </div>
  )
}

export default SummaryCards
function TransactionList({ transactions, onDelete }) {
  const categoryColors = {
    Food: { bg: 'rgba(74,222,128,0.1)', color: '#4ade80' },
    Transport: { bg: 'rgba(96,165,250,0.1)', color: '#60a5fa' },
    Shopping: { bg: 'rgba(249,168,212,0.1)', color: '#f9a8d4' },
    Entertainment: { bg: 'rgba(192,132,252,0.1)', color: '#c084fc' },
    Health: { bg: 'rgba(251,146,60,0.1)', color: '#fb923c' },
    Salary: { bg: 'rgba(74,222,128,0.1)', color: '#4ade80' },
    Other: { bg: 'rgba(148,163,184,0.1)', color: '#94a3b8' },
  }

  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: 0 }}>Transactions</h2>
      </div>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '380px', overflowY: 'auto' }}>
        {transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#475569', fontSize: '13px' }}>
            No transactions yet.
          </div>
        ) : transactions.map((t) => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 12px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                backgroundColor: t.type === 'income' ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                color: t.type === 'income' ? '#4ade80' : '#f87171',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: 'bold', flexShrink: 0,
              }}>
                {t.type === 'income' ? '↑' : '↓'}
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: '500', margin: '0 0 4px' }}>{t.title}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: '500', padding: '2px 8px', borderRadius: '999px',
                    backgroundColor: categoryColors[t.category]?.bg,
                    color: categoryColors[t.category]?.color,
                  }}>
                    {t.category}
                  </span>
                  <span style={{ fontSize: '11px', color: '#475569' }}>{t.date}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: t.type === 'income' ? '#4ade80' : '#f87171' }}>
                {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
              </span>
              <button onClick={() => onDelete(t.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#334155', fontSize: '16px', padding: '4px', borderRadius: '6px',
              }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionList
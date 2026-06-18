import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

function Charts({ transactions }) {
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' })
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 }
    acc[month][t.type] += t.amount
    return acc
  }, {})

  const barData = Object.values(monthlyData)

  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 }
      acc[t.category].value += t.amount
      return acc
    }, {})

  const pieData = Object.values(categoryData)
  const COLORS = ['#6366f1', '#4ade80', '#f97316', '#a855f7', '#ec4899', '#14b8a6', '#f59e0b']
  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  const tooltipStyle = {
    backgroundColor: 'rgba(13,17,23,0.95)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: '#f1f5f9',
    fontSize: '13px',
    backdropFilter: 'blur(12px)',
  }

  const glassCard = (title, content) => (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: 0 }}>{title}</h2>
      </div>
      <div style={{ padding: '20px 24px' }}>{content}</div>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      {glassCard('Monthly overview',
        barData.length === 0
          ? <p style={{ color: '#475569', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>No data yet</p>
          : <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => '₹' + v / 1000 + 'k'} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => fmt(value)} />
                <Bar dataKey="income" fill="#4ade80" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#f87171" radius={[4, 4, 0, 0]} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
      )}
      {glassCard('Spending by category',
        pieData.length === 0
          ? <p style={{ color: '#475569', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>No expenses yet</p>
          : <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => fmt(value)} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
      )}
    </div>
  )
}

export default Charts
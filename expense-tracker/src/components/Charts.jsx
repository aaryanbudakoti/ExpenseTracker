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
  const COLORS = ['#6366f1', '#22c55e', '#f97316', '#a855f7', '#ec4899', '#14b8a6', '#f59e0b']
  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  const tooltipStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#f1f5f9'
  }

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-white font-semibold text-base mb-5">Monthly overview</h2>
        {barData.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">No data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => '₹' + v/1000 + 'k'} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => fmt(value)} />
              <Bar dataKey="income" fill="#22c55e" radius={[4,4,0,0]} name="Income" />
              <Bar dataKey="expense" fill="#ef4444" radius={[4,4,0,0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-white font-semibold text-base mb-5">Spending by category</h2>
        {pieData.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">No expenses yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
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
    </div>
  )
}

export default Charts
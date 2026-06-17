function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense
  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">Total Balance</p>
        <p className="text-3xl font-bold text-white">{fmt(balance)}</p>
        <p className="text-slate-500 text-xs mt-2">Income − Expenses</p>
      </div>
      <div className="bg-slate-800 rounded-2xl p-5 border border-green-900">
        <p className="text-green-400 text-xs font-medium uppercase tracking-widest mb-3">Total Income</p>
        <p className="text-3xl font-bold text-green-400">{fmt(income)}</p>
        <p className="text-slate-500 text-xs mt-2">{transactions.filter(t => t.type === 'income').length} transactions</p>
      </div>
      <div className="bg-slate-800 rounded-2xl p-5 border border-red-900">
        <p className="text-red-400 text-xs font-medium uppercase tracking-widest mb-3">Total Expenses</p>
        <p className="text-3xl font-bold text-red-400">{fmt(expense)}</p>
        <p className="text-slate-500 text-xs mt-2">{transactions.filter(t => t.type === 'expense').length} transactions</p>
      </div>
    </div>
  )
}

export default SummaryCards
function TransactionList({ transactions, onDelete }) {
  const categoryColors = {
    Food: 'bg-green-900 text-green-400',
    Transport: 'bg-blue-900 text-blue-400',
    Shopping: 'bg-pink-900 text-pink-400',
    Entertainment: 'bg-purple-900 text-purple-400',
    Health: 'bg-orange-900 text-orange-400',
    Salary: 'bg-teal-900 text-teal-400',
    Other: 'bg-slate-700 text-slate-300',
  }

  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  if (transactions.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center text-slate-500">
        No transactions yet. Add one.
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h2 className="text-white font-semibold text-base mb-5">Transactions</h2>
      <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold
                ${t.type === 'income' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                {t.type === 'income' ? '↑' : '↓'}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{t.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[t.category]}`}>
                    {t.category}
                  </span>
                  <span className="text-xs text-slate-500">{t.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
              </span>
              <button
                onClick={() => onDelete(t.id)}
                className="text-slate-600 hover:text-red-400 transition-colors text-base"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionList
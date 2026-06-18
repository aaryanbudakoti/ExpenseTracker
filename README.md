# 💰 Spendly -  Expense Tracker

A personal finance tracker built with React — log income and expenses, visualize spending patterns, and track your balance in real time.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-22C55E?style=flat)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)

## 🔗 Live Demo
**[expense-tracker-2511.vercel.app](https://expense-tracker-2511.vercel.app/)**

---

## 📸 Preview

<img width="1891" height="966" alt="Screenshot 2026-06-18 152128" src="https://github.com/user-attachments/assets/4ab956f7-e333-447c-bd6d-9f6d565f5f87" />
<br>

<img width="1891" height="966" alt="Screenshot 2026-06-18 152128" src="https://github.com/user-attachments/assets/0eac5e15-feb4-4530-94fa-992310074d1d" />



---

## ✨ Features

- **Add & delete transactions** — log income or expenses with title, amount, category, and date
- **Real-time summary cards** — balance, total income, and total expenses update instantly
- **Monthly bar chart** — income vs expense comparison across months
- **Category pie chart** — spending breakdown by category (Food, Transport, Entertainment, etc.)
- **Form validation** — inline error messages, future dates blocked at input level
- **localStorage persistence** — data survives page refresh, no backend needed
- **Glassmorphism UI** — frosted glass cards on a deep navy background

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Component-based UI, hooks for state management |
| Vite | Build tool, fast HMR during development |
| Tailwind CSS v4 | Utility-first styling |
| Recharts | Bar chart and pie chart visualizations |
| uuid | Unique ID generation for each transaction |
| localStorage | Client-side data persistence |
| Vercel | Deployment and hosting |

---

## 🧠 Key Concepts Used

- `useState` — manages transactions array and form field states
- `useEffect` — syncs transactions to localStorage on every state change
- **Lazy initial state** — loads from localStorage on mount, falls back to seed data
- **Controlled components** — all form inputs managed by React state
- **Lifting state up** — transaction state lives in App, passed down via props
- **Array methods** — `.filter()`, `.reduce()`, `.map()` for data transformation

## Project Structure 
src/

├── components/

│   ├── SummaryCards.jsx     # Balance, income, expense totals

│   ├── TransactionForm.jsx  # Add transaction form with validation

│   ├── TransactionList.jsx  # Transaction list with delete

│   └── Charts.jsx           # Bar chart + pie chart (Recharts)

├── App.jsx                  # Root component, state management

├── main.jsx                 # Entry point

└── index.css                # Global styles + Tailwind import


---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/aaryanbudakoti/ExpenseTracker.git
cd ExpenseTracker/expense-tracker

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 💡 Design Decisions

**Why `useState` over `useReducer`?**
The state shape is a single array with straightforward add/delete operations. `useState` keeps it simple without the overhead of action types.

**Why localStorage over a backend?**
Frontend-focused project. localStorage provides seamless persistence without requiring a server, authentication, or API calls.

**Why Recharts over Chart.js?**
Recharts is built natively for React with a declarative API — components instead of imperative canvas manipulation. Integrates cleanly with React's re-render cycle.

**Why Vite over Create React App?**
CRA is deprecated. Vite offers faster dev server startup, instant HMR, and modern ESM-based bundling.

---

## 🔮 What I'd Add Next

- [ ] Edit transaction (complete full CRUD)
- [ ] Month/year filter for the transaction list
- [ ] Export transactions to CSV
- [ ] Backend integration with Node.js + MongoDB
- [ ] User authentication so data syncs across devices

---

## 👤 Author

**Aaryan Budakoti**
- Portfolio: [aaryan-budakoti-3dportfolio.vercel.app](https://aaryan-budakoti-3dportfolio.vercel.app)
- GitHub: [@aaryanbudakoti](https://github.com/aaryanbudakoti)
- LinkedIn: [linkedin.com/in/aaryanbudakoti](https://linkedin.com/in/aaryanbudakoti)
- Email: work.aaryanbudakoti@gmail.com

---



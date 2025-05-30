# 📈 Stock Metrics Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/back--end-Node.js-green.svg)](https://nodejs.org/) [![React](https://img.shields.io/badge/front--end-React-blue.svg)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/bundler-Vite-yellow.svg)](https://vitejs.dev/)

A modern, responsive dashboard to fetch and display company overviews and earnings history using Alpha Vantage’s public API. Built with Node.js, Express, React, Redux Toolkit Query, and TailwindCSS.

---

## 🚀 Features

- **Search & Persistence**
  Enter a ticker symbol to fetch data, with your last search persisted in LocalStorage.
- **Single-Page Dashboard**
  Responsive two-column layout: overview & key metrics alongside a paginated earnings table.
- **Request Counter & Limits**
  Tracks up to 25 queries, blocks further calls with a friendly dialog, and handles Alpha Vantage rate limits.
- **Modular Components**
  Clean, reusable hooks and components for header, search bar, results grid, and footer.

---

## 📦 Tech Stack

| Layer     | Technology                                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Back-end  | [Node.js](https://nodejs.org/) · [Express](https://expressjs.com/) · dotenv                                                                                                    |
| Front-end | [React](https://reactjs.org/) · [Vite](https://vitejs.dev/) · [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview) · [TailwindCSS](https://tailwindcss.com/) |
| State     | localStorage via custom React hooks                                                                                                                                            |

---

## 💻 Getting Started

### Prerequisites

- Node.js version 16 or higher
- Yarn or npm
- Alpha Vantage API key (free signup at [alphavantage.co](https://www.alphavantage.co/))

### Installation

```bash
# Clone the repository
git clone https://github.com/ParigiJ/comp-metrics.git
cd comp-metrics

# Install backend dependencies
cd backend
yarn install  # or npm install

# Install frontend dependencies
cd ..
yarn install  # or npm install
```

### Environment Variables

Create a `.env` file in the `backend/` folder:

```ini
PORT=3000
API_KEY=YOUR_ALPHA_VANTAGE_KEY
```

### Running in Development

```bash
# Start Express API
yarn --cwd backend dev   # or: npm run dev --prefix backend

# Start React app with Vite proxy
yarn dev                # or: npm run dev
```

- **React UI**: [http://localhost:5173](http://localhost:5173)
- **API**: [http://localhost:3000](http://localhost:3000)

Vite proxies `/data/*` to the Express backend.

### Building for Production

```bash
# 1) Build React
yarn build             # or: npm run build

# 2) Serve API + React build
yarn --cwd backend start   # or: npm start --prefix backend
```

Visit [http://localhost:3000](http://localhost:3000) to view the live dashboard.

---

## 📁 Project Structure

```plaintext
comp-metrics/
├── backend/                # Express API project
│   ├── app.js              # Server entrypoint
│   ├── package.json
│   └── .env                # Environment variables (ignored)
├── src/                    # React application source
│   ├── app/                # Redux store setup
│   ├── components/         # Shared UI components
│   ├── features/           # Domain-specific components (Overview, EarningsTable, KeyDataTable)
│   ├── hooks/              # Custom React hooks (persistence, data fetching)
│   ├── services/           # RTK Query API slices
│   ├── App.jsx             # Root component (modularized)
│   ├── main.jsx            # ReactDOM entrypoint
│   └── index.css           # Global styles
├── vite.config.js          # Vite configuration (proxy setup)
├── package.json            # Monorepo scripts & dependencies
└── README.md               # (this file)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: describe your feature'`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow existing code styles and include meaningful commit messages.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute.

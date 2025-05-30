# 📈 Stock Metrics Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/back-end-Node.js-green) ![React](https://img.shields.io/badge/front-end-React-blue) ![Vite](https://img.shields.io/badge/bundler-Vite-yellow)

A modern, responsive dashboard to fetch and display company overviews and earnings history using Alpha Vantage’s public API. Built with Node.js, Express, React, Redux Toolkit Query, and TailwindCSS.

---

## 🚀 Features

- **Search & Persistence**
  Enter a ticker symbol to fetch data, with your last search persisted in LocalStorage.
- **Single-Page Dashboard**
  Responsive two-column layout: overview & key metrics alongside a paginated earnings table.
- **Request Counter & Limits**
  Tracks up to 25 queries, blocks further calls with a friendly dialog; handles Alpha Vantage rate limits.
- **Modular Components**
  Clean, reusable hooks and components for header, search bar, results grid, and footer.

---

## 📦 Tech Stack

| Layer     | Technology                                    |
| --------- | --------------------------------------------- |
| Back-end  | Node.js, Express, dotenv                      |
| Front-end | React, Vite, Redux Toolkit Query, TailwindCSS |
| State     | localStorage via custom hooks                 |
| Styling   | TailwindCSS                                   |

---

## 💻 Getting Started

### Prerequisites

- Node.js ≥ 16
- Yarn or npm
- Alpha Vantage API key (free signup at [alphavantage.co](https://www.alphavantage.co/))

### Installation

# Clone the repository

git clone https://github.com/ParigiJ/comp-metrics.git
cd comp-metrics

# Install backend dependencies

cd backend
yarn install # or npm install

# Install frontend dependencies

cd ..
yarn install # or npm install

### Environment Variables

Create a `.env` file in the `backend/` folder:

PORT=3000
API_KEY=YOUR_ALPHA_VANTAGE_KEY

### Running in Development

# Start Express API

cd backend
yarn dev # runs nodemon app.js

# or: npm run dev

# Start React app with Vite proxy

yarn dev # from project root

# or: npm run dev

- React UI: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000](http://localhost:3000)

Vite will proxy `/data/*` to the Express backend.

### Building for Production

# 1) Build React

yarn build # produces `dist/`

# 2) Serve API + React build

cd backend
yarn start # serves static files from ../dist

Visit [http://localhost:3000](http://localhost:3000) to view the live dashboard.

---

## 📁 Project Structure

comp-metrics/
├── backend/ # Express API
│ ├── app.js # API server
│ ├── package.json
│ └── .env # environment variables (gitignored)
├── src/ # React application
│ ├── app/ # Redux store setup
│ ├── components/ # UI components
│ ├── features/ # Domain components (Overview, EarningsTable…)
│ ├── hooks/ # Custom hooks (persistence, data fetching)
│ ├── services/ # RTK Query slices
│ ├── App.jsx # Root component
│ ├── main.jsx # Entry point
│ └── index.css # Global styles
├── vite.config.js # Vite config with proxy
├── package.json
└── README.md

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/awesome`
3. Commit your changes: `git commit -m 'feat: add awesome feature'`
4. Push to your branch: `git push origin feature/awesome`
5. Open a Pull Request

Please follow existing code styles and include meaningful commit messages.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute.

import MessageDialog from "./MessageDialog";

export default function SearchBar({
  symbol,
  onChange,
  onSubmit,
  onClear,
  showEmptyMsg,
  showLimitMsg,
  showApiLimitMsg,
  onCloseEmpty,
  onCloseLimit,
  onCloseApiLimit,
}) {
  return (
    <>
      <form onSubmit={onSubmit} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="AAPL, MSFT, GOOGL…"
            value={symbol}
            onChange={onChange}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {symbol && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="absolute inset-y-3 right-3 flex items-center justify-center bg-gray-200 hover:bg-gray-400 hover:cursor-pointer text-gray-700 rounded-full w-6 h-6"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-6 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 hover:cursor-pointer transition"
        >
          Search
        </button>
      </form>

      <MessageDialog
        message="Please enter a stock symbol."
        visible={showEmptyMsg}
        onClose={onCloseEmpty}
      />
      <MessageDialog
        message="Request limit reached (25). Try again later."
        visible={showLimitMsg}
        onClose={onCloseLimit}
      />
      <MessageDialog
        message="AlphaVantage rate limit exceeded. Please wait a minute."
        visible={showApiLimitMsg}
        onClose={onCloseApiLimit}
      />
    </>
  );
}

import RequestCounter from "../features/counter/RequestCounter";

export default function FooterControls({ count, onReset }) {
  return (
    <footer className="mt-8 flex items-center justify-between">
      <RequestCounter count={count} max={25} />
      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 hover:cursor-pointer transition"
      >
        Reset Counter
      </button>
    </footer>
  );
}

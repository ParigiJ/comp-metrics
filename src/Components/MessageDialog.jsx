const MessageDialog = ({ message, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>
        <p className="mt-2">{message}</p>
      </div>
    </div>
  );
};

export default MessageDialog;

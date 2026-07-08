function DeleteModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {title}
        </h2>

        <p className="text-gray-600 mb-8">
          {message}
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;
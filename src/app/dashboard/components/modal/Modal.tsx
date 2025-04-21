interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  disabled?: boolean;
  submitButtonText?: string;
  onSubmit: () => void;
}

export default function Modal({
  children,
  onClose,
  title,
  disabled,
  submitButtonText = "Submit",
  onSubmit,
}: ModalProps) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md shadow-lg w-full max-w-md relative'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-bold mb-4 text-black'>{title}</h2>
          <button
            onClick={onClose}
            className='absolute top-6 right-6 text-gray-500 hover:text-gray-700'
          >
            ✕
          </button>
        </div>
        {children}
        <div className='flex justify-end mt-4  gap-2'>
          <button
            onClick={onClose}
            disabled={disabled}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
          >
            Cancle
          </button>
          <button
            onClick={onSubmit}
            disabled={disabled}
            className={`${
              submitButtonText.toLowerCase().includes("delete")
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

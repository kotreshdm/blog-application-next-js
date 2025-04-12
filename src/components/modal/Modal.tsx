interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md shadow-lg w-full max-w-md relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

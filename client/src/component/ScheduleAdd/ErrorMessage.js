const ErrorMessage = ({ message, onClose }) => {
    return (
        <div className="fixed z-10 bottom-4 right-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg shadow-lg flex items-center justify-between">
            <span>{message}</span>
            <button
                onClick={onClose}
                className="ml-4 text-red-800 hover:text-red-600"
            >
                &times;
            </button>
        </div>
    );
};

export default ErrorMessage
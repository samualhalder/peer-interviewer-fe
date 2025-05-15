import React from "react";

interface propsType {
  isOpen: boolean;
  title: string;
  descripton?: string;
  onClose?: () => void;
  onAccept?: () => void;
}
const Modal = (props: propsType) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{props.title}</h2>
        <p className="mb-6">{props.descripton}</p>
        <div className="flex justify-end space-x-4">
          {props.onClose && (
            <button
              onClick={props.onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-red-300 bg-red-500 text-white"
            >
              Cancel
            </button>
          )}
          {props.onAccept && (
            <button
              onClick={props.onAccept}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

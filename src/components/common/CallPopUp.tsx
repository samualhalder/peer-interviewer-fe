import React from "react";

interface propsType {
  isOpen: boolean;
  title: string;
  descripton?: string;
  onClose?: () => void;
  onAccept?: () => void;
}
const CallPopUp = (props: propsType) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed flex right-2 top-20 items-center justify-center shadow-2xl z-50">
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="">{props.descripton}</p>
        <div className="flex justify-end space-x-4">
          {props.onClose && (
            <button
              onClick={props.onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-red-300 bg-red-500 text-white"
            >
              Decline
            </button>
          )}
          {props.onAccept && (
            <button
              onClick={props.onAccept}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Accept
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallPopUp;

// ConfirmToast.js
import React from "react";
import { toast } from "react-toastify";

interface ConfirmToastProps {
  message: string;
  onConfirm: () => void;
}

const ConfirmToast = ({ message, onConfirm }: ConfirmToastProps) => {
  return (
    <div className="text-sm text-gray-800">
      <p>{message}</p>
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => toast.dismiss("custom-confirm")}
          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.dismiss("custom-confirm");
            onConfirm();
          }}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmToast;

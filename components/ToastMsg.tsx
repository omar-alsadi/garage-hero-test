import { ToastProps } from "@/interfaces/toasts.interface";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const ToastMsg = ({ message, type, onClose }: ToastProps) => {
  const toastStatus: string =
    type === "success" ? "green" : type === "warn" ? "orange" : "red";

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Toast>
        <div
          className={`bg- inline-flex size-8 shrink-0 items-center justify-center rounded-lg${toastStatus}-100 text-${toastStatus}-500 dark:bg-${toastStatus}-800 dark:text-${toastStatus}-200`}
        >
          {type === "success" ? (
            <HiCheck className="h-5 w-5" />
          ) : type === "warn" ? (
            <HiExclamation className="h-5 w-5" />
          ) : (
            <HiX className="size-5" />
          )}
        </div>
        <div className="ml-1 mr-3 text-sm font-normal">{message}</div>
        <ToastToggle onDismiss={onClose} />
      </Toast>
    </div>
  );
};

export default ToastMsg;

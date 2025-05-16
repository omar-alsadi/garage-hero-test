"use client";
import ToastMsg from "@/components/ToastMsg";
import { useGlobalStore } from "@/store/globalStore";

const ToastsProvider = () => {
  const { toastType, toastMessage, closeToast } = useGlobalStore();

  return (
    <>
      {toastMessage && (
        <ToastMsg
          message={toastMessage}
          type={toastType}
          onClose={closeToast}
        />
      )}
    </>
  );
};

export default ToastsProvider;

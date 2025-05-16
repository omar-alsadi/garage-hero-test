export type ToastType = "success" | "warn" | "error";

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

import { toast } from "react-toastify";

export const showToast = (message: string, options = {}) => {
  toast.dismiss(); // Clear all toasts
  toast(message, options);
};

showToast.success = (message: string, options = {}) => {
  toast.dismiss();
  toast.success(message, options);
};

showToast.error = (message: string, options = {}) => {
  toast.dismiss();
  toast.error(message, options);
};

showToast.info = (message: string, options = {}) => {
  toast.dismiss();
  toast.info(message, options);
};

showToast.warn = (message: string, options = {}) => {
  toast.dismiss();
  toast.warn(message, options);
};

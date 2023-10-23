import React from "react";
import { ToastState } from "@/interface/toast";

const ToastContext = React.createContext<{
  toast: ToastState;
  showToast: (query: any) => void;
  hideToast: () => void;
}>({
  toast: {
    message: "",
    type: "green",
    isShow: false,
  },
  showToast: () => {},
  hideToast: () => {},
});

export default ToastContext;

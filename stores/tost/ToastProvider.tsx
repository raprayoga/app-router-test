"use client";

import { useState } from "react";
import ToastContext from "./toast-context";
import { ToastState } from "@/interface/toast";

const defaultValue: ToastState = {
  message: "",
  type: "green",
  isShow: false,
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState>(defaultValue);

  const showToast = ({
    message = "",
    type = "green",
    isShow = true,
  }: ToastState) => {
    setToast({
      message: message,
      type: type,
      isShow: isShow,
    });
  };

  const hideToast = () => [
    setToast({
      ...defaultValue,
      isShow: false,
    }),
  ];

  const toastContext = {
    toast,
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

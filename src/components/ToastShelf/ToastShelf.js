import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts, dismiss }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            variant={toast.variant}
            message={toast.message}
            dismiss={() => dismiss(toast.id)}
          />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;

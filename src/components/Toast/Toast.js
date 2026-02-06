import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";
import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";
import { doc } from "prettier";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, message, dismiss }) {
  React.useEffect(() => {
    const escapeKeyListener = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };

    document.addEventListener("keydown", escapeKeyListener);

    return () => {
      document.removeEventListener("keydown", escapeKeyListener);
    };
  }, [dismiss]);

  const Icon = ICONS_BY_VARIANT[variant];
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>{message}</p>
      <button className={styles.closeButton} onClick={dismiss}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;

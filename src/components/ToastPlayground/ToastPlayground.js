import { useState } from "react";
import Toast from "../Toast";
import Button from "../Button";
import { XCircle } from "react-feather";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [inputMessage, setInputMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [variantOption, setVariantOption] = useState(VARIANT_OPTIONS[0]);
  const [showToast, setShowToast] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleSetMessage = (event) => {
    const nextMessage = event.currentTarget.value;
    if (showValidationMessage && nextMessage.length < 3) {
      setShowValidationMessage(true);
    } else {
      setShowValidationMessage(false);
    }
    setInputMessage(nextMessage);
  };

  const handleSetVariantOption = (event) => {
    const nextOption = event.currentTarget.value;
    setVariantOption(nextOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputMessage.length < 3) {
      setShowValidationMessage(true);
      return;
    }

    if (!showToast) {
      setToastMessage(inputMessage);
      setShowToast(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {showToast && (
        <Toast
          variant={variantOption}
          message={toastMessage}
          dismiss={() => setShowToast(false)}
        />
      )}
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={inputMessage}
              onChange={handleSetMessage}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label
                key={`${option}-${Math.random()}`}
                htmlFor={`variant-${option}`}
              >
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name={option}
                  value={option}
                  checked={variantOption === option}
                  onChange={handleSetVariantOption}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <div>
              <Button>Pop Toast!</Button>
              {showValidationMessage && (
                <p className={styles.validationMessage}>
                  <XCircle size={13} />
                  Message should have at least 3 characters
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;

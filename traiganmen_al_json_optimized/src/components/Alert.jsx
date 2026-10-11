import { useState } from 'react';
import styles from './Alert.module.css';

const ICONS = {
  success: '✅',
  error: '❌',
  danger: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const Alert = ({
  type = 'info',
  message,
  children,
  onClose,
  dismissible = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;
  if (!message && !children) return null;

  const normalizedType = type === 'error' ? 'danger' : type;
  const alertTypeClass = styles[normalizedType] || styles.info;
  const icon = ICONS[type] || ICONS.info;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const showCloseButton = dismissible || Boolean(onClose);

  return (
    <div
      role="alert"
      className={`${styles.alert} ${alertTypeClass}`}
    >
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <div className={styles.message}>
          {message || children}
        </div>
      </div>
      {showCloseButton && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Cerrar notificación"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;

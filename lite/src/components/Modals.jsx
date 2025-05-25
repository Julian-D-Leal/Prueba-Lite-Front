

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    minWidth: "300px",
    position: "relative"
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer"
  }
};
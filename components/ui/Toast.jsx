"use client";

export default function Toast({ type = "success", message, onClose }) {
  if (!message) return null;

  const icon = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">{icon[type]}</div>

      <div className="toast-content">
        <h4>
          {type === "success" && "Berhasil"}
          {type === "error" && "Gagal"}
          {type === "warning" && "Peringatan"}
          {type === "info" && "Info"}
        </h4>
        <p>{message}</p>
      </div>

      <button type="button" className="toast-close" onClick={onClose}>
        ×
      </button>

      <div className="toast-progress" />
    </div>
  );
}

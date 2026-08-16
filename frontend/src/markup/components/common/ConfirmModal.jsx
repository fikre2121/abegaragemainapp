import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark background */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            {/* Close button */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onCancel}
              disabled={loading}
              aria-label="Close"
            ></button>

            <div className="modal-body text-center p-4 p-md-5">
              {/* Warning icon */}
              <div
                className="
                  d-flex
                  align-items-center
                  justify-content-center
                  mx-auto
                  mb-4
                  rounded-circle
                  bg-danger-subtle
                  text-danger
                "
                style={{
                  width: "64px",
                  height: "64px",
                }}
              >
                <AlertTriangle size={30} />
              </div>

              {/* Title */}
              <h4 className="fw-semibold mb-2">{title}</h4>

              {/* Message */}
              <p className="text-muted mb-4">{message}</p>

              {/* Buttons */}
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-light border px-4"
                  onClick={onCancel}
                  disabled={loading}
                >
                  {cancelText}
                </button>

                <button
                  type="button"
                  className="btn btn-danger px-4 d-flex align-items-center gap-2"
                  onClick={onConfirm}
                  disabled={loading}
                >
                  {loading && <Loader2 size={16} className="spin" />}

                  {loading ? "Deactivating..." : confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;

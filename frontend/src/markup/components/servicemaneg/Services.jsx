import React, { useEffect, useState, useCallback } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiLoader } from "react-icons/fi";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import {
  getAllServices,
  addService,
  updateService,
  deleteService,
} from "../../../api/auth.service";
import ConfirmModal from "../common/ConfirmModal";
const ServiceManage = () => {
  // -----------------------------
  // Services
  // -----------------------------
  const [services, setServices] = useState([]);

  // -----------------------------
  // Loading / error states
  // -----------------------------
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // Edit state
  // -----------------------------
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // -----------------------------
  // Add state
  // -----------------------------
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // -----------------------------
  // Action loading states
  // -----------------------------
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
const [serviceToDelete, setServiceToDelete] = useState(null);
  // =========================================================
  // GET ALL SERVICES
  // =========================================================

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllServices();
      /*
       * Backend response shape:
       * { success: true, data: [...] }
       */
      setServices(response?.data ?? []);
    } catch (err) {
      console.error("🔴Failed to fetch services:", err);
      
      setError(
        err?.response?.data?.message ||
          "Failed to load services. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================================
  // LOAD SERVICES WHEN PAGE OPENS
  // =========================================================

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // =========================================================
  // ADD SERVICE
  // =========================================================

  const handleAdd = async () => {
    const serviceName = newTitle.trim();
    const serviceDescription = newDesc.trim();

    if (!serviceName) {
      return toast.error("Service name is requered");
      return;
    }

    if (!serviceDescription) {
      return toast.error("Service description is requers.");
      return;
    }

    try {
      setAdding(true);
      setError("");

      const response = await addService({
        service_name: serviceName,
        service_description: serviceDescription,
      });
      toast.success("Service created successfuly");

      if (response?.success) {
        setNewTitle("");
        setNewDesc("");

        await fetchServices();
      } else {
        setError(response?.message || "Failed to add service.");
      }
    } catch (err) {
      console.error("ADD SERVICE ERROR:", err);
      console.log("Response:", err?.response);
      console.log("Response data:", err?.response?.data);
      console.log("Status:", err?.response?.status);

      setError(
        err?.response?.data?.message ||
          "Failed to add service. Please try again.",
      );
    } finally {
      setAdding(false);
    }
  };

  // =========================================================
  // START / CANCEL EDIT
  // =========================================================

  const startEdit = (service) => {
    setEditingId(service.service_id);
    setEditTitle(service.service_name);
    setEditDesc(service.service_description || "");
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
    setError("");
  };

  // =========================================================
  // SAVE EDIT
  // =========================================================

  const saveEdit = async () => {
    const serviceName = editTitle.trim();
    const serviceDescription = editDesc.trim();

    if (!serviceName) {
      setError("Service name is required.");
      return;
    }

    if (!serviceDescription) {
      setError("Service description is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await updateService({
        service_id: editingId,
        service_name: serviceName,
        service_description: serviceDescription,
      });

      if (response?.data?.success) {
        setEditingId(null);
        setEditTitle("");
        setEditDesc("");
        await fetchServices();
      } else {
        setError(response?.data?.message || "Failed to update service.");
      }
    } catch (err) {
      console.error("Failed to update service:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to update service. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE / DEACTIVATE SERVICE
  // =========================================================

  const handleDelete = async (serviceId) => {
    try {
      setDeletingId(serviceId);
      setError("");

      const response = await deleteService(serviceId);

      if (response?.success) {
          toast.success("✅ Service deactivated successfully!");

        await fetchServices();
      } else {
        setError(response?.message || "Failed to deactivate service.");
      }
    } catch (err) {
      console.error("Failed to deactivate service:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to deactivate service. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="services-section">
      <div className="auto-container">
        {/* TOP TITLE */}
        <div className="service-header">
          <div className="sec-title style-two">
            <h2>Our Services</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="service-error" role="alert">
            {error}
          </div>
        )}

        {/* SERVICES LIST */}
        <div className="services-box">
          {loading ? (
            <div className="service-loading">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="service-empty">No active services found.</div>
          ) : (
            services.map((service) => {
              const isEditing = editingId === service.service_id;
              const isDeleting = deletingId === service.service_id;

              return (
                <div
                  className={`service-item${isDeleting ? " is-deleting" : ""}`}
                  key={service.service_id}
                >
                  {isEditing ? (
                    /* ========================= EDIT MODE ========================= */
                    <div className="service-edit-form">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Service name"
                        disabled={saving}
                        autoFocus
                      />

                      <textarea
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        placeholder="Service description"
                        rows="3"
                        disabled={saving}
                      />

                      <div className="edit-actions">
                        <button
                          type="button"
                          className="save-btn"
                          onClick={saveEdit}
                          disabled={saving}
                        >
                          {saving ? <FiLoader className="spin" /> : <FiCheck />}
                          {saving ? "Saving..." : "Save"}
                        </button>

                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={cancelEdit}
                          disabled={saving}
                        >
                          <FiX />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ========================= VIEW MODE ========================= */
                    <>
                      <div className="service-text">
                        <h4>{service.service_name}</h4>
                        <p>{service.service_description}</p>
                      </div>

                      <div className="service-icons">
                        <button
                          type="button"
                          className="icon-btn edit-icon"
                          onClick={() => startEdit(service)}
                          disabled={isDeleting}
                          aria-label={`Edit ${service.service_name}`}
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          type="button"
                          className="icon-btn delete-icon"
                          onClick={() => setServiceToDelete(service)}
                          disabled={isDeleting}
                          aria-label={`Deactivate ${service.service_name}`}
                        >
                          {isDeleting ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ADD NEW SERVICE */}
        <div className="add-service-box">
          <div className="title-row">
            <h3>Add a new service</h3>
            <span className="line"></span>
          </div>

          <div>
            <input
              type="text"
              placeholder="Service name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={adding}
            />

            <textarea
              placeholder="Service description"
              rows="6"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              disabled={adding}
            />

            <button
              type="button"
              onClick={() => {
                console.log("ADD SERVICE BUTTON CLICKED");
                handleAdd();
              }}
              disabled={adding}
            >
              {adding ? "ADDING..." : "ADD SERVICE"}
            </button>
          </div>
        </div>
        <ConfirmModal
          isOpen={!!serviceToDelete}
          title="Deactivate service?"
          message={
            serviceToDelete
              ? `Are you sure you want to deactivate "${serviceToDelete.service_name}"? This service will no longer appear when creating new orders.`
              : ""
          }
          confirmText="Deactivate"
          cancelText="Cancel"
          loading={
            serviceToDelete ? deletingId === serviceToDelete.service_id : false
          }
          onCancel={() => setServiceToDelete(null)}
          onConfirm={() => {
            if (serviceToDelete) {
              handleDelete(serviceToDelete.service_id);
            }
          }}
        />
      </div>
    </section>
  );
};

export default ServiceManage;

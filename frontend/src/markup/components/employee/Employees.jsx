import React, { useState } from "react";

const EMPLOYEES_DATA = [
  {
    id: 1,
    active: true,
    firstName: "Fikre",
    lastName: "Kindeya",
    email: "fikre@email.com",
    phone: "0912345678",
    addedDate: "2026-03-17",
    role: "Employee",
  },
  {
    id: 2,
    active: true,
    firstName: "Abel",
    lastName: "Tesfaye",
    email: "abel@email.com",
    phone: "0987654321",
    addedDate: "2026-03-15",
    role: "Manager",
  },
  {
    id: 3,
    active: false,
    firstName: "Sara",
    lastName: "Alemu",
    email: "sara@email.com",
    phone: "0911223344",
    addedDate: "2026-02-10",
    role: "Admin",
  },
  {
    id: 4,
    active: true,
    firstName: "Dawit",
    lastName: "Haile",
    email: "dawit@email.com",
    phone: "0922334455",
    addedDate: "2026-01-05",
    role: "Employee",
  },
  {
    id: 5,
    active: true,
    firstName: "Hana",
    lastName: "Girma",
    email: "hana@email.com",
    phone: "0933445566",
    addedDate: "2026-03-01",
    role: "Admin",
  },
  {
    id: 6,
    active: false,
    firstName: "Yonas",
    lastName: "Bekele",
    email: "yonas@email.com",
    phone: "0944556677",
    addedDate: "2025-12-20",
    role: "Manager",
  },
];

const ROLE_CONFIG = {
  Admin: { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  Manager: { bg: "#ede9fe", color: "#5b21b6", dot: "#7c3aed" },
  Employee: { bg: "#e0f2fe", color: "#075985", dot: "#0284c7" },
};

const ITEMS_PER_PAGE = 5;

function RoleBadge({ role }) {
  const cfg = ROLE_CONFIG[role] || {
    bg: "#f3f4f6",
    color: "#374151",
    dot: "#6b7280",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.03em",
        backgroundColor: cfg.bg,
        color: cfg.color,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: cfg.dot,
          flexShrink: 0,
        }}
      />
      {role}
    </span>
  );
}

function ActiveBadge({ active }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: active ? "#dcfce7" : "#f3f4f6",
        color: active ? "#15803d" : "#6b7280",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          flexShrink: 0,
          backgroundColor: active ? "#22c55e" : "#9ca3af",
          boxShadow: active ? "0 0 0 2px #bbf7d0" : "none",
        }}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export default function Employees() {
  const [employees, setEmployees] = useState(EMPLOYEES_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Employee",
    active: true,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const roles = ["All", "Admin", "Manager", "Employee"];

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `${e.firstName} ${e.lastName} ${e.email} ${e.phone}`
        .toLowerCase()
        .includes(q);
    const matchRole = filterRole === "All" || e.role === filterRole;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function openAdd() {
    setEditTarget(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "Employee",
      active: true,
    });
    setShowModal(true);
  }

  function openEdit(emp) {
    setEditTarget(emp.id);
    setForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: emp.phone,
      role: emp.role,
      active: emp.active,
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim())
      return;
    if (editTarget) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === editTarget ? { ...e, ...form } : e)),
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          addedDate: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    setShowModal(false);
  }

  function handleDelete(id) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  }

  const styles = {
    page: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#f8fafc",
      minHeight: "100vh",
      padding: "32px 24px",
      color: "#0f172a",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 28,
      flexWrap: "wrap",
      gap: 12,
    },
    title: {
      fontSize: 26,
      fontWeight: 700,
      color: "#0f172a",
      margin: 0,
      letterSpacing: "-0.5px",
    },
    subtitle: { fontSize: 14, color: "#64748b", marginTop: 4 },
    addBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "10px 20px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      transition: "background 0.18s",
      boxShadow: "0 1px 4px rgba(37,99,235,0.25)",
    },
    toolbar: {
      display: "flex",
      gap: 12,
      marginBottom: 20,
      flexWrap: "wrap",
      alignItems: "center",
    },
    searchWrap: {
      position: "relative",
      flexGrow: 1,
      minWidth: 200,
    },
    searchIcon: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "#94a3b8",
      pointerEvents: "none",
      fontSize: 16,
    },
    searchInput: {
      width: "100%",
      padding: "9px 12px 9px 36px",
      border: "1.5px solid #e2e8f0",
      borderRadius: 9,
      fontSize: 14,
      outline: "none",
      background: "#fff",
      boxSizing: "border-box",
      color: "#0f172a",
      transition: "border-color 0.15s",
    },
    filterSelect: {
      padding: "9px 14px",
      border: "1.5px solid #e2e8f0",
      borderRadius: 9,
      fontSize: 14,
      background: "#fff",
      color: "#374151",
      outline: "none",
      cursor: "pointer",
    },
    card: {
      background: "#fff",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)",
      border: "1px solid #e2e8f0",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      padding: "13px 16px",
      textAlign: "left",
      fontSize: 12,
      fontWeight: 600,
      color: "#64748b",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      background: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
    },
    td: {
      padding: "14px 16px",
      fontSize: 14,
      color: "#334155",
      borderBottom: "1px solid #f1f5f9",
    },
    avatar: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 13,
      flexShrink: 0,
    },
    nameCell: { display: "flex", alignItems: "center", gap: 10 },
    nameText: { fontWeight: 600, color: "#0f172a", fontSize: 14 },
    emailText: { fontSize: 12, color: "#94a3b8", marginTop: 1 },
    editBtn: {
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1.5px solid #bfdbfe",
      borderRadius: 7,
      background: "#eff6ff",
      color: "#2563eb",
      cursor: "pointer",
      transition: "all 0.15s",
    },
    deleteBtn: {
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1.5px solid #fecaca",
      borderRadius: 7,
      background: "#fff5f5",
      color: "#dc2626",
      cursor: "pointer",
      transition: "all 0.15s",
    },
    pagination: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 20px",
      borderTop: "1px solid #f1f5f9",
      fontSize: 13,
      color: "#64748b",
      flexWrap: "wrap",
      gap: 10,
    },
    pageBtn: {
      width: 34,
      height: 34,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1.5px solid #e2e8f0",
      borderRadius: 8,
      background: "#fff",
      cursor: "pointer",
      fontSize: 13,
      color: "#374151",
      transition: "all 0.15s",
    },
    pageBtnActive: {
      background: "#2563eb",
      color: "#fff",
      borderColor: "#2563eb",
      fontWeight: 700,
    },
    pageBtnDisabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    modal: {
      background: "#fff",
      borderRadius: 16,
      width: "100%",
      maxWidth: 460,
      padding: 28,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 20,
      color: "#0f172a",
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
      marginBottom: 14,
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      marginBottom: 14,
    },
    label: {
      fontSize: 12,
      fontWeight: 600,
      color: "#374151",
      letterSpacing: "0.04em",
    },
    input: {
      padding: "9px 12px",
      border: "1.5px solid #e2e8f0",
      borderRadius: 8,
      fontSize: 14,
      outline: "none",
      color: "#0f172a",
      transition: "border-color 0.15s",
    },
    modalActions: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end",
      marginTop: 22,
    },
    cancelBtn: {
      padding: "9px 18px",
      border: "1.5px solid #e2e8f0",
      borderRadius: 8,
      background: "#fff",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
      color: "#374151",
    },
    saveBtn: {
      padding: "9px 22px",
      border: "none",
      borderRadius: 8,
      background: "#2563eb",
      color: "#fff",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
    },
    emptyRow: {
      padding: "48px 0",
      textAlign: "center",
      color: "#94a3b8",
      fontSize: 14,
    },
  };

  const avatarColors = [
    ["#dbeafe", "#1d4ed8"],
    ["#ede9fe", "#7c3aed"],
    ["#fce7f3", "#be185d"],
    ["#dcfce7", "#15803d"],
    ["#fef3c7", "#92400e"],
    ["#e0f2fe", "#0369a1"],
  ];

  return (
    <div style={styles.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Employees</h1>
          <p style={styles.subtitle}>
            {employees.length} total members across all roles
          </p>
        </div>
        <button
          style={styles.addBtn}
          onClick={openAdd}
          onMouseOver={(e) => (e.currentTarget.style.background = "#1d4ed8")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
        >
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <svg
            style={styles.searchIcon}
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            style={styles.searchInput}
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            onFocus={(e) => (e.target.style.borderColor = "#93c5fd")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
        </div>
        <select
          style={styles.filterSelect}
          value={filterRole}
          onChange={(e) => {
            setFilterRole(e.target.value);
            setCurrentPage(1);
          }}
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Table Card */}
      <div style={styles.card}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "Status",
                  "Employee",
                  "Phone",
                  "Date Added",
                  "Role",
                  "Actions",
                ].map((h) => (
                  <th key={h} style={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} style={styles.emptyRow}>
                    <svg
                      width="40"
                      height="40"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      style={{ margin: "0 auto 8px", display: "block" }}
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    No employees found
                  </td>
                </tr>
              ) : (
                paginated.map((emp, i) => {
                  const [avatarBg, avatarFg] =
                    avatarColors[(emp.id - 1) % avatarColors.length];
                  return (
                    <tr
                      key={emp.id}
                      style={{ transition: "background 0.12s" }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#f8fafc")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      <td style={styles.td}>
                        <ActiveBadge active={emp.active} />
                      </td>
                      <td style={styles.td}>
                        <div style={styles.nameCell}>
                          <div
                            style={{
                              ...styles.avatar,
                              background: avatarBg,
                              color: avatarFg,
                            }}
                          >
                            {emp.firstName[0]}
                            {emp.lastName[0]}
                          </div>
                          <div>
                            <div style={styles.nameText}>
                              {emp.firstName} {emp.lastName}
                            </div>
                            <div style={styles.emailText}>{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>{emp.phone}</td>
                      <td style={styles.td}>{emp.addedDate}</td>
                      <td style={styles.td}>
                        <RoleBadge role={emp.role} />
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: 7 }}>
                          <button
                            style={styles.editBtn}
                            onClick={() => openEdit(emp)}
                            title="Edit"
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "#dbeafe";
                              e.currentTarget.style.borderColor = "#93c5fd";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = "#eff6ff";
                              e.currentTarget.style.borderColor = "#bfdbfe";
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            style={styles.deleteBtn}
                            onClick={() => setDeleteConfirm(emp.id)}
                            title="Delete"
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "#fee2e2";
                              e.currentTarget.style.borderColor = "#fca5a5";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = "#fff5f5";
                              e.currentTarget.style.borderColor = "#fecaca";
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14H6L5 6" />
                              <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <span>
            Showing{" "}
            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === 1 ? styles.pageBtnDisabled : {}),
              }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                style={{
                  ...styles.pageBtn,
                  ...(n === currentPage ? styles.pageBtnActive : {}),
                }}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              style={{
                ...styles.pageBtn,
                ...(currentPage === totalPages || totalPages === 0
                  ? styles.pageBtnDisabled
                  : {}),
              }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          style={styles.overlay}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>
              {editTarget ? "Edit Employee" : "Add New Employee"}
            </h2>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>FIRST NAME *</label>
                <input
                  style={styles.input}
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#93c5fd")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  placeholder="First name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>LAST NAME *</label>
                <input
                  style={styles.input}
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#93c5fd")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>EMAIL *</label>
              <input
                style={styles.input}
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                onFocus={(e) => (e.target.style.borderColor = "#93c5fd")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                placeholder="email@example.com"
              />
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>PHONE</label>
                <input
                  style={styles.input}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  onFocus={(e) => (e.target.style.borderColor = "#93c5fd")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  placeholder="09XXXXXXXX"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>ROLE</label>
                <select
                  style={styles.input}
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                >
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <input
                type="checkbox"
                id="activeCheck"
                checked={form.active}
                onChange={(e) =>
                  setForm((f) => ({ ...f, active: e.target.checked }))
                }
                style={{ width: 16, height: 16, cursor: "pointer" }}
              />
              <label
                htmlFor="activeCheck"
                style={{ fontSize: 14, color: "#374151", cursor: "pointer" }}
              >
                Active employee
              </label>
            </div>
            <div style={styles.modalActions}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                style={styles.saveBtn}
                onClick={handleSave}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#1d4ed8")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#2563eb")
                }
              >
                {editTarget ? "Save Changes" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div
          style={styles.overlay}
          onClick={(e) =>
            e.target === e.currentTarget && setDeleteConfirm(null)
          }
        >
          <div style={{ ...styles.modal, maxWidth: 360, textAlign: "center" }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#fee2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 8,
                color: "#0f172a",
              }}
            >
              Delete Employee?
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 22 }}>
              This action cannot be undone. The employee record will be
              permanently removed.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                style={styles.cancelBtn}
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.saveBtn, background: "#dc2626" }}
                onClick={() => handleDelete(deleteConfirm)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#b91c1c")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#dc2626")
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

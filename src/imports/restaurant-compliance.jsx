import { useState } from "react";

const initialData = {
  eho: [
    {
      id: 1,
      title: "Food Hygiene Inspection",
      authority: "Tower Hamlets EHO",
      rating: 5,
      lastInspection: "2024-11-14",
      nextDue: "2026-11-14",
      status: "compliant",
      notes: "Excellent standards. Full 5-star rating awarded.",
      category: "Food Hygiene",
    },
    {
      id: 2,
      title: "Food Safety Management System",
      authority: "London Borough Council",
      rating: null,
      lastInspection: "2024-08-03",
      nextDue: "2025-08-03",
      status: "due-soon",
      notes: "HACCP documentation needs annual review.",
      category: "Food Safety",
    },
    {
      id: 3,
      title: "Allergen Compliance Check",
      authority: "Food Standards Agency",
      rating: null,
      lastInspection: "2024-06-20",
      nextDue: "2025-06-20",
      status: "compliant",
      notes: "Menu allergen information updated and displayed.",
      category: "Allergens",
    },
  ],
  licences: [
    {
      id: 1,
      title: "Premises Licence",
      authority: "City of London Licensing",
      licenceNo: "CL-2019-00473",
      issued: "2019-04-01",
      expiry: "2029-04-01",
      status: "active",
      category: "Alcohol",
      notes: "Full on/off licence. Hours: Mon–Sat 10:00–23:00, Sun 12:00–22:30",
    },
    {
      id: 2,
      title: "Personal Licence",
      authority: "London Borough of Southwark",
      licenceNo: "PL-SW-00891",
      issued: "2020-01-15",
      expiry: "2030-01-15",
      status: "active",
      category: "Alcohol",
      notes: "Holder: James Hargreaves. DBS checked.",
    },
    {
      id: 3,
      title: "Music & Entertainment Licence",
      authority: "City of London Licensing",
      licenceNo: "CL-ENT-2022-0114",
      issued: "2022-03-10",
      expiry: "2025-03-10",
      status: "expired",
      category: "Entertainment",
      notes: "Renewal application submitted 01 Feb 2025.",
    },
    {
      id: 4,
      title: "Outdoor Seating Licence",
      authority: "Westminster City Council",
      licenceNo: "WCC-OUT-44821",
      issued: "2023-05-01",
      expiry: "2025-05-01",
      status: "due-soon",
      category: "Premises",
      notes: "Covers 8 tables on the pavement area.",
    },
    {
      id: 5,
      title: "Late Night Refreshment",
      authority: "Metropolitan Police Licensing",
      licenceNo: "LNR-MET-3302",
      issued: "2021-09-01",
      expiry: "2031-09-01",
      status: "active",
      category: "Food & Drink",
      notes: "Permitted until 01:00 Fri & Sat.",
    },
  ],
};

const statusConfig = {
  compliant: { label: "Compliant", color: "#22c55e", bg: "#052e16" },
  active: { label: "Active", color: "#22c55e", bg: "#052e16" },
  "due-soon": { label: "Due Soon", color: "#f59e0b", bg: "#1c1003" },
  expired: { label: "Expired", color: "#ef4444", bg: "#1f0202" },
  overdue: { label: "Overdue", color: "#ef4444", bg: "#1f0202" },
};

const categoryColors = {
  "Food Hygiene": "#6366f1",
  "Food Safety": "#8b5cf6",
  Allergens: "#a78bfa",
  Alcohol: "#f97316",
  Entertainment: "#ec4899",
  Premises: "#14b8a6",
  "Food & Drink": "#06b6d4",
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.compliant;
  return (
    <span
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.color}40`,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontFamily: "inherit",
      }}
    >
      {cfg.label}
    </span>
  );
}

function CategoryPill({ category }) {
  const color = categoryColors[category] || "#64748b";
  return (
    <span
      style={{
        background: color + "18",
        color,
        border: `1px solid ${color}30`,
        padding: "2px 9px",
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
      }}
    >
      {category}
    </span>
  );
}

function StarRating({ rating }) {
  if (!rating) return null;
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: 14, color: s <= rating ? "#f59e0b" : "#334155" }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 4 }}>FSA Rating</span>
    </div>
  );
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function RecordCard({ record, type, onClick }) {
  const dateKey = type === "eho" ? "nextDue" : "expiry";
  const days = daysUntil(record[dateKey]);
  const urgent = days < 60 && days >= 0;

  return (
    <div
      onClick={() => onClick(record)}
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        border: "1px solid #1e293b",
        borderLeft: `3px solid ${urgent ? "#f59e0b" : record.status === "expired" ? "#ef4444" : "#334155"}`,
        borderRadius: 12,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.18s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#334155";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e293b";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ flex: 1, paddingRight: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 4, letterSpacing: "-0.01em" }}>
            {record.title}
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{record.authority}</div>
        </div>
        <StatusBadge status={record.status} />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        <CategoryPill category={record.category} />
        {record.licenceNo && (
          <span style={{ fontSize: 10, color: "#475569", fontFamily: "monospace", background: "#0f172a", padding: "2px 8px", borderRadius: 4, border: "1px solid #1e293b" }}>
            {record.licenceNo}
          </span>
        )}
      </div>

      {record.rating && <div style={{ marginBottom: 10 }}><StarRating rating={record.rating} /></div>}

      <div style={{ display: "flex", gap: 20 }}>
        {type === "eho" ? (
          <>
            <div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Last Inspection</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{formatDate(record.lastInspection)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Next Due</div>
              <div style={{ fontSize: 12, color: urgent ? "#f59e0b" : "#94a3b8", fontWeight: urgent ? 600 : 400 }}>
                {formatDate(record.nextDue)} {urgent && `(${days}d)`}
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Issued</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{formatDate(record.issued)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Expires</div>
              <div style={{ fontSize: 12, color: record.status === "expired" ? "#ef4444" : urgent ? "#f59e0b" : "#94a3b8", fontWeight: urgent || record.status === "expired" ? 600 : 400 }}>
                {formatDate(record.expiry)} {urgent && days >= 0 && `(${days}d)`}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Modal({ record, type, onClose }) {
  if (!record) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16,
          padding: 32, maxWidth: 500, width: "100%", position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#475569", fontSize: 22, cursor: "pointer", lineHeight: 1 }}
        >×</button>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <CategoryPill category={record.category} />
            <StatusBadge status={record.status} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em", marginBottom: 4 }}>{record.title}</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>{record.authority}</div>
        </div>
        {record.rating && <div style={{ marginBottom: 16 }}><StarRating rating={record.rating} /></div>}
        {record.licenceNo && (
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Licence Number</div>
            <div style={{ fontFamily: "monospace", color: "#94a3b8", fontSize: 14 }}>{record.licenceNo}</div>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {type === "eho" ? (
            <>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Last Inspection</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{formatDate(record.lastInspection)}</div>
              </div>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Next Due</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{formatDate(record.nextDue)}</div>
              </div>
            </>
          ) : (
            <>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Issued</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{formatDate(record.issued)}</div>
              </div>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Expiry</div>
                <div style={{ color: record.status === "expired" ? "#ef4444" : "#94a3b8", fontSize: 14 }}>{formatDate(record.expiry)}</div>
              </div>
            </>
          )}
        </div>
        <div style={{ background: "#1e293b", borderRadius: 8, padding: "12px 14px" }}>
          <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Notes</div>
          <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{record.notes}</div>
        </div>
      </div>
    </div>
  );
}

function AddModal({ type, onClose, onAdd }) {
  const [form, setForm] = useState(
    type === "eho"
      ? { title: "", authority: "", category: "Food Hygiene", lastInspection: "", nextDue: "", rating: "", status: "compliant", notes: "" }
      : { title: "", authority: "", category: "Alcohol", licenceNo: "", issued: "", expiry: "", status: "active", notes: "" }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const inputStyle = {
    background: "#1e293b", border: "1px solid #334155", borderRadius: 8,
    color: "#f1f5f9", padding: "9px 12px", fontSize: 13, width: "100%",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 32, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>
          Add {type === "eho" ? "EHO Record" : "Licence"}
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <div><label style={labelStyle}>Title</label><input style={inputStyle} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder={type === "eho" ? "e.g. Food Hygiene Inspection" : "e.g. Premises Licence"} /></div>
          <div><label style={labelStyle}>Issuing Authority</label><input style={inputStyle} value={form.authority} onChange={(e) => set("authority", e.target.value)} /></div>
          <div><label style={labelStyle}>Category</label>
            <select style={inputStyle} value={form.category} onChange={(e) => set("category", e.target.value)}>
              {type === "eho"
                ? ["Food Hygiene", "Food Safety", "Allergens", "Health & Safety"].map((c) => <option key={c}>{c}</option>)
                : ["Alcohol", "Entertainment", "Premises", "Food & Drink", "Other"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          {type === "licence" && <div><label style={labelStyle}>Licence Number</label><input style={inputStyle} value={form.licenceNo} onChange={(e) => set("licenceNo", e.target.value)} /></div>}
          {type === "eho" ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={labelStyle}>Last Inspection</label><input type="date" style={inputStyle} value={form.lastInspection} onChange={(e) => set("lastInspection", e.target.value)} /></div>
                <div><label style={labelStyle}>Next Due</label><input type="date" style={inputStyle} value={form.nextDue} onChange={(e) => set("nextDue", e.target.value)} /></div>
              </div>
              <div><label style={labelStyle}>FSA Rating (1–5)</label><input type="number" min={1} max={5} style={inputStyle} value={form.rating} onChange={(e) => set("rating", e.target.value)} /></div>
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={labelStyle}>Issue Date</label><input type="date" style={inputStyle} value={form.issued} onChange={(e) => set("issued", e.target.value)} /></div>
              <div><label style={labelStyle}>Expiry Date</label><input type="date" style={inputStyle} value={form.expiry} onChange={(e) => set("expiry", e.target.value)} /></div>
            </div>
          )}
          <div><label style={labelStyle}>Status</label>
            <select style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value)}>
              {type === "eho"
                ? [["compliant", "Compliant"], ["due-soon", "Due Soon"], ["overdue", "Overdue"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)
                : [["active", "Active"], ["due-soon", "Due Soon"], ["expired", "Expired"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Notes</label><textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{ flex: 1, background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "11px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Cancel</button>
          <button
            onClick={() => { if (form.title && form.authority) { onAdd(form); onClose(); } }}
            style={{ flex: 2, background: "#3b82f6", border: "none", color: "#fff", padding: "11px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}
          >Add Record</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("overview");
  const [selected, setSelected] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [addModal, setAddModal] = useState(null);
  const [filter, setFilter] = useState("all");

  const allRecords = [
    ...data.eho.map((r) => ({ ...r, _type: "eho", _dateKey: r.nextDue })),
    ...data.licences.map((r) => ({ ...r, _type: "licence", _dateKey: r.expiry })),
  ];

  const alerts = allRecords.filter((r) => {
    const d = daysUntil(r._dateKey);
    return d < 60 || r.status === "expired";
  });

  const stats = {
    total: allRecords.length,
    compliant: allRecords.filter((r) => r.status === "compliant" || r.status === "active").length,
    dueSoon: allRecords.filter((r) => r.status === "due-soon").length,
    expired: allRecords.filter((r) => r.status === "expired").length,
  };

  function handleAdd(type, form) {
    const newRecord = { ...form, id: Date.now(), rating: form.rating ? parseInt(form.rating) : null };
    setData((d) => ({ ...d, [type === "eho" ? "eho" : "licences"]: [...d[type === "eho" ? "eho" : "licences"], newRecord] }));
  }

  const filteredEho = filter === "all" ? data.eho : data.eho.filter((r) => r.status === filter);
  const filteredLicences = filter === "all" ? data.licences : data.licences.filter((r) => r.status === filter);

  const tabStyle = (t) => ({
    padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
    fontSize: 13, fontWeight: 600, fontFamily: "inherit",
    background: tab === t ? "#3b82f6" : "transparent",
    color: tab === t ? "#fff" : "#64748b",
    transition: "all 0.15s",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#020817", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#f1f5f9" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0f172a; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }`}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e293b", padding: "0 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3b82f6, #6366f1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚖️</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>ComplianceVault</div>
              <div style={{ fontSize: 11, color: "#475569" }}>London Restaurant Compliance Manager</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setAddModal("eho")} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>+ EHO Record</button>
            <button onClick={() => setAddModal("licence")} style={{ background: "#3b82f6", border: "none", color: "#fff", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>+ Licence</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 28px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Total Records", value: stats.total, color: "#64748b", icon: "📋" },
            { label: "Compliant / Active", value: stats.compliant, color: "#22c55e", icon: "✅" },
            { label: "Due Soon", value: stats.dueSoon, color: "#f59e0b", icon: "⏰" },
            { label: "Expired", value: stats.expired, color: "#ef4444", icon: "⚠️" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div style={{ background: "#1a0d00", border: "1px solid #78350f40", borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <span>⚠️</span> ACTION REQUIRED — {alerts.length} record{alerts.length > 1 ? "s" : ""} need attention
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {alerts.map((a) => {
                const d = daysUntil(a._dateKey);
                return (
                  <div key={a.id + a._type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: a.status === "expired" ? "#ef4444" : "#f59e0b", fontWeight: 600 }}>
                      {a.status === "expired" ? "EXPIRED" : `${d} days remaining`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#0f172a", padding: 4, borderRadius: 10, width: "fit-content" }}>
          {[["overview", "Overview"], ["eho", "EHO Records"], ["licences", "Licences"]].map(([t, l]) => (
            <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>{l}</button>
          ))}
        </div>

        {/* Filter */}
        {tab !== "overview" && (
          <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
            {["all", "compliant", "active", "due-soon", "expired"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "5px 12px", borderRadius: 20, border: `1px solid ${filter === f ? "#3b82f6" : "#1e293b"}`,
                background: filter === f ? "#1e3a5f" : "transparent", color: filter === f ? "#93c5fd" : "#475569",
                fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize",
              }}>{f === "due-soon" ? "Due Soon" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
        )}

        {/* Content */}
        {tab === "overview" && (
          <div style={{ display: "grid", gap: 28 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>EHO Records</div>
              <div style={{ display: "grid", gap: 10 }}>
                {data.eho.map((r) => <RecordCard key={r.id} record={r} type="eho" onClick={(r) => { setSelected(r); setSelectedType("eho"); }} />)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Licences</div>
              <div style={{ display: "grid", gap: 10 }}>
                {data.licences.map((r) => <RecordCard key={r.id} record={r} type="licence" onClick={(r) => { setSelected(r); setSelectedType("licence"); }} />)}
              </div>
            </div>
          </div>
        )}

        {tab === "eho" && (
          <div style={{ display: "grid", gap: 10 }}>
            {filteredEho.length === 0 && <div style={{ color: "#475569", fontSize: 14, padding: "24px 0" }}>No records match this filter.</div>}
            {filteredEho.map((r) => <RecordCard key={r.id} record={r} type="eho" onClick={(r) => { setSelected(r); setSelectedType("eho"); }} />)}
          </div>
        )}

        {tab === "licences" && (
          <div style={{ display: "grid", gap: 10 }}>
            {filteredLicences.length === 0 && <div style={{ color: "#475569", fontSize: 14, padding: "24px 0" }}>No records match this filter.</div>}
            {filteredLicences.map((r) => <RecordCard key={r.id} record={r} type="licence" onClick={(r) => { setSelected(r); setSelectedType("licence"); }} />)}
          </div>
        )}
      </div>

      {selected && <Modal record={selected} type={selectedType} onClose={() => setSelected(null)} />}
      {addModal && <AddModal type={addModal} onClose={() => setAddModal(null)} onAdd={(form) => handleAdd(addModal, form)} />}
    </div>
  );
}

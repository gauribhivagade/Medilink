import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Save,
  Store,
  Phone,
  MapPin,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  UserCog,
  ShieldCheck,
  BadgeCheck,
  ArrowLeft
} from "lucide-react";
import "./AdminDashboard.css";

// Stock below this count (but above zero) is flagged as "Low Stock"
const LOW_STOCK_THRESHOLD = 10;

function AdminDashboard({ pharmacies, medicines, inventory, onUpdateStock, onBack }) {
  const [selectedMedId, setSelectedMedId] = useState(medicines[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [draftValues, setDraftValues] = useState({});
  const [flashIds, setFlashIds] = useState({});

  const selectedMedicine = medicines.find((m) => m.id === selectedMedId);

  const getStock = (pharmacyId) => inventory[pharmacyId]?.[selectedMedId] || 0;

  const filteredPharmacies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return pharmacies;
    return pharmacies.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.address.toLowerCase().includes(term)
    );
  }, [pharmacies, searchTerm]);

  const stats = useMemo(() => {
    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;

    pharmacies.forEach((p) => {
      const stock = getStock(p.id);
      if (stock <= 0) outOfStock += 1;
      else if (stock < LOW_STOCK_THRESHOLD) lowStock += 1;
      else inStock += 1;
    });

    return {
      total: pharmacies.length,
      inStock,
      lowStock,
      outOfStock
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pharmacies, inventory, selectedMedId]);

  const flashCard = (pharmacyId) => {
    setFlashIds((prev) => ({ ...prev, [pharmacyId]: true }));
    setTimeout(() => {
      setFlashIds((prev) => ({ ...prev, [pharmacyId]: false }));
    }, 900);
  };

  const handleQuickAdjust = (pharmacyId, delta) => {
    onUpdateStock(pharmacyId, selectedMedId, delta);
    flashCard(pharmacyId);
  };

  const handleDraftChange = (pharmacyId, value) => {
    setDraftValues((prev) => ({ ...prev, [pharmacyId]: value }));
  };

  const handleUpdateStockSubmit = (pharmacyId) => {
    const draft = draftValues[pharmacyId];
    if (draft === undefined || draft === "") return;

    const targetValue = Math.max(0, parseInt(draft, 10) || 0);
    const currentStock = getStock(pharmacyId);
    const delta = targetValue - currentStock;

    if (delta !== 0) {
      onUpdateStock(pharmacyId, selectedMedId, delta);
    }

    flashCard(pharmacyId);
    setDraftValues((prev) => ({ ...prev, [pharmacyId]: "" }));
  };

  const getStatus = (stock) => {
    if (stock <= 0) return { label: "Out of Stock", cls: "out" };
    if (stock < LOW_STOCK_THRESHOLD) return { label: "Low Stock", cls: "low" };
    return { label: "In Stock", cls: "healthy" };
  };

  return (
    <div className="admin-dashboard">
      {/* Top Bar: Title + Pharmacist Profile */}
      <div className="admin-topbar">
        <div className="admin-title-block">
          <div className="admin-title-icon">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="admin-title">Admin Dashboard</h2>
            <p className="admin-subtitle">Manage pharmacy inventory across the MediLink network</p>
          </div>
        </div>

        <div className="pharmacist-profile">
          <div className="pharmacist-avatar">
            <UserCog size={20} />
          </div>
          <div className="pharmacist-info">
            <span className="pharmacist-name">
              Dr. Ananya Sharma
              <BadgeCheck size={13} className="pharmacist-verified" />
            </span>
            <span className="pharmacist-role">Lead Pharmacist &middot; Inventory Admin</span>
          </div>
        </div>

        {onBack && (
          <button type="button" className="admin-exit-btn" onClick={onBack}>
            <ArrowLeft size={14} />
            Exit Admin View
          </button>
        )}
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card stagger-item" style={{ "--i": 0 }}>
          <div className="admin-stat-icon total">
            <Store size={18} />
          </div>
          <div className="admin-stat-body">
            <span className="admin-stat-value">{stats.total}</span>
            <span className="admin-stat-label">Total Pharmacies</span>
          </div>
        </div>

        <div className="admin-stat-card stagger-item" style={{ "--i": 1 }}>
          <div className="admin-stat-icon healthy">
            <CheckCircle2 size={18} />
          </div>
          <div className="admin-stat-body">
            <span className="admin-stat-value">{stats.inStock}</span>
            <span className="admin-stat-label">In Stock</span>
          </div>
        </div>

        <div className="admin-stat-card stagger-item" style={{ "--i": 2 }}>
          <div className="admin-stat-icon low">
            <AlertTriangle size={18} />
          </div>
          <div className="admin-stat-body">
            <span className="admin-stat-value">{stats.lowStock}</span>
            <span className="admin-stat-label">Low Stock</span>
          </div>
        </div>

        <div className="admin-stat-card stagger-item" style={{ "--i": 3 }}>
          <div className="admin-stat-icon out">
            <XCircle size={18} />
          </div>
          <div className="admin-stat-body">
            <span className="admin-stat-value">{stats.outOfStock}</span>
            <span className="admin-stat-label">Out of Stock</span>
          </div>
        </div>
      </div>

      {/* Controls: Medicine selector + Search bar */}
      <div className="admin-controls-row">
        <select
          className="admin-med-select"
          value={selectedMedId}
          onChange={(e) => setSelectedMedId(e.target.value)}
        >
          {medicines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.brandName} ({m.genericName})
            </option>
          ))}
        </select>

        <div className="admin-search-bar">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search pharmacies by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {selectedMedicine && (
        <p className="admin-managing-note">
          <Package size={13} />
          Managing stock for <strong>{selectedMedicine.brandName}</strong>
        </p>
      )}

      {/* Pharmacy Cards Grid */}
      <div className="admin-pharmacy-grid">
        {filteredPharmacies.length === 0 && (
          <div className="admin-empty-state">
            <Search size={28} />
            <span>No pharmacies match "{searchTerm}"</span>
          </div>
        )}

        {filteredPharmacies.map((pharmacy, idx) => {
          const stock = getStock(pharmacy.id);
          const status = getStatus(stock);

          return (
            <div
              key={pharmacy.id}
              className={`admin-pharmacy-card stagger-item ${flashIds[pharmacy.id] ? "flash-update" : ""}`}
              style={{ "--i": idx }}
            >
              <div className="admin-card-header">
                <div className="admin-card-icon">
                  <Store size={16} />
                </div>
                <div className="admin-card-heading">
                  <span className="admin-card-name">{pharmacy.name}</span>
                  <span className={`admin-status-pill ${status.cls}`}>{status.label}</span>
                </div>
              </div>

              <div className="admin-card-meta">
                <span>
                  <MapPin size={12} />
                  {pharmacy.address}
                </span>
                <span>
                  <Phone size={12} />
                  {pharmacy.phone}
                </span>
              </div>

              <div className="admin-stock-row">
                <span className="admin-stock-label">Current Stock</span>
                <span className="admin-stock-value">{stock} units</span>
              </div>

              <div className="admin-adjust-row">
                <button
                  type="button"
                  className="admin-btn-round minus"
                  onClick={() => handleQuickAdjust(pharmacy.id, -1)}
                  disabled={stock <= 0}
                  title="Decrease stock by 1"
                >
                  <Minus size={16} />
                </button>

                <span className="admin-adjust-value">{stock}</span>

                <button
                  type="button"
                  className="admin-btn-round plus"
                  onClick={() => handleQuickAdjust(pharmacy.id, 1)}
                  title="Increase stock by 1"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="admin-update-row">
                <input
                  type="number"
                  min="0"
                  className="admin-update-input"
                  placeholder="Set exact qty"
                  value={draftValues[pharmacy.id] ?? ""}
                  onChange={(e) => handleDraftChange(pharmacy.id, e.target.value)}
                />
                <button
                  type="button"
                  className="admin-btn-update"
                  onClick={() => handleUpdateStockSubmit(pharmacy.id)}
                >
                  <Save size={13} />
                  Update Stock
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;

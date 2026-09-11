import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ShieldAlert,
  BellRing,
  Activity,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Database,
  AlertTriangle,
  Send,
  RefreshCw,
  Trash2,
  Bell,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  ArrowLeft,
  IndianRupee,
  ArrowUpDown,
  Tag,
  LayoutDashboard
} from "lucide-react";
import {
  INITIAL_MEDICINES,
  INITIAL_PHARMACIES,
  INITIAL_INVENTORY,
  INITIAL_PRICES
} from "./data/db";
import { WorkflowManager } from "./workflow/WorkflowManager";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

const workflowManager = new WorkflowManager();

function App() {
  // App States
  const [medicines] = useState(INITIAL_MEDICINES);
  const [pharmacies] = useState(INITIAL_PHARMACIES);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [prices] = useState(INITIAL_PRICES);
  const [selectedMedId, setSelectedMedId] = useState("med-3"); // Amoxil by default
  const [pharmacySortMode, setPharmacySortMode] = useState("distance"); // "distance" | "price"

  const [query, setQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Theme State (dark / light)
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("medilink-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("medilink-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Agent State Tracker
  const [agentStatuses, setAgentStatuses] = useState({
    search: "idle",
    pharmacy: "idle",
    alternative: "idle",
    notification: "idle"
  });
  const [agentLogs, setAgentLogs] = useState({
    search: [],
    pharmacy: [],
    alternative: [],
    notification: []
  });
  const [agentResults, setAgentResults] = useState({
    search: null,
    pharmacy: null,
    alternative: null,
    notification: null
  });
  const [expandedLogs, setExpandedLogs] = useState({
    search: true,
    pharmacy: false,
    alternative: false,
    notification: false
  });

  // Alert & Subscriptions State
  const [subscriptions, setSubscriptions] = useState([
    {
      id: "sub-init-1",
      medicineId: "med-3",
      brandName: "Amoxil",
      genericName: "Amoxicillin",
      contact: "patient@medilink.ai",
      channel: "Email"
    }
  ]);
  const [triggeredAlerts, setTriggeredAlerts] = useState([]);
  
  // Custom Toast State
  const [toast, setToast] = useState({ show: false, title: "", message: "" });
  
  // Subform State
  const [subContact, setSubContact] = useState("");
  const [subChannel, setSubChannel] = useState("SMS");
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Show Toast helper
  const showToast = (title, message) => {
    setToast({ show: true, title, message });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, title: "", message: "" });
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Adjust stock & handle reactive triggers
  const handleUpdateStock = (pharmacyId, medicineId, amount) => {
    const currentStock = inventory[pharmacyId]?.[medicineId] || 0;
    const newStock = Math.max(0, currentStock + amount);

    // Reactively trigger notifications if stock goes from 0 to > 0
    if (currentStock === 0 && newStock > 0) {
      const medObj = medicines.find((m) => m.id === medicineId);
      const pharmObj = pharmacies.find((p) => p.id === pharmacyId);

      if (medObj && pharmObj) {
        // Find subscriptions for this medicine
        const matchedSubs = subscriptions.filter((sub) => sub.medicineId === medicineId);

        if (matchedSubs.length > 0) {
          const alertMessage = `RESTOCK ALERT: Good news! ${medObj.brandName} (${medObj.genericName}) is now back in stock (${newStock} units) at ${pharmObj.name}. Search again to confirm.`;
          
          // Fire alert for each subscription
          matchedSubs.forEach((sub) => {
            setTriggeredAlerts((prev) => [
              {
                id: Date.now() + Math.random(),
                message: alertMessage,
                timestamp: new Date().toLocaleTimeString(),
                contact: sub.contact,
                channel: sub.channel
              },
              ...prev
            ]);
            showToast("Replenishment Alert Triggered", `${sub.channel} alert dispatched to ${sub.contact}`);
          });

          // Clear completed subscriptions
          setSubscriptions((prev) => prev.filter((sub) => sub.medicineId !== medicineId));
        }
      }
    }

    setInventory((prev) => ({
      ...prev,
      [pharmacyId]: {
        ...prev[pharmacyId],
        [medicineId]: newStock
      }
    }));
  };

  // Run the multi-agent workflow
  const triggerWorkflow = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setActiveSearch(searchQuery);
    setIsRunning(true);
    setHasSubscribed(false);
    setSubContact("");
    setPharmacySortMode("distance");

    // Reset Agent statuses and logs
    setAgentStatuses({
      search: "idle",
      pharmacy: "idle",
      alternative: "idle",
      notification: "idle"
    });
    setAgentLogs({
      search: [],
      pharmacy: [],
      alternative: [],
      notification: []
    });
    setAgentResults({
      search: null,
      pharmacy: null,
      alternative: null,
      notification: null
    });

    // Expand search agent logs console
    setExpandedLogs({
      search: true,
      pharmacy: false,
      alternative: false,
      notification: false
    });

    // Execute the Workflow via WorkflowManager
    const workflowOut = await workflowManager.executeWorkflow(
      searchQuery,
      medicines,
      pharmacies,
      inventory,
      prices,
      {
        onAgentStart: (agentKey, agent) => {
          setAgentStatuses((prev) => ({ ...prev, [agentKey]: "running" }));
          // Auto accordion logs
          setExpandedLogs((prev) => {
            const updated = { ...prev };
            // close others and open this one
            Object.keys(updated).forEach((k) => {
              updated[k] = k === agentKey;
            });
            return updated;
          });
        },
        onAgentLog: (agentKey, logObj) => {
          setAgentLogs((prev) => ({
            ...prev,
            [agentKey]: [...prev[agentKey], logObj]
          }));
        },
        onAgentComplete: (agentKey, result) => {
          setAgentStatuses((prev) => ({
            ...prev,
            [agentKey]: result.triggered === false ? "bypassed" : (result.success ? "completed" : "failed")
          }));
          setAgentResults((prev) => ({ ...prev, [agentKey]: result }));
        }
      }
    );

    setIsRunning(false);
    
    // Auto-open logs of relevant active agents on finish
    setExpandedLogs({
      search: false,
      pharmacy: false,
      alternative: workflowOut.results.alternative?.triggered !== false,
      notification: workflowOut.results.notification?.triggered !== false
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    triggerWorkflow(query);
  };

  const handleSuggestionClick = (medName) => {
    setQuery(medName);
    triggerWorkflow(medName);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subContact.trim()) return;

    const currentMed = agentResults.search?.data;
    if (!currentMed) return;

    const newSub = {
      id: "sub-" + Date.now(),
      medicineId: currentMed.medicineId,
      brandName: currentMed.brandName,
      genericName: currentMed.genericName,
      contact: subContact,
      channel: subChannel
    };

    setSubscriptions((prev) => [...prev, newSub]);
    setHasSubscribed(true);
    showToast("Subscription Created", `You will be alerted via ${subChannel} when ${currentMed.brandName} is refilled.`);
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const getAgentIcon = (iconName) => {
    switch (iconName) {
      case "Search": return <Search size={18} />;
      case "MapPin": return <MapPin size={18} />;
      case "ShieldAlert": return <ShieldAlert size={18} />;
      case "BellRing": return <BellRing size={18} />;
      default: return <Activity size={18} />;
    }
  };

  return (
    <div className="app-container">
      {/* Background Neon Glow Elements */}
      <div className="bg-glow-container">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      {/* Reactive Floating Toast Notifications */}
      {toast.show && (
        <div className="toast-container">
          <div className="toast">
            <Bell className="toast-icon" size={20} />
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-desc">{toast.message}</div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header>
        <div className="header-content">
          <div className="brand-section">
            <Activity className="logo-icon" size={26} />
            <h1 className="brand-name">MediLink AI</h1>
            <span className="brand-badge">Orchestrator v2.0</span>
          </div>

          <div className="header-actions">
            <button
              className={`btn-icon-label ${showAdminDashboard ? "active" : ""}`}
              onClick={() => setShowAdminDashboard(!showAdminDashboard)}
              title="Toggle Admin Dashboard"
            >
              <LayoutDashboard size={16} />
              <span>Admin Dashboard</span>
            </button>

            <button
              className={`btn-icon-label ${!sidebarCollapsed ? "active" : ""}`}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title="Toggle Inventory Database Panel"
            >
              <Database size={16} />
              <span>Database Manager</span>
            </button>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle light and dark mode"
            >
              <span className={`theme-toggle-track ${theme}`}>
                <Sun className="theme-icon sun" size={13} />
                <Moon className="theme-icon moon" size={13} />
                <span className="theme-toggle-thumb">
                  {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Panel Grid */}
      {!showAdminDashboard && (
      <div className={`dashboard-grid ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        
        {/* Left Side Panel: Database Manager */}
        <aside className="db-sidebar">
          <div>
            <h2 className="section-title">
              <Database size={18} className="logo-icon" />
              Mock Database Editor
            </h2>
            <p className="section-subtitle">
              Modify medicine stock quantities in real-time to watch the multi-agent workflow dynamically adapt.
            </p>
          </div>

          {/* Database Editor Controls */}
          <div className="db-card">
            <h3 className="med-brand-name" style={{ marginBottom: "0.25rem" }}>Select Medication</h3>
            <select
              className="pharmacy-inventory-select"
              value={selectedMedId}
              onChange={(e) => setSelectedMedId(e.target.value)}
            >
              {medicines.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.brandName} ({med.genericName})
                </option>
              ))}
            </select>

            <div className="stock-manager-list" style={{ marginTop: "1rem" }}>
              <h4 style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Pharmacy Stocks
              </h4>
              {pharmacies.map((pharm) => {
                const stock = inventory[pharm.id]?.[selectedMedId] || 0;
                return (
                  <div key={pharm.id} className="stock-item">
                    <span className="stock-name" title={pharm.name}>
                      {pharm.name.replace(" Pharmacy", "")}
                    </span>
                    <div className="stock-actions">
                      <button
                        className="btn-stock"
                        onClick={() => handleUpdateStock(pharm.id, selectedMedId, -5)}
                        disabled={stock <= 0}
                      >
                        <Minus size={12} />
                      </button>
                      <span className={`stock-val ${stock > 0 ? "in-stock" : "out-of-stock"}`}>
                        {stock}
                      </span>
                      <button
                        className="btn-stock"
                        onClick={() => handleUpdateStock(pharm.id, selectedMedId, 5)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Refill Subscriptions */}
          <div className="db-card">
            <h2 className="section-title" style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              <BellRing size={14} className="logo-icon" />
              Active Alert Watches ({subscriptions.length})
            </h2>
            <div className="active-subscriptions-panel">
              {subscriptions.length === 0 ? (
                <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", fontStyle: "italic" }}>
                  No active alert monitors.
                </p>
              ) : (
                subscriptions.map((sub) => (
                  <div key={sub.id} className="subscription-pill-item">
                    <div className="sub-details">
                      <span className="sub-med">{sub.brandName}</span>
                      <span className="sub-contact">{sub.contact} ({sub.channel})</span>
                    </div>
                    <button
                      className="btn-delete-sub"
                      onClick={() => handleDeleteSubscription(sub.id)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Triggered Alert Logs */}
          <div className="db-card" style={{ flex: 1, minHeight: "150px", display: "flex", flexDirection: "column" }}>
            <h2 className="section-title" style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              <Activity size={14} className="logo-icon" />
              Alert Logs
            </h2>
            <div className="triggered-alerts-panel" style={{ overflowY: "auto", flex: 1 }}>
              {triggeredAlerts.length === 0 ? (
                <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", fontStyle: "italic" }}>
                  No notifications sent yet.
                </p>
              ) : (
                triggeredAlerts.map((alert) => (
                  <div key={alert.id} className="triggered-alert-card">
                    <span className="triggered-alert-time">{alert.timestamp} - Dispatched via {alert.channel}</span>
                    <p className="triggered-alert-text">{alert.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Right Side: Main Workspace Area */}
        <main className="main-workspace">

          {!activeSearch ? (
            /* ============ HOME / HERO PAGE ============ */
            <div key="home" className="hero-landing page-transition">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>AI-Powered Multi-Agent Pharmacy Network</span>
              </div>
              <h1 className="hero-title">
                Find your medication, <span className="hero-title-accent">instantly</span>
              </h1>
              <p className="hero-subtitle">
                MediLink AI orchestrates search, pharmacy lookup, alternative suggestions and
                restock alerts in real time across every connected pharmacy.
              </p>

              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-value">{medicines.length}</span>
                  <span className="hero-stat-label">Medicines Tracked</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">{pharmacies.length}</span>
                  <span className="hero-stat-label">Partner Pharmacies</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">4</span>
                  <span className="hero-stat-label">AI Agents</span>
                </div>
              </div>

              <form onSubmit={handleSearchSubmit} className="search-form hero-search-form">
                <input
                  type="text"
                  placeholder="Search medication name (e.g., paracetemol, advil, amoxacilin...)"
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isRunning}
                />
                <Search className="search-input-icon" size={22} />
                <button type="submit" className="btn-search" disabled={isRunning || !query.trim()}>
                  {isRunning ? (
                    <>
                      <RefreshCw className="loading-dots animate-spin" size={16} />
                      <span>Searching</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Find Stock</span>
                    </>
                  )}
                </button>
              </form>

              {/* spelling suggestion indicators */}
              <div className="search-suggestions">
                <span>Try:</span>
                <button className="suggestion-pill" onClick={() => handleSuggestionClick("paracetemol")}>
                  "paracetemol" (typo)
                </button>
                <button className="suggestion-pill" onClick={() => handleSuggestionClick("ibuprufen")}>
                  "ibuprufen" (typo)
                </button>
                <button className="suggestion-pill" onClick={() => handleSuggestionClick("Amoxil")}>
                  "Amoxil" (exact)
                </button>
                <button className="suggestion-pill" onClick={() => handleSuggestionClick("amoxacilin")}>
                  "amoxacilin" (out of stock)
                </button>
              </div>
            </div>
          ) : (
          /* ============ RESULTS PAGE ============ */
          <div key="results" className="results-page page-transition">
            <div className="results-page-topbar">
              <button
                type="button"
                className="btn-back"
                onClick={() => {
                  setActiveSearch("");
                  setQuery("");
                }}
              >
                <ArrowLeft size={16} />
                <span>New Search</span>
              </button>
              <form onSubmit={handleSearchSubmit} className="search-form compact-search-form">
                <input
                  type="text"
                  placeholder="Search another medication..."
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isRunning}
                />
                <Search className="search-input-icon" size={18} />
                <button type="submit" className="btn-search" disabled={isRunning || !query.trim()}>
                  {isRunning ? (
                    <>
                      <RefreshCw className="loading-dots animate-spin" size={14} />
                      <span>Searching</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Find Stock</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          {/* Central Grid Panels */}
          <div className="dashboard-panels">

            {/* Left Box: Active Agent Activities Logs */}
            <section className="agent-workflow-card">
              <h2 className="section-title">
                <Activity size={18} className="logo-icon" />
                Multi-Agent Activity Board
              </h2>
              
              <div className="workflow-timeline">
                <div className="workflow-line"></div>

                {Object.entries(workflowManager.agents).map(([key, agent], nodeIdx) => {
                  const status = agentStatuses[key];
                  const logs = agentLogs[key];
                  const thoughts = agentResults[key]?.thoughts || [];
                  const isExpanded = expandedLogs[key];

                  return (
                    <div
                      key={key}
                      className={`workflow-node ${status} stagger-item`}
                      style={{ "--i": nodeIdx }}
                    >
                      <div className="node-icon-wrapper">
                        {getAgentIcon(agent.icon)}
                      </div>
                      
                      <div className="node-content">
                        <div className="node-header">
                          <span className="node-title">{agent.name}</span>
                          <span className={`node-status-badge ${status}`}>
                            {status === "running" ? (
                              <span className="loading-dots">
                                running<span>.</span><span>.</span><span>.</span>
                              </span>
                            ) : (
                              status
                            )}
                          </span>
                        </div>
                        <p className="node-desc">{agent.role}</p>

                        {/* Collapsible log output area */}
                        {(logs.length > 0 || status === "running") && (
                          <div className="agent-logs-accordion">
                            <button
                              type="button"
                              className="logs-header-btn"
                              onClick={() => setExpandedLogs(prev => ({ ...prev, [key]: !prev[key] }))}
                            >
                              <span>{isExpanded ? "[Hide System Console]" : `[Show Console Logs (${logs.length})]`}</span>
                              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>

                            {isExpanded && (
                              <>
                                <div className="logs-body">
                                  {logs.map((log, index) => (
                                    <div key={index} className={`log-entry ${log.type}`}>
                                      <span className="log-time">[{log.timestamp}]</span>
                                      <span className="log-text">{log.text}</span>
                                    </div>
                                  ))}
                                  {status === "running" && (
                                    <div className="log-entry info">
                                      <span className="log-time">[{new Date().toLocaleTimeString()}]</span>
                                      <span className="log-text animate-pulse">Awaiting sub-agent pipeline parameters...</span>
                                    </div>
                                  )}
                                </div>
                                {thoughts.length > 0 && (
                                  <div className="agent-thoughts">
                                    <span className="agent-thoughts-title">Agent Thought Chain</span>
                                    {thoughts.map((thought, index) => (
                                      <span key={index} className="agent-thought-item">{thought}</span>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Right Box: Search Results Screen */}
            <section className="results-card">
              {!activeSearch ? (
                /* Unsearched initial screen state */
                <div className="results-placeholder">
                  <MapPin className="results-placeholder-icon" />
                  <h3 className="results-placeholder-title">Awaiting Search Request</h3>
                  <p className="results-placeholder-text">
                    Enter a medication name or click one of the quick suggestions above to trigger the multi-agent search workflow.
                  </p>
                </div>
              ) : (
                /* Active query results state */
                <>
                  <h2 className="section-title">
                    <Sparkles size={18} className="logo-icon" />
                    Query Results Panel
                  </h2>

                  {/* 1. Medicine Name Identified Details */}
                  {agentResults.search && agentResults.search.success && (
                    <div className="search-summary-bar results-fade-in">
                      <div className="med-meta">
                        <span className="med-meta-class">{agentResults.search.data.class}</span>
                        <h3 className="med-meta-title">
                          {agentResults.search.data.brandName}
                          <span style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", fontWeight: "normal" }}>
                            ({agentResults.search.data.genericName})
                          </span>
                        </h3>
                        <p className="med-meta-desc">{agentResults.search.data.description}</p>
                      </div>

                      {/* Spell correction alert if query didn't match exactly */}
                      {agentResults.search.data.matchedTerm !== activeSearch.toLowerCase() && (
                        <div className="med-meta-spell">
                          <AlertTriangle size={14} />
                          <span>Spelling corrected from "{activeSearch}"</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Search failed block */}
                  {agentResults.search && !agentResults.search.success && (
                    <div className="results-placeholder" style={{ minHeight: "200px" }}>
                      <XCircle size={36} color="hsl(var(--danger))" />
                      <h3 className="results-placeholder-title" style={{ color: "hsl(var(--danger))" }}>Medication Not Found</h3>
                      <p className="results-placeholder-text">
                        The search agent could not resolve "{activeSearch}". Try typing a different medicine or checking spelling.
                      </p>
                    </div>
                  )}

                  {/* 2. Pharmacy Stocks List */}
                  {agentResults.pharmacy && agentResults.pharmacy.success && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div className="pharmacy-results-header">
                        <span>Nearby Pharmacies Availability</span>
                        <div className="pharmacy-sort-toggle">
                          <button
                            type="button"
                            className={`sort-toggle-btn ${pharmacySortMode === "distance" ? "active" : ""}`}
                            onClick={() => setPharmacySortMode("distance")}
                          >
                            <MapPin size={12} />
                            Nearest
                          </button>
                          <button
                            type="button"
                            className={`sort-toggle-btn ${pharmacySortMode === "price" ? "active" : ""}`}
                            onClick={() => setPharmacySortMode("price")}
                          >
                            <IndianRupee size={12} />
                            Cheapest
                          </button>
                        </div>
                      </div>

                      <div className="pharmacy-list-grid">
                        {[...agentResults.pharmacy.data.results]
                          .sort((a, b) => {
                            if (pharmacySortMode === "price") {
                              // In-stock results first (sorted cheapest-first), out-of-stock pushed to the bottom
                              if (a.stock > 0 && b.stock === 0) return -1;
                              if (a.stock === 0 && b.stock > 0) return 1;
                              if (a.stock > 0 && b.stock > 0) return a.price - b.price;
                              return a.distance - b.distance;
                            }
                            return a.distance - b.distance;
                          })
                          .map((pharm, pharmIdx) => {
                            const isBestPrice =
                              pharm.stock > 0 &&
                              agentResults.pharmacy.data.cheapestPrice != null &&
                              pharm.price === agentResults.pharmacy.data.cheapestPrice;

                            return (
                              <div
                                key={pharm.pharmacyId}
                                className="pharmacy-card stagger-item"
                                style={{ "--i": pharmIdx }}
                              >
                                <div className="pharm-details">
                                  <span className="pharm-name">
                                    {pharm.name}
                                    {isBestPrice && (
                                      <span className="badge-best-price">
                                        <Tag size={10} />
                                        Best Price
                                      </span>
                                    )}
                                  </span>
                                  <span className="pharm-address">{pharm.address}</span>
                                  <div className="pharm-meta-row">
                                    <span className="pharm-distance">
                                      <MapPin size={12} />
                                      {pharm.distance} mi
                                    </span>
                                    <span className="pharm-phone">{pharm.phone}</span>
                                  </div>
                                </div>

                                <div className="pharm-status">
                                  <span className={`badge-stock ${pharm.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                                    {pharm.stock > 0 ? (
                                      <>
                                        <CheckCircle size={12} />
                                        In Stock
                                      </>
                                    ) : (
                                      <>
                                        <XCircle size={12} />
                                        Out of Stock
                                      </>
                                    )}
                                  </span>
                                  {pharm.price != null && (
                                    <span className={`pharm-price ${isBestPrice ? "best-price" : ""}`}>
                                      <IndianRupee size={12} />
                                      {pharm.price}
                                    </span>
                                  )}
                                  <span className="stock-count-label">
                                    {pharm.stock} units available
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* 3. Alternative Medicine Suggestions */}
                  {agentResults.alternative && agentResults.alternative.triggered && (
                    <div className="alternatives-container results-fade-in">
                      <h4 className="alternatives-title">
                        <ShieldAlert size={16} />
                        Doctor-Approved Generic Equivalents
                      </h4>
                      <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))" }}>
                        Due to shortage of "{agentResults.search.data.brandName}", the alternative agent recommends:
                      </p>
                      
                      <div className="alternatives-suggestions-row">
                        {agentResults.alternative.data.suggestions.map((sug, idx) => (
                          <div key={idx} className="alternative-suggestion-card">
                            <Sparkles size={12} style={{ color: "hsl(var(--warning))" }} />
                            <span>{sug}</span>
                          </div>
                        ))}
                      </div>
                      
                      <p className="alternatives-disclaimer">
                        {agentResults.alternative.data.disclaimer}
                      </p>
                    </div>
                  )}

                  {/* 4. Restock Watchlist Signup Form */}
                  {agentResults.notification && agentResults.notification.triggered && (
                    <div className="notification-signup-container results-fade-in">
                      <h4 className="notification-title">
                        <BellRing size={16} />
                        Restock Alert Watchlist
                      </h4>
                      <p className="notification-desc">
                        Register to receive an instant message when "{agentResults.search.data.brandName}" is replenished at any nearest pharmacy location.
                      </p>

                      {hasSubscribed ? (
                        <div className="notification-success-alert">
                          <CheckCircle size={16} />
                          <span>Subscription Registered! We'll alert you via {subChannel} at "{subContact}". Try replenishing stock in the Database Panel.</span>
                        </div>
                      ) : (
                        <form onSubmit={handleSubscribe} className="notification-form">
                          <input
                            type="text"
                            placeholder="Email address or Phone number"
                            className="notification-input"
                            value={subContact}
                            onChange={(e) => setSubContact(e.target.value)}
                            required
                          />
                          <select
                            className="notification-input"
                            style={{ maxWidth: "90px", flex: "none" }}
                            value={subChannel}
                            onChange={(e) => setSubChannel(e.target.value)}
                          >
                            <option value="SMS">SMS</option>
                            <option value="Email">Email</option>
                          </select>
                          <button type="submit" className="btn-subscribe">
                            Activate Watch
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
          </div>
          )}
        </main>
      </div>
      )}

      {/* Admin Dashboard View */}
      {showAdminDashboard && (
        <AdminDashboard
          pharmacies={pharmacies}
          medicines={medicines}
          inventory={inventory}
          onUpdateStock={handleUpdateStock}
          onBack={() => setShowAdminDashboard(false)}
        />
      )}
    </div>
  );
}

export default App;

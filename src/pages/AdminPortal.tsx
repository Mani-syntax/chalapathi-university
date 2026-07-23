import React, { useState } from "react";
import { 
  Lock, FileSpreadsheet, Trash2, LogOut, Search, 
  User, Eye, EyeOff 
} from "lucide-react";

export default function AdminPortal() {
  // Authentication states (persisted in sessionStorage so reload maintains admin session)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("chalapathi_admin_authed") === "true";
  });
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  
  // Search & filter states
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const isUserValid = cleanUser === "chalapathiuniversity.edu.in" || cleanUser === "admin@chalapathiuniversity.edu.in" || cleanUser === "admin";
    const isPassValid = passcode === "chalapathi@12345" || passcode === "admin123" || passcode === "admin";
    
    if (isUserValid && isPassValid) {
      sessionStorage.setItem("chalapathi_admin_authed", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else if (!username.trim()) {
      setAuthError("Please enter your username.");
    } else if (!passcode) {
      setAuthError("Please enter your password.");
    } else {
      setAuthError("Invalid credentials! Please check your username and password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("chalapathi_admin_authed");
    setIsAuthenticated(false);
  };

  // Get active leads
  const getLeads = () => {
    const raw = localStorage.getItem("chalapathi_enquiry_leads");
    return raw ? JSON.parse(raw) : [];
  };

  const leads = getLeads();

  // Filtered leads based on search query
  const filteredLeads = leads.filter((lead: any) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      (lead.name || "").toLowerCase().includes(query) ||
      (lead.email || "").toLowerCase().includes(query) ||
      (lead.mobile || "").toLowerCase().includes(query) ||
      (lead.city || "").toLowerCase().includes(query) ||
      (lead.state || "").toLowerCase().includes(query) ||
      (lead.program || "").toLowerCase().includes(query)
    );
  });

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads available to export!");
      return;
    }
    const headers = ["ID", "Timestamp", "Form Type", "Name", "Mobile", "Email", "City", "State", "Qualification", "Year of Passing", "Program", "Query"];
    const csvRows = [headers.join(",")];
    filteredLeads.forEach((lead: any) => {
      const values = [
        lead.id || "",
        lead.timestamp || "",
        `"${(lead.formType || "Enquiry").replace(/"/g, '""')}"`,
        `"${(lead.name || "").replace(/"/g, '""')}"`,
        lead.mobile || "",
        lead.email || "",
        `"${(lead.city || "").replace(/"/g, '""')}"`,
        lead.state || "",
        lead.qualification || "",
        lead.yearOfPassing || "",
        `"${(lead.program || "").replace(/"/g, '""')}"`,
        `"${(lead.query || "").replace(/"/g, '""')}"`
      ];
      csvRows.push(values.join(","));
    });
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chalapathi_admissions_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all leads? This action cannot be undone.")) {
      localStorage.removeItem("chalapathi_enquiry_leads");
      window.location.reload();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center p-4 sm:p-6 font-[var(--font-poppins)]">
        <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 shadow-xl text-left">
          <div className="flex flex-col items-center justify-center mb-6">
            <img src="/logo.png?v=3" alt="Chalapathi University" className="h-14 w-auto object-contain mb-4" />
            <h2 className="text-xl font-extrabold text-[#071A3A] tracking-tight">Admin Portal Login</h2>
            <p className="text-xs text-gray-500 mt-1 font-medium text-center">Enter credentials to manage enquiry leads</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#071A3A] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#071A3A] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none cursor-pointer border-none bg-transparent"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-[11px] font-bold text-rose-600 text-center bg-rose-50 border border-rose-100 p-2.5 rounded-xl">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full h-11 bg-[#072A6C] hover:bg-[#051c4a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-4 sm:p-6 lg:p-8 font-[var(--font-poppins)] text-slate-800 text-left">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo.png?v=3" alt="Chalapathi University" className="h-12 w-auto object-contain" />
            <div className="border-l border-gray-200 pl-4">
              <h1 className="text-lg font-black text-[#072A6C] uppercase tracking-wide">Admissions Lead Manager</h1>
              <p className="text-[11px] text-gray-400 font-bold uppercase mt-0.5">Real-time Campaign & Form Submissions</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="h-10 px-5 bg-white hover:bg-rose-50 border border-gray-200 text-rose-600 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Total Submissions Collected</span>
            <span className="text-3xl font-black text-[#072A6C] mt-2 block">{leads.length}</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Filtered Results</span>
            <span className="text-3xl font-black text-[#D4AF37] mt-2 block">{filteredLeads.length}</span>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search leads by name, email, mobile, city, or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#072A6C] transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={handleClearAll}
                className="h-11 px-5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Clear Submissions</span>
              </button>
              <button 
                onClick={handleExportCSV}
                className="h-11 px-6 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer border-none"
              >
                <FileSpreadsheet size={15} />
                <span>Download CSV Report</span>
              </button>
            </div>

          </div>

          {/* Table Container */}
          <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-3xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-gray-200 text-[10px] text-gray-400 uppercase tracking-wider bg-gray-50/50">
                    <th className="py-4 px-5">Date & Time</th>
                    <th className="py-4 px-5">Form Source</th>
                    <th className="py-4 px-5">Student Name</th>
                    <th className="py-4 px-5">Contact Details</th>
                    <th className="py-4 px-5">Location</th>
                    <th className="py-4 px-5">Academic Info</th>
                    <th className="py-4 px-5">Interested Program</th>
                    <th className="py-4 px-5">Query / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-gray-400 font-light">
                        No admissions enquiry leads found. Fill any form on the site to capture data here!
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-5 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                          {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          }) : "N/A"}
                        </td>
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            lead.formType?.includes("Application") ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            {lead.formType || "Enquiry"}
                          </span>
                        </td>
                        <td className="py-4 px-5 font-bold text-gray-900">{lead.name}</td>
                        <td className="py-4 px-5 space-y-0.5">
                          <span className="block font-bold text-gray-800">{lead.mobile}</span>
                          <span className="block text-[10px] text-gray-400 font-semibold">{lead.email}</span>
                        </td>
                        <td className="py-4 px-5">
                          <span className="block text-gray-800 font-semibold">{lead.city || "-"}</span>
                          <span className="block text-[10px] text-gray-400 font-bold uppercase">{lead.state || "-"}</span>
                        </td>
                        <td className="py-4 px-5">
                          <span className="block text-gray-800 font-semibold">{lead.qualification || "-"}</span>
                          <span className="block text-[10px] text-gray-400 font-bold">{lead.yearOfPassing ? `Class of ${lead.yearOfPassing}` : "-"}</span>
                        </td>
                        <td className="py-4 px-5 font-extrabold text-blue-900">{lead.program}</td>
                        <td className="py-4 px-5 max-w-[240px] truncate text-gray-500 italic" title={lead.query}>
                          {lead.query || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

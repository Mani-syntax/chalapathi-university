import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, GraduationCap, Landmark, ChevronDown, FileText, CheckCircle2, Phone, Mail, MapPin, Calendar, BookOpen, Send, ShieldCheck } from "lucide-react";

export const INDIAN_STATES = [
  "Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", 
  "Delhi", "Kerala", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", 
  "Madhya Pradesh", "Other"
];

export const QUALIFICATIONS = [
  "Class 12 / Intermediate", "Graduation / Under Graduate", "Post Graduation", "Diploma", "Other"
];

export const YEARS_OF_PASSING = [
  "2030", "2029", "2028", "2027", "2026", "2025", "2024", "2023", "Before 2023"
];

export const ALL_PROGRAMS = [
  "B.Tech - Computer Science and Engineering",
  "B.Tech - CSE (Data Science)",
  "B.Tech - CSE (Artificial Intelligence)",
  "B.Tech - Artificial Intelligence & Machine Learning",
  "B.Tech - CSE (Cyber Security)",
  "M.Tech - Computer Science and Engineering",
  "M.Tech - CSE (AI & ML)",
  "MCA",
  "Ph.D - Computer Science and Engineering",
  "B.Tech - Electronics and Communication Engineering",
  "M.Tech - VLSI and Embedded Systems Design",
  "Ph.D - Electronics and Communication Engineering",
  "B.Tech - Civil Engineering",
  "M.Tech - Structural Engineering",
  "Ph.D - Structural Engineering",
  "MBA"
];

export const ENQUIRY_SCHOOLS_DATA = [
  {
    id: "computing",
    title: "SCHOOL OF COMPUTING SCIENCES",
    subtitle: "Engineering Minds for the Digital Future",
    groups: [
      {
        name: "Computer Science & Engineering",
        courses: [
          { level: "UG", name: "B.Tech - Computer Science and Engineering" },
          { level: "PG", name: "M.Tech - Computer Science and Engineering" },
          { level: "PG", name: "MCA" },
          { level: "Ph.D", name: "Ph.D - Computer Science and Engineering" }
        ]
      },
      {
        name: "Data Science",
        courses: [
          { level: "UG", name: "B.Tech - CSE (Data Science)" }
        ]
      },
      {
        name: "Artificial Intelligence",
        courses: [
          { level: "UG", name: "B.Tech - CSE (Artificial Intelligence)" },
          { level: "UG", name: "B.Tech - Artificial Intelligence & Machine Learning" },
          { level: "PG", name: "M.Tech - CSE (AI & ML)" }
        ]
      },
      {
        name: "Cyber Security",
        courses: [
          { level: "UG", name: "B.Tech - CSE (Cyber Security)" }
        ]
      }
    ]
  },
  {
    id: "engineering",
    title: "SCHOOL OF ENGINEERING",
    subtitle: "Engineering Solutions for a Smarter, Stronger Tomorrow",
    groups: [
      {
        name: "Electronics and Communication Engineering",
        courses: [
          { level: "UG", name: "B.Tech - Electronics and Communication Engineering" },
          { level: "PG", name: "M.Tech - VLSI and Embedded Systems Design" },
          { level: "Ph.D", name: "Ph.D - Electronics and Communication Engineering" }
        ]
      },
      {
        name: "Civil Engineering",
        courses: [
          { level: "UG", name: "B.Tech - Civil Engineering" },
          { level: "PG", name: "M.Tech - Structural Engineering" },
          { level: "Ph.D", name: "Ph.D - Structural Engineering" }
        ]
      }
    ]
  },
  {
    id: "business",
    title: "SCHOOL OF BUSINESS & MANAGEMENT",
    subtitle: "Shaping Visionary Leaders for Tomorrow's Business World",
    groups: [
      {
        name: "Business and Management",
        courses: [
          { level: "PG", name: "MBA" }
        ]
      }
    ]
  }
];

export function EnquiryFormContent({ onClose }: { onClose?: () => void }) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("computing");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    qualification: "",
    yearOfPassing: "",
    program: "",
    query: ""
  });

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      formType: "Admission Enquiry",
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      state: formData.state,
      qualification: formData.qualification,
      yearOfPassing: formData.yearOfPassing,
      program: formData.program,
      query: formData.query
    };
    const existingLeads = JSON.parse(localStorage.getItem("chalapathi_enquiry_leads") || "[]");
    localStorage.setItem("chalapathi_enquiry_leads", JSON.stringify([newLead, ...existingLeads]));
    setFormSubmitted(true);
  };

  return (
    <div className="bg-white w-full max-w-[1240px] rounded-[24px] shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-gray-100 font-[var(--font-poppins)] text-left select-none">
      {/* Left Panel: Schools & Programs */}
      <div className="w-full md:w-1/2 p-5 md:p-6 border-r border-gray-100 flex flex-col bg-slate-50/30 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 mt-2">
          <img 
            src="/logo.png?v=3" 
            alt="Chalapathi University" 
            className="h-16 md:h-20 w-auto object-contain" 
          />
        </div>

        <h3 className="text-[12px] font-black uppercase text-[#072A6C] tracking-wide mb-0.5">
          EXPLORE OUR SCHOOLS & PROGRAMS
        </h3>
        <p className="text-[10px] text-gray-400 font-medium mb-4">
          Select a school to view its programs
        </p>

        {/* Accordions */}
        <div className="space-y-2.5">
          {ENQUIRY_SCHOOLS_DATA.map((school) => {
            const isOpen = activeAccordion === school.id;
            return (
              <div key={school.id} className="border border-gray-150 rounded-[12px] bg-white overflow-hidden shadow-sm transition-all duration-300">
                {/* Accordion Head */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(school.id)}
                  className={`w-full flex items-center justify-between py-2.5 px-4 transition-all duration-300 text-left outline-none cursor-pointer ${
                    isOpen ? "bg-[#072A6C] text-white" : "bg-white text-[#072A6C] hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {school.id === "computing" && <User size={16} />}
                    {school.id === "engineering" && <GraduationCap size={16} />}
                    {school.id === "business" && <Landmark size={16} />}
                    <div className="flex flex-col">
                      <span className="text-[10.5px] md:text-[11.5px] font-extrabold uppercase tracking-wider">{school.title}</span>
                      <span className={`text-[8.5px] md:text-[9.5px] ${isOpen ? "text-blue-100" : "text-gray-400"} mt-0.5`}>{school.subtitle}</span>
                    </div>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="p-3.5 bg-white border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                    {school.groups.map((group, groupIdx) => (
                      <div key={groupIdx} className="space-y-2.5">
                        <h4 className="text-[10.5px] font-extrabold text-[#072A6C] border-b border-gray-100 pb-1">{group.name}</h4>
                        <div className="flex flex-col gap-1.5">
                          {group.courses.map((course, courseIdx) => {
                            let badgeColor = "bg-blue-50 text-blue-600 border-blue-100/50";
                            if (course.level === "PG") badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100/50";
                            if (course.level === "Ph.D") badgeColor = "bg-amber-50 text-amber-600 border-amber-100/50";
                            return (
                              <button
                                key={courseIdx}
                                type="button"
                                onClick={() => setFormData({ ...formData, program: course.name })}
                                className={`flex items-start gap-2 py-1 px-2 rounded-md border border-transparent hover:border-blue-100 hover:bg-blue-50/30 text-left transition-all duration-200 cursor-pointer ${
                                  formData.program === course.name ? "bg-blue-50/55 border-blue-200" : ""
                                }`}
                              >
                                <span className={`px-1.5 py-0.5 rounded text-[7.5px] font-black uppercase tracking-wider border shrink-0 ${badgeColor}`}>
                                  {course.level}
                                </span>
                                <span className="text-[9.5px] text-gray-700 font-bold leading-tight hover:text-blue-600">
                                  {course.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Enquiry Form */}
      <div className="w-full md:w-1/2 p-5 md:p-6 flex flex-col bg-white relative overflow-y-auto">
        <div className="mb-3.5">
          <h2 className="text-[18px] font-black text-[#072A6C] tracking-tight uppercase leading-none">
            ADMISSIONS OPEN 2026-27
          </h2>
          <p className="text-[10.5px] text-gray-500 font-medium mt-1">
            Build Your Future. Lead with Innovation.
          </p>
        </div>

        {/* Form Title Card */}
        <div className="bg-[#072A6C]/3 border border-[#072A6C]/10 rounded-xl p-3 flex items-center gap-3 mb-4">
          <div className="w-8.5 h-8.5 rounded-lg bg-[#072A6C]/10 flex items-center justify-center text-[#072A6C] shrink-0">
            <FileText size={16} />
          </div>
          <div className="text-left">
            <h4 className="text-[10.5px] font-black text-[#072A6C] uppercase tracking-wider leading-none mb-1">ENQUIRY FORM</h4>
            <p className="text-[9.5px] text-gray-500 font-medium leading-none">Fill in your details. Our admission team will contact you soon.</p>
          </div>
        </div>

        {formSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 my-auto">
            <CheckCircle2 size={56} className="text-emerald-500 animate-bounce" />
            <h4 className="text-base font-extrabold text-[#072A6C]">Enquiry Submitted Successfully!</h4>
            <p className="text-xs text-gray-500 text-center max-w-[340px]">Our admissions helpdesk representative will contact you on your registered mobile number shortly.</p>
            {onClose && (
              <button 
                onClick={onClose}
                className="h-10 px-6 bg-[#072A6C] hover:bg-[#051c4a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close Window
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-[var(--font-poppins)]">
            <div className="space-y-3">
              {/* Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Mobile Number *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="tel" 
                      required
                      pattern="[0-9]{10}"
                      placeholder="Enter 10-digit phone number"
                      value={formData.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10) {
                          setFormData({ ...formData, mobile: val });
                        }
                      }}
                      maxLength={10}
                      className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222]"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Email Address *</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222]"
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">City *</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">State *</label>
                  <div className="relative">
                    <Landmark size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222] bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select your state</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Qualification & Year of Passing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Qualification *</label>
                  <div className="relative">
                    <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222] bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select qualification</option>
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Year of Passing *</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      required
                      value={formData.yearOfPassing}
                      onChange={(e) => setFormData({ ...formData, yearOfPassing: e.target.value })}
                      className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222] bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select year</option>
                      {YEARS_OF_PASSING.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Interested Program */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Interested Program *</label>
                <div className="relative">
                  <BookOpen size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222] bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select a program (Auto-filled)</option>
                    {ALL_PROGRAMS.map((prog) => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Any Query */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Any Query (Optional)</label>
                <div className="relative">
                  <textarea 
                    placeholder="Write your message..."
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    rows={2}
                    className="w-full pl-4 pr-3 py-2 border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold text-[#222222] resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {/* Apply Enquiry Button */}
              <button
                type="submit"
                className="w-full h-11 bg-[#FAB005] hover:bg-[#e09e00] text-gray-900 font-extrabold text-[12px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer outline-none border-none"
              >
                <Send size={13} className="rotate-45 -translate-y-0.5" />
                <span>APPLY ENQUIRY</span>
              </button>

              {/* Privacy */}
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-400 font-semibold">
                <ShieldCheck size={12} className="text-gray-400" />
                <span>Your information is safe with us. We respect your <Link to="/privacy-policy" onClick={onClose} className="text-blue-500 hover:underline">privacy</Link>.</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

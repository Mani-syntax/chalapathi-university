import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, ChevronDown, ChevronRight, ArrowRight, Megaphone, Search,
  GraduationCap, Code, Laptop, Cpu, Brain, Database, ShieldAlert, Radio, 
  CircuitBoard, Building, Hammer, Briefcase, Pill, UserPlus, FileSignature, 
  CreditCard, Award, Compass, Home as HomeIcon, BookOpen, Trophy, Bus, 
  Users, Tv, FlaskConical, TrendingUp, Building2, Lightbulb, 
  Info, History, Target, FileText, Globe, CalendarDays, CheckSquare
} from "lucide-react";
import { useData } from "../../context/DataContext";
import { searchIndex, SearchItem } from "../../data/searchIndex";
import { GlobalSearchModal } from "../common/GlobalSearchModal";

const SearchIconMap: Record<string, React.ComponentType<any>> = {
  GraduationCap, Code, Laptop, Cpu, Brain, Database, ShieldAlert, Radio, 
  CircuitBoard, Building, Hammer, Briefcase, Pill, UserPlus, FileSignature, 
  CreditCard, Award, Compass, Home: HomeIcon, BookOpen, Trophy, Bus, 
  Users, Tv, FlaskConical, TrendingUp, Building2, Search, Lightbulb, 
  Megaphone, Calendar: CalendarDays, MapPin: Info, Info, History, Target, FileText, Globe, 
  CalendarDays, CheckSquare
};


export const ACADEMIC_PROGRAMS_STRUCTURE: Record<string, Record<string, { label: string; to: string }[]>> = {
  "School of Computing Sciences": {
    "Computer Science & Engineering": [
      { label: "B.Tech. Computer Science & Engineering", to: "/academics/btech-cse" },
      { label: "M.Tech. Computer Science & Engineering", to: "/academics/mtech-cse" },
      { label: "MCA", to: "/academics/mca" },
      { label: "Ph.D. Computer Science & Engineering", to: "/academics/phd-cse" }
    ],
    "Artificial Intelligence": [
      { label: "B.Tech. CSE (Artificial Intelligence)", to: "/academics/btech-cse-ai-ml" },
      { label: "B.Tech. Artificial Intelligence & Machine Learning", to: "/academics/btech-aiml" },
      { label: "M.Tech. CSE (AI & ML)", to: "/academics/mtech-aiml" }
    ],
    "Data Science": [
      { label: "B.Tech. CSE (Data Science)", to: "/academics/btech-cse-data-science" }
    ],
    "Cyber Security": [
      { label: "B.Tech. CSE (Cyber Security)", to: "/academics/btech-cse-cyber-security" }
    ]
  },
  "School of Engineering": {
    "Electronics and Communication Engineering": [
      { label: "B.Tech. Electronics and Communication Engineering", to: "/academics/btech-ece" },
      { label: "M.Tech. VLSI and Embedded Systems Design", to: "/academics/mtech-vlsi" },
      { label: "Ph.D. Electronics and Communication Engineering", to: "/academics/phd-ece" }
    ],
    "Civil Engineering": [
      { label: "B.Tech. Civil Engineering", to: "/academics/btech-civil" },
      { label: "M.Tech. Structural Engineering", to: "/academics/mtech-structural" },
      { label: "Ph.D. Structural Engineering", to: "/academics/phd-structural" }
    ]
  },
  "School of Business & Management": {
    "Business and Management": [
      { label: "MBA", to: "/academics/mba" }
    ]
  }
};

const CATEGORY_INFO: Record<string, { desc: string; linkText: string; to: string; title: string }> = {
  "Academic Calendar": {
    title: "Academic Calendar",
    desc: "Plan your semester ahead. View critical academic timelines, examination blocks, holidays, and key milestones.",
    linkText: "View Calendar",
    to: "/academics/calendar"
  },
  "Flexibilities": {
    title: "Academic Flexibilities",
    desc: "Customize your learning path. Explore options for minor specializations, honors tracks, and flexible credit transfers.",
    linkText: "Explore Flexibilities",
    to: "/academics/flexibilities"
  },
  "Grading System": {
    title: "Grading System",
    desc: "Understand evaluation metrics. Access information about CGPA/SGPA calculation, credit weightages, and passing criteria.",
    linkText: "View Grading Policy",
    to: "/academics/grading"
  },
  "Award of Degrees": {
    title: "Award of Degrees",
    desc: "Graduation and compliance. Check eligibility criteria for degree awards, convocation schedules, and transcript requests.",
    linkText: "Read Degree Guidelines",
    to: "/academics/degrees"
  },
  "Rules & Regulations": {
    title: "Rules & Regulations",
    desc: "Campus compliance. Learn about attendance requirements, credit minimums, and code of conduct.",
    linkText: "Read Rules Handbook",
    to: "/academics/rules"
  },
  "Teaching & Evaluation": {
    title: "Teaching & Evaluation",
    desc: "Outcome-Based Education. Discover our pedagogy, continuous internal assessment schemes, and evaluation standards.",
    linkText: "View Teaching & Evaluation",
    to: "/academics/teaching"
  },
  "Global Certifications": {
    title: "Global Certifications",
    desc: "Graduate with internationally respected certifications that complement your academic degree and prepare you for leadership.",
    linkText: "View Certifications",
    to: "/academics/certifications"
  }
};

export default function Header({ onToggleAi }: { onToggleAi?: () => void } = {}) {
  const { announcements, showAnnouncementsDrawer, setShowAnnouncementsDrawer } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);
  const [mobileProgrammesOpen, setMobileProgrammesOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [mobileManagementOpen, setMobileManagementOpen] = useState(false);
  const [campusLifeOpen, setCampusLifeOpen] = useState(false);
  const [mobileCampusLifeOpen, setMobileCampusLifeOpen] = useState(false);
  const [newsEventsOpen, setNewsEventsOpen] = useState(false);
  const [mobileNewsEventsOpen, setMobileNewsEventsOpen] = useState(false);
  const [activeSchool, setActiveSchool] = useState("School of Computing Sciences");
  const [hoveredCategory, setHoveredCategory] = useState("Programmes Offered");
  
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(-1);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setActiveSuggestionIdx(-1);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const queryTokens = query.split(/\s+/).filter(Boolean);
    
    const matches = searchIndex.map(item => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      
      queryTokens.forEach(token => {
        // Exact start match on title
        if (titleLower.startsWith(token)) score += 12;
        else if (titleLower.includes(token)) score += 6;
        
        // Exact category match
        if (item.category.toLowerCase().includes(token)) score += 3;
        
        // Keyword matches (supporting fuzzy prefix/suffix containment)
        item.keywords.forEach(keyword => {
          if (keyword === token) score += 10;
          else if (keyword.startsWith(token) || token.startsWith(keyword)) score += 6;
          else if (keyword.includes(token) || token.includes(keyword)) score += 4;
        });
      });
      
      return { item, score };
    })
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(m => m.item);
    
    setSuggestions(matches.slice(0, 6));
    setActiveSuggestionIdx(-1);
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      // Autofocus search input when opened
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [searchOpen]);

  const handleSearchSubmit = () => {
    const targetItem = activeSuggestionIdx >= 0 && activeSuggestionIdx < suggestions.length
      ? suggestions[activeSuggestionIdx]
      : suggestions[0];
      
    if (targetItem) {
      navigate(targetItem.to);
      setSearchQuery("");
      setSearchOpen(false);
      setSuggestions([]);
    } else if (searchQuery.trim()) {
      // Fallback exact-match redirects
      const q = searchQuery.toLowerCase().trim();
      if (q.includes("computer") || q.includes("cse") || q.includes("software") || q.includes("b.tech")) {
        navigate("/academics/btech-cse");
      } else if (q.includes("ai") || q.includes("ml") || q.includes("aiml")) {
        navigate("/academics/btech-cse-ai-ml");
      } else if (q.includes("fee") || q.includes("cost") || q.includes("tuition")) {
        navigate("/admissions/fees");
      } else if (q.includes("apply") || q.includes("admissions")) {
        navigate("/admissions/apply");
      } else {
        navigate("/academics");
      }
      setSearchQuery("");
      setSearchOpen(false);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIdx(prev => (prev + 1) % Math.max(1, suggestions.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIdx(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Escape") {
      setSearchOpen(false);
      setSuggestions([]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileAcademicsOpen(false);
    setMobileManagementOpen(false);
    setMobileProgrammesOpen(false);
    setMobileAboutOpen(false);
    setMobileCampusLifeOpen(false);
    setMobileNewsEventsOpen(false);
  }, [location.pathname]);

  const handleAboutUsClick = () => {
    if (location.pathname === "/") {
      document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#about-us");
      setTimeout(() => {
        document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleAcademicsClick = () => {
    if (location.pathname === "/") {
      document.getElementById("academics")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#academics");
      setTimeout(() => {
        document.getElementById("academics")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const navLinks = [
    "About Us", "Academics", "Admissions", "Contact Us",
  ];

  const navHrefs: Record<string, string> = {
    "About Us": "/#about-us",
    "Academics": "/#academics",
    "Admissions": "/#enquiry-form",
    "Contact Us": "/contact",
  };

  const academicsItems = [
    { label: "Programmes Offered", to: "/academics/programmes" },
    { label: "Global Certifications", to: "/academics/certifications" },
    { label: "Academic Calendar", to: "/academics/calendar" },
    { label: "Flexibilities", to: "/academics/flexibilities" },
    { label: "Grading System", to: "/academics/grading" },
    { label: "Award of Degrees", to: "/academics/degrees" },
    { label: "Rules & Regulations", to: "/academics/rules" },
    { label: "Teaching & Evaluation", to: "/academics/teaching" }
  ];

  const managementItems = [
    { label: "Board Members", to: "/management/board-members" },
    { 
      label: "Faculty", 
      to: "#",
      submenu: [
        { label: "School of Computing Sciences", to: "/management/faculty/computing" },
        { label: "School of Engineering", to: "/management/faculty/engineering" },
        { label: "School of Business & Management", to: "/management/faculty/business" }
      ]
    }
  ];

  const campusLifeItems = [
    { label: "Campus Overview", to: "/campus-life" },
    { label: "Central Library", to: "/campus-life/library" },
    { label: "Smart Classrooms", to: "/campus-life/smart-classrooms" },
    { label: "Laboratories", to: "/campus-life/laboratories" },
    { label: "Hostel Facilities", to: "/campus-life/hostels" },
    { label: "Sports & Fitness", to: "/campus-life/sports" },
    { label: "Cafeteria", to: "/campus-life/cafeteria" },
    { label: "Transportation", to: "/campus-life/transportation" },
    { label: "Wi-Fi Campus", to: "/campus-life/wifi" },
    { label: "Health Centre", to: "/campus-life/health-centre" },
    { label: "Student Clubs", to: "/campus-life/clubs" },
    { label: "Events & Festivals", to: "/campus-life/events" },
    { label: "Innovation Hub", to: "/campus-life/innovation-hub" },
    { label: "Campus Safety", to: "/campus-life/safety" },
    { label: "NSS & NCC", to: "/campus-life/nss-ncc" },
    { label: "Grievance Cell", to: "/campus-life/grievance-cell" }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        } h-[96px] md:h-[104px]`}
        style={{ borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="max-w-[1440px] mx-auto h-full px-6 md:px-10 flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 py-1">
            <img
              src="/logo.png?v=3"
              alt="Chalapathi University"
              className="h-14 md:h-16 lg:h-[68px] w-auto object-contain no-lift transition-all duration-300"
            />
          </Link>

          {/* Center nav */}
          <nav className="hidden min-[1024px]:flex items-center justify-center gap-7 min-[1280px]:gap-12 h-full">
            {navLinks.map((name) => {
              if (name === "About Us") {
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={handleAboutUsClick}
                    className="px-2 py-1 text-[16px] min-[1280px]:text-[17px] font-[650] text-[#072A6C] hover:text-[#D4AF37] transition-colors whitespace-nowrap font-[var(--font-poppins)] cursor-pointer outline-none"
                  >
                    {name}
                  </button>
                );
              }

              if (name === "Academics") {
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={handleAcademicsClick}
                    className="px-2 py-1 text-[16px] min-[1280px]:text-[17px] font-[650] text-[#072A6C] hover:text-[#D4AF37] transition-colors whitespace-nowrap font-[var(--font-poppins)] cursor-pointer outline-none"
                  >
                    {name}
                  </button>
                );
              }

              return (
                <Link
                  key={name}
                  to={navHrefs[name]}
                  className="px-2 py-1 text-[16px] min-[1280px]:text-[17px] font-[650] text-[#072A6C] hover:text-[#D4AF37] transition-colors whitespace-nowrap font-[var(--font-poppins)]"
                >
                  {name}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden min-[1024px]:flex items-center shrink-0">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
              className="h-11 px-7 text-sm md:text-base bg-[#D4AF37] hover:bg-[#C9A84C] text-white font-extrabold rounded-full inline-flex items-center justify-center transition-all shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] font-[var(--font-poppins)] whitespace-nowrap cursor-pointer"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex min-[1024px]:hidden items-center gap-1">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-[#222222] hover:text-[#D4AF37] transition-colors">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div ref={searchContainerRef} className="absolute top-full left-0 w-full bg-[#072A6C] p-4 shadow-xl z-50 animate-slide-down">
            <div className="max-w-2xl mx-auto relative flex flex-col gap-2">
              <div className="flex gap-2 w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search programs, departments, hostels, faculty, NIRF..."
                  className="flex-1 bg-white/10 text-white border border-white/20 rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] placeholder:text-white/50 font-[var(--font-poppins)]"
                />
                <button 
                  onClick={handleSearchSubmit}
                  className="bg-[#D4AF37] text-white font-bold px-6 py-2.5 rounded-[12px] text-sm hover:bg-[#C9A84C] transition-colors font-[var(--font-poppins)]"
                >
                  Search
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-[16px] shadow-2xl border border-gray-100 overflow-hidden z-50 font-[var(--font-poppins)] text-left">
                  <div className="px-4 py-2 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Suggestions</span>
                    <span className="text-[9px] text-gray-400">Use arrow keys ↑↓ to navigate</span>
                  </div>
                  <div className="flex flex-col">
                    {suggestions.map((item, idx) => {
                      const IconComponent = SearchIconMap[item.icon] || GraduationCap;
                      const isActive = idx === activeSuggestionIdx;
                      return (
                        <div
                          key={item.to + idx}
                          onClick={() => {
                            navigate(item.to);
                            setSearchQuery("");
                            setSearchOpen(false);
                            setSuggestions([]);
                          }}
                          onMouseEnter={() => setActiveSuggestionIdx(idx)}
                          className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${
                            isActive 
                              ? "bg-gray-50 border-l-[3px] border-[#D4AF37] pl-3.5 text-[#072A6C]" 
                              : "border-l-[3px] border-transparent text-[#222222] hover:bg-gray-50/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "bg-gray-100 text-gray-500"
                            }`}>
                              <IconComponent size={15} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold leading-tight">{item.title}</div>
                              <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{item.category}</div>
                            </div>
                          </div>
                          <span className={`text-[11px] font-bold flex items-center gap-1 ${
                            isActive ? "text-[#D4AF37] translate-x-1" : "text-gray-300"
                          } transition-all`}>
                            Go <ArrowRight size={10} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[90px] z-30 bg-white flex flex-col p-6 overflow-y-auto min-[1024px]:hidden shadow-2xl">
          {navLinks.map((name) => {
            if (name === "About Us") {
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleAboutUsClick();
                  }}
                  className="w-full text-left text-[15px] font-semibold text-[#222222] hover:text-[#D4AF37] py-3 border-b border-gray-100 transition-colors font-[var(--font-poppins)] outline-none cursor-pointer"
                >
                  {name}
                </button>
              );
            }

            if (name === "Academics") {
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleAcademicsClick();
                  }}
                  className="w-full text-left text-[15px] font-semibold text-[#222222] hover:text-[#D4AF37] py-3 border-b border-gray-100 transition-colors font-[var(--font-poppins)] outline-none cursor-pointer"
                >
                  {name}
                </button>
              );
            }







            return (
              <Link
                key={name}
                to={navHrefs[name]}
                className="text-[15px] font-semibold text-[#222222] hover:text-[#D4AF37] py-3 border-b border-gray-100 transition-colors font-[var(--font-poppins)]"
              >
                {name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 pt-8">
            <button onClick={() => { setMobileOpen(false); navigate('/'); setTimeout(() => { document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' }); }, 300); }} className="w-full text-center py-3 bg-[#D4AF37] text-white font-bold text-sm rounded-[12px] font-[var(--font-poppins)] cursor-pointer">Apply Now</button>
          </div>
        </div>
      )}

      {/* Global Smart Search Modal */}
      <GlobalSearchModal 
        isOpen={isGlobalSearchOpen} 
        onClose={() => setIsGlobalSearchOpen(false)} 
      />
    </>
  );
}

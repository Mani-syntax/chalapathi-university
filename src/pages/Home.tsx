"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap, Users, ArrowRight, Play, Trophy, Handshake, Landmark,
  Compass, FileText, Award, Phone, MapPin, Mail, Sparkles, Building2, HelpCircle, Search, Globe,
  UserPlus, ShieldCheck, UploadCloud, CreditCard, Settings, Briefcase, Code, FlaskConical, Wrench, Atom, X, Calendar, Clock, Coffee, Bus,
  Brain, Database, Monitor, Cpu, Shield, CircuitBoard, Network, HardHat,
  Share2, ChevronLeft, ChevronRight, Scale, BookOpen
} from "lucide-react";
import SEO from "../components/SEO";
import { AdmissionsApplyFlow } from "./DynamicPage";
import { EnquiryFormContent } from "../components/EnquiryFormContent";

const FEATURED_IMAGES = [
  "/prog_computer.png",
  "/prog_engineering.png",
  "/prog_management.png",
  "/prog_pharmacy.png"
];
import { useData } from "../context/DataContext";
import { certifications } from "../data/certifications";
import { ACADEMIC_PROGRAMS_STRUCTURE } from "../components/layout/Header";
import imgComputerScience from "../assets/illustrations/computer_science.png";
import imgMtechCSE from "../assets/illustrations/mtech_cse.png";
import imgMCA from "../assets/illustrations/mca.png";
import imgPhdCSE from "../assets/illustrations/phd_cse.png";
import imgDataScience from "../assets/illustrations/data_science.png";
import imgArtificialIntelligence from "../assets/illustrations/artificial_intelligence.png";
import imgAIMachineLearning from "../assets/illustrations/aiml.png";
import imgCyberSecurity from "../assets/illustrations/cyber_security.png";
import imgElectronicsCommunication from "../assets/illustrations/electronics.png";
import imgVLSIEmbedded from "../assets/illustrations/vlsi.png";
import imgCivilEngineering from "../assets/illustrations/civil.png";
import imgStructuralEngineering from "../assets/illustrations/structural.png";
import imgMBA from "../assets/illustrations/mba.png";

/* ── animation helpers ────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};


export default function Home() {
  const { programs } = useData();
  const navigate = useNavigate();
  const [directionsFrom, setDirectionsFrom] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeFormTab, setActiveFormTab] = useState<"admission" | "enquiry">("admission");
  const [inlineFormSubmitted, setInlineFormSubmitted] = useState<string | null>(null);
  const [inlineFormData, setInlineFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "B.Tech Computer Science & Engineering",
    city: "",
    qualifyingMarks: "",
    message: ""
  });
  const schools = Object.keys(ACADEMIC_PROGRAMS_STRUCTURE);
  const [activeSchoolTab, setActiveSchoolTab] = useState<string>(schools[0]);
  const [activeDepartmentTab, setActiveDepartmentTab] = useState<string | null>(null);

  const validDepartments = ACADEMIC_PROGRAMS_STRUCTURE[activeSchoolTab] ? Object.keys(ACADEMIC_PROGRAMS_STRUCTURE[activeSchoolTab]) : [];
  const currentDepartment = (activeDepartmentTab && validDepartments.includes(activeDepartmentTab))
    ? activeDepartmentTab
    : validDepartments[0];

  // Reset states on unmount
  useEffect(() => {
    return () => {
    };
  }, []);

  // Bridge Section Slider & Student Rotation States
  const [activeBridgeSlide, setActiveBridgeSlide] = useState(0);
  const [activeFeaturedStudent, setActiveFeaturedStudent] = useState(0);

  // Video playback states
  const [showChairmanVideo, setShowChairmanVideo] = useState(false);
  const [showHeroIntroModal, setShowHeroIntroModal] = useState(false);

  // Lock body scroll, handle escape key, and scroll to top when Events Drawer opens


  // Campus Life States
  const [activeCampusVideoIdx, setActiveCampusVideoIdx] = useState(0);
  const [isCampusTourMuted, setIsCampusTourMuted] = useState(true);
  const campusVideoRef = useRef<HTMLVideoElement>(null);

  // Load campus videos list
  const getCampusVideos = () => {
    try {
      const saved = localStorage.getItem("chalapathi_campus_videos");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { url: "/chalapathi_logo_intro.mp4", title: "Campus Overview" },
      { url: "https://assets.mixkit.co/videos/preview/mixkit-drones-eye-view-of-a-modern-university-campus-41555-large.mp4", title: "Smart Classrooms & Labs" },
      { url: "https://assets.mixkit.co/videos/preview/mixkit-group-of-students-walking-on-college-campus-41553-large.mp4", title: "Student Life & Clubs" }
    ];
  };
  const campusVideos = getCampusVideos();

  // Autoplay sliding campus tour videos every 8 seconds
  useEffect(() => {
    if (campusVideos.length <= 1) return;
    const timer = setInterval(() => {
      setActiveCampusVideoIdx((prev) => (prev + 1) % campusVideos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [campusVideos.length]);

  // Auto-scroll for Left Side Hero Slider (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBridgeSlide((prev) => (prev + 1) % 6);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate for Student Success Testimonials (6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeaturedStudent((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides = [
    {
      heading: ["SHAPING", "TOMORROW'S", "INNOVATORS"],
      tagline: "Empowering ambitious minds through world-class education, cutting-edge research, industry collaboration, and transformative learning experiences that prepare future leaders."
    },
    {
      heading: ["LEARN", "TODAY.", "LEAD TOMORROW."],
      tagline: "Discover an ecosystem where innovation meets opportunity, guided by expert faculty, modern infrastructure, global exposure, and career-focused education."
    },
    {
      heading: ["CREATE", "YOUR", "FUTURE"],
      tagline: "Transform your ideas into reality through advanced laboratories, startup incubation, interdisciplinary learning, and hands-on industry experience."
    },
    {
      heading: ["YOUR", "SUCCESS", "STARTS HERE"],
      tagline: "Join thousands of successful graduates who built remarkable careers through excellence in academics, innovation, leadership, and professional development."
    }
  ];

  const handleDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (directionsFrom) {
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(directionsFrom)}&destination=Chalapathi+Institute+of+Technology+Mothadaka`, "_blank");
    }
  };

  useEffect(() => {
    document.title = "Chalapathi University | Best University in Andhra Pradesh";
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash === "#about-us") {
        setTimeout(() => {
          document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else if (hash === "#academics") {
        setTimeout(() => {
          document.getElementById("academics")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    };
    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((slide) => (slide + 1) % slides.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }
    if (distance < -50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setProgress(0);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F8FC] text-[#222222] overflow-x-hidden font-[var(--font-poppins)]">
      <SEO 
        title="Best University in andhraPradesh -ChalapathiUniversity" 
        description="Chalapathi University offers world-class higher education with premium undergraduate, postgraduate, and research programs. Admissions Open for 2026–2027." 
      />
      {/* ═══ ADMISSION ALERT TICKER (EXACTLY BELOW NAV BAR) ═══ */}
      {(() => {
        const defaultMarqueeItems = [
          { text: "Admissions Open for Academic Year 2026–27", link: "" },
          { text: "Applications Closing Soon", link: "" },
          { text: "Apply Now", link: "/admissions" },
          { text: "Limited Seats", link: "" },
          { text: "Register Today", link: "/admissions" },
          { text: "Highest Placement Opportunities", link: "/placements" },
          { text: "Admissions Open for 2026–27", link: "" }
        ];
        let marqueeItems = defaultMarqueeItems;
        try {
          const saved = localStorage.getItem("chalapathi_marquee_items");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) marqueeItems = parsed;
          }
        } catch (e) {}

        const renderMarqueeContent = (ariaHidden?: boolean) => (
          <span className="px-4 whitespace-nowrap flex items-center gap-0" {...(ariaHidden ? { 'aria-hidden': 'true' } : {})}>
            {marqueeItems.map((item: { text: string; link: string }, idx: number) => (
              <React.Fragment key={idx}>
                {item.link ? (
                  item.link.startsWith("http") ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-[#072A6C] transition-colors cursor-pointer"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link
                      to={item.link}
                      className="hover:underline hover:text-[#072A6C] transition-colors cursor-pointer"
                    >
                      {item.text}
                    </Link>
                  )
                ) : (
                  <span>{item.text}</span>
                )}
                {idx < marqueeItems.length - 1 && <span className="mx-2"> • </span>}
              </React.Fragment>
            ))}
            <span className="mx-2"> • </span>
          </span>
        );

        return (
          <section className="relative z-10 w-full h-[50px] bg-[#F4B400] text-[#0A2D6D] flex items-center overflow-hidden select-none font-[var(--font-poppins)] font-[700] text-[18px] shadow-[inset_0_4px_6px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.05)] border-none">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .marquee-inner {
                display: flex;
                width: max-content;
                animation: marquee 20s linear infinite;
                will-change: transform;
              }
              .marquee-inner:hover {
                animation-play-state: paused;
              }
            `}} />
            <div className="marquee-inner">
              {renderMarqueeContent()}
              {renderMarqueeContent(true)}
              {renderMarqueeContent(true)}
            </div>
          </section>
        );
      })()}

      {/* ═══ HERO SECTION ═══ */}
      <section 
        className="relative w-full overflow-hidden bg-white select-none" 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideEntrance {
            0% {
              opacity: 0;
              transform: translateY(40px);
              filter: blur(8px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }
          @keyframes letter-fade {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-letter-fade {
            opacity: 0;
            animation: letter-fade 300ms ease-out forwards;
          }
          @keyframes tagline-fade {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-tagline-fade {
            opacity: 0;
            animation: tagline-fade 500ms ease-out forwards;
          }
          @keyframes scale-width {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          .animate-scale-width {
            transform: scaleX(0);
            animation: scale-width 600ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}} />

        {/* Full banner image centered at 70% vertical focus */}
        <img
          src="/Chalapathimain.jpeg"
          alt="Chalapathi University Banner"
          className="w-full h-auto max-h-[85vh] md:h-[680px] object-cover object-[center_70%] block no-lift relative z-0"
        />
      </section>


      {/* ═══ WHY CHOOSE US SECTION ═══ */}
      <section className="bg-[#F8FAFC] w-full py-10 md:py-12 border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto w-full px-5 text-center">

          <motion.h2
            className="text-[32px] md:text-[40px] font-[800] text-[#0F172A] mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why To Choose Chalapathi University?
          </motion.h2>
          <motion.p
            className="text-[#64748B] max-w-3xl mx-auto text-[15px] md:text-[17px] leading-relaxed mb-8 font-[500]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Experience an education that blends academic excellence, innovation, industry collaboration, research, global exposure, and holistic development—preparing students to become future-ready professionals and responsible global leaders.
          </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {[
            {
              title: "Industry integrated curriculum",
              desc: "Curriculum designed with practical learning and industry collaboration to ensure graduates are career-ready.",
              icon: Trophy,
              color: "#123A7A"
            },
            {
              title: "Expert Faculty & Research",
              desc: "Learn from accomplished faculty members, researchers, and industry experts who inspire innovation.",
              icon: Users,
              color: "#1F4FA8"
            },
            {
              title: "Smart Campus Infrastructure",
              desc: "Technology-enabled classrooms, modern laboratories, and collaborative learning spaces designed for excellence.",
              icon: Building2,
              color: "#123A7A"
            },
            {
              title: "Career & Placement Excellence",
              desc: "Industry partnerships, internships, and placement training help students launch successful careers.",
              icon: Handshake,
              color: "#1F4FA8"
            },
            {
              title: "Global Learning Opportunities",
              desc: "International certifications, collaborative learning, and global industry exposure.",
              icon: Globe,
              color: "#123A7A"
            },
            {
              title: "Leadership & Holistic Development",
              desc: "Develop leadership, communication, creativity, and life skills through a vibrant campus ecosystem.",
              icon: Sparkles,
              color: "#1F4FA8"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white border border-[#E7ECF3] rounded-[16px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-2 group"
                variants={fadeUp}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-[700] text-[16px] text-[#0F172A] mb-3 leading-snug min-h-[48px] flex items-center justify-center transition-colors duration-300 group-hover:text-[#123A7A]">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed font-[500]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        </div>
      </section>

      {/* ═══ OUR PROGRAMS SECTION (Tabbed Layout) ═══ */}
      <section id="academics" className="bg-[#f8f9fa] border-t border-gray-100 py-10 md:py-12">
        <div className="max-w-[1280px] mx-auto w-full px-5">
          <div className="flex flex-col items-center justify-center mb-6">
            <h2 className="text-[32px] md:text-[38px] font-[800] text-[#072A6C] tracking-tight mb-4">
              Explore Our Schools & Programs
            </h2>
            
            {/* Main Tabs (Schools) */}
            {(() => {
              const schoolIcons: Record<string, React.ReactNode> = {
                "School of Computing Sciences": <Monitor className="w-5 h-5 md:w-6 md:h-6 shrink-0" />,
                "School of Engineering": <Cpu className="w-5 h-5 md:w-6 md:h-6 shrink-0" />,
                "School of Business & Management": <Briefcase className="w-5 h-5 md:w-6 md:h-6 shrink-0" />,
                "School of Pharmacy": <FlaskConical className="w-5 h-5 md:w-6 md:h-6 shrink-0" />,
                "School of Law": <Scale className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              };
              return (
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-6xl mb-12">
                  {schools.map((school) => {
                    const isActive = activeSchoolTab === school;
                    const IconComponent = schoolIcons[school] || <GraduationCap className="w-5 h-5 md:w-6 md:h-6 shrink-0" />;
                    return (
                      <button
                        key={school}
                        onClick={() => setActiveSchoolTab(school)}
                        className={`group px-5 py-3.5 rounded-2xl flex items-center justify-center gap-3 text-[14px] sm:text-[16px] md:text-[20px] font-[700] tracking-[0.5px] border transition-all duration-300 transform active:scale-98 cursor-pointer relative ${
                          isActive
                            ? "bg-[#0B3D91] text-white border-transparent shadow-lg shadow-[#0B3D91]/25 scale-105 border-b-[3px] border-b-[#D4AF37]"
                            : "bg-white text-[#0B3D91] border-[#0B3D91]/20 hover:bg-[#0B3D91] hover:text-white hover:border-transparent hover:shadow-md"
                        }`}
                      >
                        <span className={`p-2 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? "bg-white/20 text-white" : "bg-[#0B3D91]/10 text-[#0B3D91] group-hover:bg-white/20 group-hover:text-white"
                        }`}>
                          {IconComponent}
                        </span>
                        <span>{school}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeSchoolTabIndicator"
                            className="absolute -bottom-1 left-8 right-8 h-[3px] bg-[#D4AF37] rounded-full"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })()}

            {/* Sub Tabs (Departments) */}
            {activeSchoolTab && ACADEMIC_PROGRAMS_STRUCTURE[activeSchoolTab] && (
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full max-w-5xl mb-6">
                {Object.keys(ACADEMIC_PROGRAMS_STRUCTURE[activeSchoolTab]).map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDepartmentTab(dept)}
                    className={`text-[13px] md:text-[16px] font-[700] transition-colors ${
                      currentDepartment === dept 
                        ? "text-[#072A6C]" 
                        : "text-gray-400 hover:text-[#072A6C]"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <motion.div
            key={`${activeSchoolTab}-${currentDepartment}`}
            className="flex flex-wrap justify-center gap-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activeSchoolTab && currentDepartment && ACADEMIC_PROGRAMS_STRUCTURE[activeSchoolTab][currentDepartment]
              ?.map((courseLink, idx) => {
                
                // Find full program data using the slug
                const programSlug = courseLink.to.split('/').pop();
                const program = programs.find(p => p.slug === programSlug);

                if (!program) return null;
                
                // Helper to assign a dynamic image based on title
                const getIllustrationForProgram = (title: string, size = 64) => {
                  const t = title.toLowerCase();
                  let imgSrc = imgComputerScience;
                  
                  if (t.includes('cse') && t.includes('ai') && t.includes('learning')) imgSrc = imgArtificialIntelligence;
                  else if (t.includes('machine learning') || t.includes('aiml')) imgSrc = imgAIMachineLearning;
                  else if (t.includes('artificial intelligence') || t.includes('ai')) imgSrc = imgArtificialIntelligence;
                  else if (t.includes('data science') || t.includes('data')) imgSrc = imgDataScience;
                  else if (t.includes('cyber security') || t.includes('security')) imgSrc = imgCyberSecurity;
                  else if (t.includes('ph.d')) imgSrc = imgPhdCSE;
                  else if (t.includes('electronics') || t.includes('communication') || t.includes('ece')) imgSrc = imgElectronicsCommunication;
                  else if (t.includes('vlsi') || t.includes('embedded')) imgSrc = imgVLSIEmbedded;
                  else if (t.includes('structural')) imgSrc = imgStructuralEngineering;
                  else if (t.includes('civil')) imgSrc = imgCivilEngineering;
                  else if (t.includes('management') || t.includes('mba')) imgSrc = imgMBA;
                  else if (t.includes('m.tech') && t.includes('computer science')) imgSrc = imgArtificialIntelligence;
                  else if (t.includes('master of computer') || t.includes('mca')) imgSrc = imgMCA;
                  else if (t.includes('cse') || t.includes('computer science') || t.includes('software')) imgSrc = imgComputerScience;
                  
                  return (
                    <img 
                      src={imgSrc} 
                      alt={title} 
                      style={{ width: size, height: size, objectFit: 'contain', clipPath: t.includes('mba') || t.includes('management') ? 'inset(18% 0% 25% 0%)' : 'inset(0% 0% 25% 0%)' }}
                      className="rounded-lg"
                    />
                  );
                };

                 return (
                  <motion.div
                    key={idx}
                    className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-[340px] shrink-0 ${
                      ACADEMIC_PROGRAMS_STRUCTURE[activeSchoolTab][currentDepartment]?.length === 4
                        ? "w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]"
                        : "w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                    }`}
                    variants={scaleIn}
                    whileHover="hover"
                    initial="rest"
                  >
                    {/* Default State (Centered) */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-5 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0 text-center">
                      <div className="flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-[1.06]">
                        {getIllustrationForProgram(program.title, 110)}
                      </div>
                      <h3 className="font-[800] text-[#072A6C] text-[16px] leading-tight max-w-[250px]">
                        {program.title}
                      </h3>
                    </div>
                    
                    {/* Hover State (Sliding up) */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-center">
                      <div className="flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-[1.06]">
                        {getIllustrationForProgram(program.title, 85)}
                      </div>
                      <h3 className="font-[800] text-[#072A6C] text-[15px] mb-2 leading-tight max-w-[250px]">
                        {program.title}
                      </h3>
                      <p className="text-[12px] text-gray-500 line-clamp-4 leading-relaxed font-[500]">
                        {program.overview || program.desc}
                      </p>
                    </div>
                  </motion.div>
                );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ ADMISSION ENQUIRY FORM ═══ */}
      <section className="bg-gradient-to-b from-[#f8f9fa] to-white py-16 border-t border-gray-100 font-[var(--font-poppins)]">
        <div className="max-w-[1280px] mx-auto px-5 flex flex-col items-center">
          
          {/* Creative Attractive Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#072A6C]/5 border border-[#072A6C]/15 shadow-xs mb-3">
              <Sparkles size={14} className="text-[#D4AF37]" />
              <span className="text-[11px] font-[800] tracking-widest text-[#072A6C] uppercase">
                ADMISSIONS OPEN 2026–27
              </span>
            </div>
            
            <h2 className="text-[32px] md:text-[42px] font-[900] text-[#072A6C] tracking-tight leading-tight mb-3">
              Shape Your Future at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#072A6C] via-[#1F4FA8] to-[#D4AF37]">Chalapathi</span>
            </h2>
            
            <p className="text-[#64748B] text-[14px] md:text-[15px] font-[500] leading-relaxed">
              Take the first step toward world-class education. Fill out the admission enquiry form below to connect with our counseling team.
            </p>
          </div>

          <EnquiryFormContent />
        </div>
      </section>

      {/* ═══ THE CHALAPATHI ADVANTAGE (ABOUT US) SECTION ═══ */}
      <section id="about-us" className="bg-white py-16 border-t border-gray-100 font-[var(--font-poppins)]">
        <div className="max-w-[1440px] mx-auto px-5">
          {/* Header block */}
          <div className="text-left mb-10">
            <span className="text-[12px] font-[800] text-[#D4AF37] tracking-wider uppercase block mb-1">
              ABOUT US
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[800] text-[#072A6C] tracking-tight mb-2">
              The Chalapathi Advantage
            </h2>
            <p className="text-[#64748B] text-[15px] font-[500] max-w-3xl">
              Discover why Chalapathi University stands out as a leading hub of educational excellence and innovation.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <div className="text-center mb-8">
              <span className="text-[10px] text-[#D4AF37] font-extrabold uppercase tracking-widest block mb-1">
                WHY CHOOSE US
              </span>
              <h3 className="text-xl md:text-2xl font-black text-[#072A6C] uppercase tracking-wide">
                THE CHALAPATHI ADVANTAGE
              </h3>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mt-2" />
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
              {[
                {
                  num: "01",
                  title: "AUTONOMOUS CURRICULUM",
                  desc: "Tailored syllabus modules synced directly with current IT and core sector requirements.",
                  detail: "Allows for rapid curriculum updating, ensuring learners study the newest engineering standards.",
                  icon: GraduationCap,
                  bgClass: "bg-purple-600",
                  textClass: "text-purple-600",
                  borderClass: "border-purple-200"
                },
                {
                  num: "02",
                  title: "INDUSTRY IMMERSION",
                  desc: "Mandatory corporate internships, case study reviews, and MNC leadership seminars.",
                  detail: "Direct connection with industry majors to build practical skills before graduation.",
                  icon: BookOpen,
                  bgClass: "bg-blue-600",
                  textClass: "text-blue-600",
                  borderClass: "border-blue-200"
                },
                {
                  num: "03",
                  title: "SMART INFRASTRUCTURE",
                  desc: "State-of-the-art laboratories, digital classrooms, and extensive library resources.",
                  detail: "A modern campus designed to foster innovation, collaborative learning, and holistic student development.",
                  icon: Landmark,
                  bgClass: "bg-amber-600",
                  textClass: "text-amber-600",
                  borderClass: "border-amber-200"
                },
                {
                  num: "04",
                  title: "PLACEMENT TRACK",
                  desc: "Consistency in recruiting achievements with top MNC software and hardware firms.",
                  detail: "Comprehensive guidance program from pre-final year until successful placement onboarding.",
                  icon: Award,
                  bgClass: "bg-teal-600",
                  textClass: "text-teal-600",
                  borderClass: "border-teal-200"
                }
              ].map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div key={idx} className="flex flex-col items-center relative group">
                    {/* Top Hexagon Number Badge */}
                    <div className="relative z-10 -mb-6 flex flex-col items-center">
                      <div 
                        className={`w-14 h-14 ${card.bgClass} text-white font-black text-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        {card.num}
                      </div>
                      <div className={`w-8 h-2 rounded-full opacity-60 mt-1 ${card.bgClass}`} />
                    </div>

                    {/* Main Card Body */}
                    <div className="bg-white border border-gray-150 rounded-2xl p-6 pt-10 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-3 w-full h-full relative z-0">
                      <div className={`p-2.5 rounded-full ${card.bgClass}/10 ${card.textClass}`}>
                        <IconComp size={20} />
                      </div>
                      <h4 className="font-extrabold text-sm text-[#072A6C] uppercase tracking-wider">{card.title}</h4>
                      <p className="text-xs text-gray-500 font-light leading-relaxed max-w-[90%]">{card.desc}</p>
                      <p className="text-[10px] text-gray-400 font-light leading-relaxed max-w-[90%]">{card.detail}</p>
                      <div className="pt-2 flex justify-center w-full">
                        <div 
                          className={`w-6 h-6 border-2 ${card.borderClass} bg-white flex items-center justify-center`}
                          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                        >
                          <div className={`w-2 h-2 ${card.bgClass}`} style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FROM THE CHAIRMAN SECTION ═══ */}
      <section className="bg-gray-50/50 py-20 relative overflow-hidden font-[var(--font-poppins)] border-t border-gray-100">
        {/* Soft Background Blobs */}
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-blue-50/30 blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-yellow-50/20 blur-3xl -z-10" />

        <div className="max-w-[1440px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[11px] font-[800] uppercase tracking-widest text-[#D4AF37] bg-amber-50 py-1.5 px-4 rounded-full inline-block mb-3">
              {localStorage.getItem("chalapathi_chairman_label") || "FROM THE CHAIRMAN"}
            </span>
            <h2 className="text-2xl md:text-4xl font-[900] text-[#072A6C] mb-3">
              A Vision. A Commitment. A Legacy.
            </h2>
            <p className="text-xs text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
              {localStorage.getItem("chalapathi_chairman_subtitle") || "Guiding generations through excellence, innovation, integrity, and student success."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN (45% / lg:col-span-5) */}
            <div className="lg:col-span-5 flex justify-center relative select-none">
              {/* Background abstract decorations */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-pulse" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl" />
              
              <div className="relative w-full max-w-[380px] rounded-[32px] overflow-hidden shadow-2xl group border-4 border-white bg-white transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
                {/* Chairman Portrait */}
                <img 
                  src="/chairman_portrait.png" 
                  alt="Chairman Dr. Y. V Anjaneyulu" 
                  className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: "50% 0%", transform: "translateY(-30px) scale(1.12)" }}
                />
                
                {/* Light reflection animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Image tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Floating Glass Information Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#072A6C]/75 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white text-left transition-transform duration-300 group-hover:scale-102">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-0.5">Chairman</span>
                  <h4 className="text-base font-extrabold mb-0.5">{localStorage.getItem("chalapathi_chairman_name") || "Dr. Y. V Anjaneyulu"}</h4>
                  <p className="text-[10px] text-gray-200 font-light leading-snug">
                    {localStorage.getItem("chalapathi_chairman_group") || "Chalapathi Educational Society"}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (55% / lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="bg-white/90 border border-gray-150 rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden text-left flex flex-col justify-between min-h-[420px] transition-all duration-300 hover:shadow-md">
                
                {/* Campus Building outline in background */}
                <div className="absolute right-0 bottom-0 w-80 h-80 opacity-[0.03] pointer-events-none select-none">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#072A6C] w-full h-full">
                    {/* Clock tower sketch */}
                    <path d="M70 180 V100 H130 V180 M90 100 V60 H110 V100 M95 60 L100 40 L105 60 M85 180 h30 M60 180 h80 M95 80 h10 M100 70 A 5 5 0 1 0 100 80 A 5 5 0 1 0 100 70" />
                    <rect x="75" y="110" width="12" height="20" rx="2" />
                    <rect x="113" y="110" width="12" height="20" rx="2" />
                    <rect x="75" y="140" width="12" height="25" rx="2" />
                    <rect x="113" y="140" width="12" height="25" rx="2" />
                  </svg>
                </div>

                {/* Quotation Mark */}
                <span className="text-7xl font-serif text-[#072A6C]/10 absolute top-4 left-4 select-none pointer-events-none">“</span>

                {/* Message Content */}
                <div className="space-y-5 z-10 relative">
                  <p className="text-xs md:text-sm text-gray-700 font-light leading-relaxed whitespace-pre-line">
                    {localStorage.getItem("chalapathi_chairman_message") || `At Chalapathi University, we believe education is the most powerful transformer of lives and the key to building a better society. Our mission is to empower young minds with knowledge, values, and innovation to help them lead with purpose and create a lasting impact on the world.\n\nWe are committed to providing a nurturing environment, world-class infrastructure, and industry-oriented education to shape future leaders and responsible citizens.`}
                  </p>
                </div>

                {/* Signature, Name, Designation & Action Button */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 z-10">
                  <div className="space-y-2">
                    {/* Cursive Signature */}
                    <div className="h-12 flex items-center select-none">
                      <svg className="h-9 text-[#072A6C]" viewBox="0 0 160 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M15 28c12-6 22-14 26-1s-8 12-4 4 12-16 16-4-4 12 0 4 10-14 12-2-4 10 4 2 10-12 12 0-4 10 4 2 10-12 12 4-4 8 4 2c10 2 15-4 18-9" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-[#072A6C]">{localStorage.getItem("chalapathi_chairman_name") || "Dr. Y. V Anjaneyulu"}</h5>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{localStorage.getItem("chalapathi_chairman_designation") || "Chairman"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chairman Video Player Fullscreen Modal */}
      <AnimatePresence>
        {showChairmanVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center font-[var(--font-poppins)]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChairmanVideo(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[800px] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 m-5"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowChairmanVideo(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white border-none cursor-pointer outline-none transition-colors"
              >
                <X size={18} />
              </button>

              <video
                src={localStorage.getItem("chalapathi_chairman_video") || "/chalapathi_logo_intro.mp4"}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ CHALAPATHI JOURNEY & CAMPUS SECTION (Grouping into White Card containers) ═══ */}
      <section className="max-w-[1440px] mx-auto w-full px-5 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Card: Journey */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm hover:shadow transition-shadow">
          <div>
            <span className="text-[12px] font-[700] text-[#D4AF37] tracking-wider uppercase block mb-1">THE CHALAPATHI JOURNEY</span>
            <h2 className="text-[26px] font-[800] text-[#072A6C]">
              Your Path to Success
            </h2>
          </div>

          {/* Timeline steps container with absolute positioning for vertical gray line */}
          <motion.div
            className="space-y-6 mt-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Vertical timeline connector */}
            <div className="absolute left-[70px] top-6 bottom-6 w-0.5 bg-gray-100 z-0">
              {/* Green animated line overlay */}
              <div 
                className="absolute top-0 left-0 w-full bg-[#10B981] shadow-[0_0_8px_#10B981]" 
                style={{
                  height: '100%',
                  transformOrigin: 'top',
                  animation: 'drawTimelineLine 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                  background: 'linear-gradient(to bottom, #10B981, #10B981 80%, rgba(16, 185, 129, 0.2))'
                }} 
              />
              <style>{`
                @keyframes drawTimelineLine {
                  0% { transform: scaleY(0); opacity: 1; }
                  50% { transform: scaleY(1); opacity: 1; }
                  85% { transform: scaleY(1); opacity: 0; }
                  100% { transform: scaleY(0); opacity: 0; }
                }
              `}</style>
            </div>

            {[
              { step: "01", title: "DISCOVER", desc: "Explore programs and find your passion.", icon: Compass, to: "/academics" },
              { step: "02", title: "APPLY", desc: "Submit your application online.", icon: FileText, to: "/admissions/apply" },
              { step: "03", title: "LEARN", desc: "Gain knowledge & practical exposure.", icon: GraduationCap, to: "/academics/computer-science" },
              { step: "04", title: "GROW", desc: "Build skills & achieve milestones.", icon: Award, to: "/about" },
              { step: "05", title: "SUCCEED", desc: "Launch your dream career", icon: Trophy, to: "/placements" }
            ].map((j) => {
              const Icon = j.icon;
              return (
                <motion.div key={j.step} className="flex gap-4 items-center relative z-10" variants={fadeUp}>
                  {/* Step Flag Pointer badge */}
                  <div className="w-10 h-8 bg-[#D4AF37] text-white font-[700] text-[13px] flex items-center justify-center shrink-0 rounded-l shadow-sm relative mr-2">
                    {j.step}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-[#D4AF37]" />
                  </div>

                  {/* Circular Icon Container */}
                  <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#072A6C]" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={j.to} className="block">
                      <h4 className="text-[13px] font-[800] text-[#072A6C] tracking-wide hover:text-[#D4AF37] transition-colors">
                        {j.title}
                      </h4>
                    </Link>
                    <p className="text-[11px] text-[#666666] mt-0.5 leading-normal font-[400] truncate">
                      {j.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Card: Campus & Navigation */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between gap-6">
          <div>
            <span className="text-[12px] font-[700] text-[#F59E0B] tracking-wider uppercase block mb-1">OUR CAMPUS</span>
            <h2 className="text-[26px] font-[800] text-[#072A6C]">
              A Campus Built for Excellence
            </h2>
          </div>

          <motion.div
            className="rounded-[16px] overflow-hidden shadow-sm bg-gray-100 h-[230px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/campus_hero.png" alt="Campus View" className="w-full h-full object-cover" />
          </motion.div>


        </div>
      </section>




      {/* ═══ ADMISSIONS OPEN 2026 STRIP ═══ */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Red Card */}
          <div className="lg:col-span-8 bg-[#072A6C] text-white rounded-[16px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="space-y-4 relative z-10 w-full md:max-w-[55%]">
              <h2 className="text-[26px] font-[800] tracking-wide font-[var(--font-poppins)] text-[#D4AF37]">
                ADMISSIONS OPEN 2026
              </h2>
              <p className="text-[12px] text-blue-100 leading-relaxed font-[300] font-[var(--font-poppins)]">
                Join a community of innovators and leaders. Shape your future with Chalapathi University.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 font-[var(--font-poppins)]">
                <Link
                  to="/admissions/apply"
                  className="h-10 px-5 bg-white text-[#072A6C] hover:bg-blue-50 text-[11px] font-[700] rounded-[8px] inline-flex items-center gap-1.5 shadow active:scale-95 transition-transform"
                >
                  Apply Now <ArrowRight size={13} />
                </Link>
                <Link
                  to="/admissions"
                  className="h-10 px-5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white text-[11px] font-[700] rounded-[8px] inline-flex items-center gap-1.5 active:scale-95 transition-all duration-200"
                >
                  Download Brochure
                </Link>
                <Link
                  to="/contact"
                  className="h-10 px-5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white text-[11px] font-[700] rounded-[8px] inline-flex items-center gap-1.5 active:scale-95 transition-all duration-200"
                >
                  Talk to Counselor
                </Link>
              </div>
            </div>

            {/* Students Image absolute positioned on the right edge */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 h-full w-full md:w-[42%] overflow-hidden z-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src="/students_admission.png" alt="Students" className="w-full h-full object-cover object-left-top" />
            </motion.div>
          </div>

          {/* Right White Card */}
          <div className="lg:col-span-4 bg-white border border-gray-200/60 rounded-[16px] p-6 flex items-center justify-between gap-4 shadow-sm font-[var(--font-poppins)]">
            <div className="space-y-4 flex-1">
              <h3 className="text-[13px] font-[800] uppercase tracking-wider text-[#072A6C]">VISIT US</h3>
              <div className="space-y-2.5 text-[11px] text-gray-600 font-[400]">
                <div className="flex items-start gap-1.5">
                  <MapPin size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>A.R. Nagar, Mothadaka, Guntur, Andhra Pradesh - 522034</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Phone size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>8886630355 | 8886630356 9905505566</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Mail size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>admissions@city.ac.in</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Globe size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>www.city.ac.in</span>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <a 
              href="https://www.google.com/maps/place/Chalapathi+Institute+of+Technology/@16.3752188,80.2858169,17z/data=!3m1!4b1!4m6!3m5!1s0x3a4a79679802cfad:0xe67e2a901bbd33fe!8m2!3d16.3752188!4d80.2858169!16s%2Fg%2F122r446z"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[130px] h-[130px] rounded-[12px] overflow-hidden bg-gray-100 shrink-0 border border-gray-200 relative block group"
              title="Open Chalapathi University in Google Maps"
            >
              <div className="absolute inset-0 bg-transparent z-10 cursor-pointer" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.974950454796!2d80.28581691486445!3d16.375218788685984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a79679802cfad%3A0xe67e2a901bbd33fe!2sChalapathi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1657523129846!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="pointer-events-none"
              ></iframe>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ THE CHALAPATHI ADVANTAGE (ABOUT US) SECTION ═══ */}
    </div>
  );
}

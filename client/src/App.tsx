import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import "./App.css";

// Icons from react-icons
import {
  FaBuilding,
  FaHome,
  FaProjectDiagram,
  FaDraftingCompass,
  FaTree,
  FaRoad,
  FaHandshake,
  FaTools,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaBars,
  FaTimes,
  FaAward,
  FaUsers,
  FaCheckCircle,
  FaCreditCard,
  FaHeart,
  FaClock,
  FaLightbulb,
  FaChartLine,
  FaKey,
  FaBullhorn,
  FaCity,
  FaMap,
  FaUserTie,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaChevronDown,
} from "react-icons/fa";

// Types
interface Property {
  id: number;
  name: string;
  type: "Residential" | "Commercial";
  location: string;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  price: string;
  status: "Available" | "Sold" | "Coming Soon";
  sqft: string;
  image: string;
}

interface Service {
  icon: JSX.Element;
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

interface GalleryImage {
  url: string;
  title: string;
  location: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: string;
  message: string;
}

// Sample property images (using placeholder URLs)
const propertyImages: string[] = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
];

// Gallery images
const galleryImages: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    title: "4-Bedroom Duplex",
    location: "Porsche Terrace, Mbora",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    title: "5-Bedroom Duplex",
    location: "Ochacho Homes, Mbora",
  },
  {
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    title: "3D Flooring Project",
    location: "Residential Complex",
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    title: "Stamp Concrete",
    location: "Commercial Project",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    title: "Luxury Interior",
    location: "Maitama, Abuja",
  },
  {
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    title: "Modern Kitchen",
    location: "Residential Project",
  },
];

// Sample properties data
const sampleProperties: Property[] = [
  {
    id: 1,
    name: "4-Bedroom Duplex",
    type: "Residential",
    location: "Mbora, Karmo District, Abuja",
    bedrooms: 4,
    bathrooms: 5,
    features: ["Modern Kitchen", "BQ", "Swimming Pool", "24/7 Security"],
    price: "₦85,000,000",
    status: "Available",
    sqft: "350 sqm",
    image: propertyImages[0],
  },
  {
    id: 2,
    name: "5-Bedroom Duplex",
    type: "Residential",
    location: "Ochacho Homes, Mbora, Abuja",
    bedrooms: 5,
    bathrooms: 6,
    features: ["En-suite Rooms", "BQ", "Garden", "Gated Estate"],
    price: "₦120,000,000",
    status: "Available",
    sqft: "450 sqm",
    image: propertyImages[1],
  },
  {
    id: 3,
    name: "3-Bedroom Terrace",
    type: "Residential",
    location: "Porsche Terrace, Mbora, Abuja",
    bedrooms: 3,
    bathrooms: 4,
    features: ["Modern Design", "3D Flooring", "POP Ceiling", "Security"],
    price: "₦55,000,000",
    status: "Sold",
    sqft: "250 sqm",
    image: propertyImages[2],
  },
  {
    id: 4,
    name: "Commercial Plaza",
    type: "Commercial",
    location: "Idu Industrial Layout, Abuja",
    bedrooms: 0,
    bathrooms: 8,
    features: ["Multiple Floors", "Parking Space", "Commercial Zone"],
    price: "₦250,000,000",
    status: "Available",
    sqft: "1200 sqm",
    image: propertyImages[3],
  },
  {
    id: 5,
    name: "Luxury Villa",
    type: "Residential",
    location: "Maitama, Abuja",
    bedrooms: 6,
    bathrooms: 7,
    features: ["Smart Home", "Cinema Room", "Wine Cellar", "Infinity Pool"],
    price: "₦350,000,000",
    status: "Coming Soon",
    sqft: "800 sqm",
    image: propertyImages[4],
  },
  {
    id: 6,
    name: "2-Bedroom Apartment",
    type: "Residential",
    location: "Jabi, Abuja",
    bedrooms: 2,
    bathrooms: 3,
    features: ["Gym Access", "Swimming Pool", "Elevator", "24/7 Power"],
    price: "₦45,000,000",
    status: "Available",
    sqft: "150 sqm",
    image: propertyImages[5],
  },
];

// Services data
const services: Service[] = [
  {
    icon: <FaBuilding />,
    title: "Building Construction",
    desc: "Complete residential and commercial building construction with premium finishes.",
  },
  {
    icon: <FaHome />,
    title: "Real Estate Development",
    desc: "Strategic property development for residential and commercial spaces.",
  },
  {
    icon: <FaProjectDiagram />,
    title: "Project Management",
    desc: "End-to-end project management ensuring timely and quality delivery.",
  },
  {
    icon: <FaDraftingCompass />,
    title: "Design & Planning",
    desc: "Innovative architectural design and comprehensive project planning.",
  },
  {
    icon: <FaTree />,
    title: "Landscaping",
    desc: "Professional landscaping services for aesthetic outdoor spaces.",
  },
  {
    icon: <FaRoad />,
    title: "Road Construction",
    desc: "Quality road construction and infrastructure development.",
  },
  {
    icon: <FaChartLine />,
    title: "Property Investment",
    desc: "Strategic property investment opportunities with high returns.",
  },
  {
    icon: <FaTools />,
    title: "General Contracting",
    desc: "Comprehensive contracting services for all project types.",
  },
  {
    icon: <FaShoppingBag />,
    title: "Property Sales",
    desc: "Premium properties available for purchase across Abuja.",
  },
];

// Real Estate Services
const realEstateServices: Service[] = [
  {
    icon: <FaMap />,
    title: "Land Acquisition",
    desc: "Strategic land sourcing and acquisition in prime locations across Abuja.",
  },
  {
    icon: <FaDraftingCompass />,
    title: "Property Development & Planning",
    desc: "Comprehensive planning and development of residential and commercial properties.",
  },
  {
    icon: <FaBuilding />,
    title: "Construction & Delivery",
    desc: "Quality construction and timely delivery of properties to specification.",
  },
  {
    icon: <FaBullhorn />,
    title: "Property Marketing",
    desc: "Strategic marketing to connect properties with the right buyers.",
  },
  {
    icon: <FaHandshake />,
    title: "Investment & Partnership",
    desc: "Joint venture opportunities and property investment partnerships.",
  },
  {
    icon: <FaKey />,
    title: "Property Management",
    desc: "Professional management of residential and commercial properties.",
  },
];

// Why Choose Us
const whyChooseUs: Service[] = [
  {
    icon: <FaChartLine />,
    title: "Integrated Solutions",
    desc: "One-stop shop for all construction and real estate needs.",
  },
  {
    icon: <FaAward />,
    title: "Proven Track Record",
    desc: "Successfully delivered numerous projects across Nigeria.",
  },
  {
    icon: <FaUsers />,
    title: "Expert Team",
    desc: "Skilled professionals with years of industry experience.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Quality Assurance",
    desc: "Premium materials and meticulous attention to detail.",
  },
  {
    icon: <FaCreditCard />,
    title: "Financial Flexibility",
    desc: "Flexible payment plans to suit your budget.",
  },
  {
    icon: <FaHeart />,
    title: "Client-Centric Approach",
    desc: "Your vision and satisfaction are our top priority.",
  },
  {
    icon: <FaClock />,
    title: "Timely Delivery",
    desc: "Committed to meeting deadlines without compromising quality.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    desc: "Modern techniques and innovative solutions for every project.",
  },
];

// Team members
const teamMembers: TeamMember[] = [
  { name: "Bldr. Amuzie Loveth", role: "Chairman/CEO", initials: "AL" },
  { name: "Mr. Gideon Nweze", role: "Chief Admin Officer", initials: "GN" },
  { name: "Bldr. Emmanuel Ononiwu", role: "Project Manager", initials: "EO" },
  { name: "Engr. Chris Obiyor", role: "Site Engineer", initials: "CO" },
];

// Testimonials
interface Testimonial {
  name: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mr. Chukwuemeka Okafor",
    role: "Property Owner, Maitama",
    initials: "CkO",
    rating: 5,
    text: "Dzinex delivered our 4-bedroom duplex ahead of schedule and beyond our expectations. The quality of finishes and attention to detail is simply outstanding. I highly recommend them to anyone looking to build or buy property in Abuja.",
  },
  {
    name: "Mrs. Ngozi Adeyemi",
    role: "Real Estate Investor",
    initials: "NA",
    rating: 5,
    text: "I've partnered with Dzinex on three investment projects and every single time they exceed expectations. Their team is professional, transparent, and delivers world-class results. They are truly where design meets reality.",
  },
  {
    name: "Arch. Babatunde Salami",
    role: "Commercial Developer, Idu",
    initials: "BS",
    rating: 5,
    text: "As an architect, I have very high standards. Dzinex Hybrid Construction executed our commercial plaza project with precision and professionalism that impressed even our international clients. A trusted partner indeed.",
  },
];

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });
  const [inquiryForm, setInquiryForm] = useState<InquiryFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: "",
    message: "",
  });

  useEffect(() => {
    // Loading screen timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const filteredProperties =
    activeFilter === "All"
      ? sampleProperties
      : sampleProperties.filter((p) => p.type === activeFilter);

  const handleInquiry = (property: Property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const handleSubmitInquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({
      type: "success",
      message: "Thank you for your enquiry! We will contact you shortly.",
    });
    setInquiryForm({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => {
      setModalOpen(false);
      setFormStatus({ type: "", message: "" });
    }, 3000);
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({
      type: "success",
      message: "Thank you for your message! We will get back to you soon.",
    });
    setFormData({ name: "", phone: "", email: "", interest: "", message: "" });
    setTimeout(() => setFormStatus({ type: "", message: "" }), 5000);
  };

  const getBadgeClass = (status: string): string => {
    switch (status) {
      case "Available":
        return "badge-available";
      case "Sold":
        return "badge-sold";
      case "Coming Soon":
        return "badge-coming-soon";
      default:
        return "badge-available";
    }
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquiryFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="App">
      {/* Loading Screen */}
      {loading && (
        <div className="loading-screen">
          <div className="loading-content">
            <img
              src="/dzinez_hybrid_ogo.png"
              alt="Dzinex Logo"
              className="loading-logo"
            />
            <div className="loading-text">
              <span className="loading-company">DZINEX</span>
              <span className="loading-tagline">Hybrid Construction Ltd</span>
            </div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="logo" onClick={() => scrollToSection("hero")}>
            <img
              src="/dzinez_hybrid_ogo.png"
              alt="Dzinex Logo"
              className="logo-img"
            />
            <div className="logo-text">
              <span className="company-name">DZINEX</span>
              <span className="tagline">Hybrid Construction Ltd</span>
            </div>
          </div>

          <ul className="nav-links">
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#properties"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("properties");
                }}
              >
                Properties
              </a>
            </li>
            <li>
              <a
                href="#team"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("team");
                }}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("gallery");
                }}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="/dzinex-profile.pdf"
                download="Dzinex Hybrid Construction Ltd Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Our Profile
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="nav-cta"
              >
                Contact Us
              </a>
            </li>
          </ul>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaTimes />
        </button>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
        >
          About Us
        </a>
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("services");
          }}
        >
          Services
        </a>
        <a
          href="#properties"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("properties");
          }}
        >
          Properties For Sale
        </a>
        <a
          href="#real-estate"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("real-estate");
          }}
        >
          Real Estate
        </a>
        <a
          href="#why-choose"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("why-choose");
          }}
        >
          Why Choose Us
        </a>
        <a
          href="#team"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("team");
          }}
        >
          Our Team
        </a>
        <a
          href="#gallery"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("gallery");
          }}
        >
          Gallery
        </a>
        <a
          href="/dzinex-profile.pdf"
          download="Dzinex Hybrid Construction Ltd Profile.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Profile
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
        >
          Contact
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaAward /> Trusted Construction Partner
            </div>
            <h1>
              Where design
              <span>meets reality.</span>
            </h1>
            <p className="hero-tagline">Dzinex Hybrid Construction Ltd.</p>
            <p>
              Dzinex Hybrid Construction Ltd is a leading Nigerian construction
              and real estate development company based in Abuja, delivering
              excellence in building construction, real estate development, and
              property sales.
            </p>
            <div className="hero-buttons">
              <a
                href="#properties"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("properties");
                }}
                className="btn btn-primary"
              >
                View Collection
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="btn btn-outline"
              >
                Contact Us
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          <div
            className="scroll-indicator"
            onClick={() => scrollToSection("about")}
          >
            <span>Scroll</span>
            <FaChevronDown />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                alt="Dzinex Construction"
              />
              <div className="about-image-overlay">
                <div className="number">15+</div>
                <div className="text">Years of Excellence</div>
              </div>
            </div>
            <div className="about-content">
              <span className="section-badge">
                <FaCity /> About Us
              </span>
              <h2>
                Building Excellence Across{" "}
                <span className="highlight">Nigeria</span>
              </h2>
              <p>
                Dzinex Hybrid Construction Ltd is a premier Nigerian
                construction and real estate development company headquartered
                in Abuja. We specialize in delivering world-class construction
                services and premium properties to both public and private
                sector clients across Nigeria.
              </p>
              <p>
                With our integrated approach to construction and real estate
                development, we offer comprehensive solutions from land
                acquisition to property sales, ensuring quality and excellence
                at every stage of the process.
              </p>
              <div className="founder-info">
                <div className="founder-avatar">
                  <FaUserTie />
                </div>
                <div className="founder-details">
                  <h4>Bldr. Amuzie Loveth</h4>
                  <span>Founder & CEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <FaTools /> Our Services
            </span>
            <h2>What We Do</h2>
            <p>
              Comprehensive construction and real estate services tailored to
              meet your needs
            </p>
            <div className="section-divider"></div>
          </div>
          <div className="services-grid">
            {services.map((service, idx) => (
              <div className="service-card" key={idx}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="section properties" id="properties">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <FaHome /> Properties For Sale
            </span>
            <h2>Own a Dzinex Property Today</h2>
            <p>
              We build and sell premium residential and commercial properties
              across Abuja. Find your dream home or investment property below.
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="property-filters">
            {["All", "Residential", "Commercial"].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="properties-grid">
            {filteredProperties.map((property) => (
              <div className="property-card" key={property.id}>
                <div className="property-image">
                  <img src={property.image} alt={property.name} />
                  <span
                    className={`property-badge ${getBadgeClass(property.status)}`}
                  >
                    {property.status}
                  </span>
                  <span className="property-type-badge">{property.type}</span>
                </div>
                <div className="property-content">
                  <h3>{property.name}</h3>
                  <div className="property-location">
                    <FaMapMarkerAlt /> {property.location}
                  </div>
                  <div className="property-features">
                    {property.bedrooms > 0 && (
                      <div className="property-feature">
                        <FaBed /> {property.bedrooms} Beds
                      </div>
                    )}
                    <div className="property-feature">
                      <FaBath /> {property.bathrooms} Baths
                    </div>
                    <div className="property-feature">
                      <FaRulerCombined /> {property.sqft}
                    </div>
                  </div>
                  <div className="property-tags">
                    {property.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="property-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="property-footer">
                    <div className="property-price">{property.price}</div>
                    <button
                      className="property-btn"
                      onClick={() => handleInquiry(property)}
                      disabled={property.status === "Sold"}
                    >
                      {property.status === "Sold" ? "Sold Out" : "Enquire Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Estate Development Section */}
      <section className="section real-estate" id="real-estate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <FaCity /> Real Estate Development
            </span>
            <h2>Our Real Estate Services</h2>
            <p>
              End-to-end real estate development services from land acquisition
              to property management
            </p>
            <div className="section-divider"></div>
          </div>
          <div className="real-estate-grid">
            {realEstateServices.map((service, idx) => (
              <div className="real-estate-card" key={idx}>
                <div className="real-estate-icon">{service.icon}</div>
                <div className="real-estate-content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose" id="why-choose">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <FaCheckCircle /> Why Choose Us
            </span>
            <h2>The Dzinex Advantage</h2>
            <p>
              We combine expertise, innovation, and commitment to deliver
              exceptional results
            </p>
            <div className="section-divider"></div>
          </div>
          <div className="why-choose-grid">
            {whyChooseUs.map((item, idx) => (
              <div className="why-card" key={idx}>
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Build Your Dream?</h2>
            <p>
              Contact us today for a free consultation and let our experts guide
              you from design to delivery.
            </p>
            <div className="cta-buttons">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="btn btn-primary"
              >
                <FaPhone /> Start Your Project
              </a>
              <a
                href="#properties"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("properties");
                }}
                className="btn cta-btn-outline"
              >
                View Properties <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <FaStar /> Client Reviews
            </span>
            <h2>What Our Clients Say</h2>
            <p>
              Don't just take our word for it — hear from the people who've
              trusted us to build their dreams
            </p>
            <div className="section-divider"></div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="testimonial-quote">
                  <FaQuoteLeft />
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div className="testimonial-info">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team" id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <FaUsers /> Our Team
            </span>
            <h2>Meet Our Leadership</h2>
            <p>Experienced professionals dedicated to delivering excellence</p>
            <div className="section-divider"></div>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div className="team-card" key={idx}>
                <div className="team-image">
                  <div className="team-avatar">{member.initials}</div>
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <div className="team-social">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="mailto:dzinexhybridconstruction@gmail.com"
                      aria-label="Email"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery" id="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <FaBuilding /> Projects Gallery
            </span>
            <h2>Our Completed Projects</h2>
            <p>
              A showcase of our finest work including duplexes, 3D flooring, and
              stamp concrete
            </p>
            <div className="section-divider"></div>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image, idx) => (
              <div className="gallery-item" key={idx}>
                <img src={image.url} alt={image.title} />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                  <span>
                    <FaMapMarkerAlt /> {image.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Ready to start your project? Contact us today for a free
                consultation.
              </p>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h4>Our Office</h4>
                  <p>
                    Mbora, Off Idu Industrial Layout
                    <br />
                    Abuja FCT, Nigeria
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h4>Phone Numbers</h4>
                  <a href="tel:+2347034684479">+234 (0)703 4684 479</a>
                  <br />
                  <a href="tel:+2348096909043">+234 (0)809 6909 043</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h4>Email Address</h4>
                  <a href="mailto:dzinexhybridconstruction@gmail.com">
                    dzinexhybridconstruction@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <h3>Send Us a Message</h3>

                {formStatus.type && (
                  <div className={`${formStatus.type}-message`}>
                    {formStatus.message}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>I'm Interested In</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Building a Property">
                      Building a Property
                    </option>
                    <option value="Buying a Property">Buying a Property</option>
                    <option value="Real Estate Investment">
                      Real Estate Investment
                    </option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project or enquiry..."
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message <FaEnvelope />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <img
                  src="/dzinez_hybrid_ogo.png"
                  alt="Dzinex Logo"
                  className="logo-img"
                />
                <div className="logo-text">
                  <span className="company-name">DZINEX</span>
                  <span className="tagline">...where design meets reality</span>
                </div>
              </div>
              <p>
                Dzinex Hybrid Construction Ltd is a leading Nigerian
                construction and real estate development company committed to
                excellence and innovation.
              </p>
              <div className="footer-social">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                  >
                    Our Services
                  </a>
                </li>
                <li>
                  <a
                    href="#properties"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("properties");
                    }}
                  >
                    Properties For Sale
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("gallery");
                    }}
                  >
                    Projects Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/dzinex-profile.pdf"
                    download="Dzinex Hybrid Construction Ltd Profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Our Profile
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                  >
                    Building Construction
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                  >
                    Real Estate Development
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                  >
                    Project Management
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                  >
                    Property Sales
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="tel:+2347034684479">+234 703 468 4479</a>
                </li>
                <li>
                  <a href="tel:+2348096909043">+234 809 690 9043</a>
                </li>
                <li>
                  <a href="mailto:dzinexhybridconstruction@gmail.com">
                    Email Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=Mbora,Abuja,Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mbora, Abuja FCT
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Dzinex Hybrid Construction Ltd.
              All Rights Reserved.
            </p>
            <span className="rc-number">RC: 9323428</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/2347034684479"
        className="whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Inquiry Modal */}
      <div
        className={`modal-overlay ${modalOpen ? "active" : ""}`}
        onClick={() => setModalOpen(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setModalOpen(false)}>
            <FaTimes />
          </button>
          <h3>Enquire About This Property</h3>
          <p>
            {selectedProperty?.name} - {selectedProperty?.location}
          </p>

          {formStatus.type && (
            <div className={`${formStatus.type}-message`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmitInquiry}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={inquiryForm.name}
                onChange={handleInquiryFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone"
                value={inquiryForm.phone}
                onChange={handleInquiryFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={inquiryForm.email}
                onChange={handleInquiryFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell us about your interest in this property..."
                value={inquiryForm.message}
                onChange={handleInquiryFormChange}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

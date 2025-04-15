import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronUp,
  Globe,
  X,
  ChevronDown,
  User,
} from "lucide-react";
import image from "./assets/image/codebg.jpg";

type SectionId =
  | "hero"
  | "Nos services"
  | "avantages"
  | "temoignages"
  | "contact";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [navbarExpanded, setNavbarExpanded] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState<string[]>([]);

  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const advantagesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const callToActionRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const handelButton = () => {};

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const sections = [
        "hero",
        "fonctionnalites",
        "avantages",
        "temoignages",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }

      const checkElement = (
        ref: React.RefObject<HTMLElement | null>,
        id: string
      ) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight * 0.8 &&
            !animatedElements.includes(id)
          ) {
            setAnimatedElements((prev) => [...prev, id]);
          }
        }
      };

      checkElement(heroRef, "hero-section");
      checkElement(featuresRef, "features-section");
      checkElement(advantagesRef, "advantages-section");
      checkElement(testimonialsRef, "testimonials-section");
      checkElement(contactRef, "contact-section");
      checkElement(callToActionRef, "cta-section");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animatedElements]);

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const getAnimationClass = (
    elementId: string,
    animationType: string = "fade-up"
  ) => {
    const baseClass = "transition-all duration-1000 ease-out";

    if (animatedElements.includes(elementId)) {
      return `${baseClass} opacity-100 translate-y-0`;
    }

    switch (animationType) {
      case "fade-up":
        return `${baseClass} opacity-0 translate-y-12`;
      case "fade-in":
        return `${baseClass} opacity-0`;
      case "fade-right":
        return `${baseClass} opacity-0 -translate-x-12`;
      case "fade-left":
        return `${baseClass} opacity-0 translate-x-12`;
      default:
        return `${baseClass} opacity-0`;
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <div
          className={`
            ${navbarExpanded ? "w-full max-w-4xl" : "w-64 md:w-80"} 
            transition-all duration-500 ease-in-out 
            backdrop-blur-md ${
              scrollY > 100 ? "bg-white/90" : "bg-white/80"
            } rounded-full
            shadow-lg text-gray-800
            mx-4
          `}
          onClick={!navbarExpanded ? toggleNavbar : undefined}
        >
          <div
            className={`flex items-center ${
              navbarExpanded
                ? "justify-between px-6 py-3"
                : "justify-center px-4 py-3"
            }`}
          >
            {navbarExpanded ? (
              <>
                <div
                  className="flex items-center gap-2"
                  onClick={() => scrollToSection("hero")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="bg-purple-600 text-white rounded-full p-2">
                    <Globe size={18} />
                  </div>
                  <span className="font-bold">CodeNexGen</span>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className={`hover:bg-purple-50 text-gray-800 text-sm ${
                      activeSection === "fonctionnalites"
                        ? "text-purple-600 font-medium"
                        : ""
                    }`}
                    onClick={() => scrollToSection("Nos services")}
                  >
                    Nos services
                  </Button>
                  <Button
                    variant="ghost"
                    className={`hover:bg-purple-50 text-gray-800 text-sm ${
                      activeSection === "avantages"
                        ? "text-purple-600 font-medium"
                        : ""
                    }`}
                    onClick={() => scrollToSection("avantages")}
                  >
                    Avantages
                  </Button>
                  <Button
                    variant="ghost"
                    className={`hover:bg-purple-50 text-gray-800 text-sm ${
                      activeSection === "temoignages"
                        ? "text-purple-600 font-medium"
                        : ""
                    }`}
                    onClick={() => scrollToSection("temoignages")}
                  >
                    Témoignages
                  </Button>
                  <Button
                    variant="ghost"
                    className={`hover:bg-purple-50 text-gray-800 text-sm ${
                      activeSection === "contact"
                        ? "text-purple-600 font-medium"
                        : ""
                    }`}
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 rounded-full text-xs py-1 px-3 text-white"
                    onClick={() => handelButton()}
                  >
                    Connexion
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-full w-8 h-8 p-0 flex items-center justify-center text-gray-700"
                    onClick={toggleNavbar}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-600 text-white rounded-full p-1">
                    <Globe size={16} />
                  </div>
                  <span className="font-bold text-sm">CodeNexGen</span>
                </div>
                <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center">
                  <User size={14} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && navbarExpanded && (
        <div className="md:hidden fixed top-20 left-0 right-0 z-40 backdrop-blur-md bg-white/90 mx-4 rounded-xl text-gray-800">
          <div className="flex flex-col space-y-1 p-4">
            <Button
              variant="ghost"
              className={`justify-start hover:bg-purple-50 text-gray-800 ${
                activeSection === "fonctionnalites"
                  ? "text-purple-600 font-medium"
                  : ""
              }`}
              onClick={() => scrollToSection("Nos services")}
            >
              Nos services
            </Button>
            <Button
              variant="ghost"
              className={`justify-start hover:bg-purple-50 text-gray-800 ${
                activeSection === "avantages"
                  ? "text-purple-600 font-medium"
                  : ""
              }`}
              onClick={() => scrollToSection("avantages")}
            >
              Avantages
            </Button>
            <Button
              variant="ghost"
              className={`justify-start hover:bg-purple-50 text-gray-800 ${
                activeSection === "temoignages"
                  ? "text-purple-600 font-medium"
                  : ""
              }`}
              onClick={() => scrollToSection("temoignages")}
            >
              Témoignages
            </Button>
            <Button
              variant="ghost"
              className={`justify-start hover:bg-purple-50 text-gray-800 ${
                activeSection === "contact" ? "text-purple-600 font-medium" : ""
              }`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Button>
          </div>
        </div>
      )}

      <div className="h-24"></div>

      <section ref={heroRef} id="hero" className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              className={`order-2 lg:order-1 ${getAnimationClass(
                "hero-section",
                "fade-right"
              )}`}
            >
              <div className="rounded-full animate-pulse overflow-hidden mb-8 w-64 h-16 md:h-24 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-300"></div>

              <div className="mb-8">
                <Button
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 rounded-full mb-4"
                >
                  <ChevronRight size={20} />
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-gray-500">
                  <span className="text-purple-500">CodeNexGen</span> —
                  Propulsez vos idées dans le futur du numérique.
                </h1>
                <p className="text-gray-700">
                  Solutions digitales sur-mesure, conçues pour les esprits
                  visionnaires <span className="font-semibold">innovante</span>{" "}
                  et nos{" "}
                  <span className="font-semibold">technologies avancées</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  className={`bg-white border border-gray-100 shadow-sm p-6 rounded-lg ${getAnimationClass(
                    "hero-section",
                    "fade-up"
                  )}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="flex justify-between mb-2">
                    <h2 className="text-4xl font-bold">136+</h2>
                    <Button variant="ghost" className="rounded-full">
                      <ChevronUp size={20} />
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    projets originaux et implémentations réussies à Madagascar
                    et dans la région
                  </p>
                  <Button
                    variant="link"
                    className="text-purple-600 p-0 mt-4"
                    onClick={() => scrollToSection("temoignages")}
                  >
                    voir tous les projets
                  </Button>
                </div>

                <div
                  className={`bg-purple-50 p-6 rounded-lg ${getAnimationClass(
                    "hero-section",
                    "fade-up"
                  )}`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <div className="flex justify-between mb-2">
                    <h2 className="text-4xl font-bold">15+</h2>
                    <Button variant="ghost" className="rounded-full">
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    années d'expertise en solutions technologiques à Madagascar
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`relative order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-auto ${getAnimationClass(
                "hero-section",
                "fade-left"
              )}`}
            >
              <div className="bg-purple-400 rounded-lg h-full overflow-hidden">
                <img
                  src={image}
                  alt="ERP System"
                  className="w-full h-full object-cover opacity-30"
                />

                <div
                  className={`absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-4 py-2 flex items-center ${getAnimationClass(
                    "hero-section",
                    "fade-in"
                  )}`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <div className="flex -space-x-2 mr-2">
                    <div className="w-8 h-8 rounded-full bg-purple-800"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-300"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                  </div>
                  <span className="font-bold">10+ </span>
                  <span className="text-gray-600 text-sm">/ mission</span>
                </div>

                <div
                  className={`absolute right-16 md:right-24 top-1/3 ${getAnimationClass(
                    "hero-section",
                    "fade-in"
                  )}`}
                  style={{ transitionDelay: "800ms" }}
                >
                  {/* <div className="bg-white bg-opacity-90 rounded-full px-4 py-2">
                    <span className="text-purple-800">solution locale</span>
                  </div> */}
                </div>

                <div
                  className={`absolute right-8 md:right-16 top-1/2 ${getAnimationClass(
                    "hero-section",
                    "fade-in"
                  )}`}
                  style={{ transitionDelay: "1000ms" }}
                >
                  <div className="bg-white bg-opacity-90 rounded-full px-4 py-2">
                    <span className="text-purple-800">design moderne</span>
                  </div>
                </div>

                <div
                  className={`absolute bottom-12 right-4 md:right-12 bg-white rounded-lg p-4 md:p-6 max-w-sm ${getAnimationClass(
                    "hero-section",
                    "fade-in"
                  )}`}
                  style={{ transitionDelay: "1200ms" }}
                >
                  <p className="mb-4">
                    Chez CodeNexGen, nous allions expertise technique, vision
                    futuriste et agilité startup pour créer des solutions
                    logicielles innovantes, robustes et adaptées à vos enjeux
                    métiers. Qu’il s’agisse de développement web, d’applications
                    sur-mesure ou de systèmes intelligents, nous sommes là pour
                    concrétiser vos idées les plus ambitieuses.
                  </p>
                  <div className="flex justify-end">
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-purple-500 to-orange-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              className={`rounded-full border-purple-300 hover:bg-purple-50 flex items-center gap-2 ${getAnimationClass(
                "hero-section",
                "fade-up"
              )}`}
              onClick={() => scrollToSection("Nos services")}
              style={{ transitionDelay: "1400ms" }}
            >
              En savoir plus
              <ChevronDown size={16} />
            </Button>
          </div>
        </div>
      </section>

      <section
        ref={featuresRef}
        id="fonctionnalites"
        className="bg-purple-50 py-16"
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${getAnimationClass(
              "features-section",
              "fade-up"
            )}`}
          >
            Nos services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((num, index) => {
              const titles = [
                "Développement Web & Mobile",
                "Applications sur-mesure",
                "Intégration & API",
                "TConseil Tech & Architecture",
                "MVP & Prototypes",
              ];

              const descriptions = [
                "Sites performants, apps mobiles modernes et responsives.",
                "Solutions métiers personnalisées pour automatiser, fluidifier ou digitaliser vos processus.",
                "Connexions robustes avec vos outils tiers, ERP, CRM ou plateformes SaaS.",
                "Accompagnement dans le choix des technologies, de l’architecture logicielle à la stack optimale..",
                "	Lancement rapide de projets startup-ready avec une logique itérative.",
              ];

              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-sm transform transition-all duration-700 ${getAnimationClass(
                    "features-section",
                    "fade-up"
                  )}`}
                  style={{ transitionDelay: `${200 * index}ms` }}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-purple-600 font-bold">{num}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3">{titles[index]}</h3>
                  <p className="text-gray-600">{descriptions[index]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={advantagesRef} id="avantages" className="py-16">
        <div className="container mx-auto px-4">
          <h2
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${getAnimationClass(
              "advantages-section",
              "fade-up"
            )}`}
          >
            Pourquoi CodeNexGen ?{" "}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className={getAnimationClass("advantages-section", "fade-right")}
            >
              <div className="bg-purple-600 h-72 rounded-lg relative overflow-hidden">
                <img
                  src={image}
                  alt="Dashboard demonstration"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    CodeNexGen{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Approche orientée client & résultats",
                  description: "",
                },
                {
                  title: "Innovation et veille technologique continue",
                  description: "",
                },
                {
                  title: "Code clean, scalable et maintenable",
                  description: "",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${getAnimationClass(
                    "advantages-section",
                    "fade-left"
                  )}`}
                  style={{ transitionDelay: `${300 * index}ms` }}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <label className="text-purple-600 font-bold">✓</label>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={testimonialsRef}
        id="temoignages"
        className="bg-purple-50 py-16"
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${getAnimationClass(
              "testimonials-section",
              "fade-up"
            )}`}
          >
            Ce que disent nos clients à Madagascar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "",
                position: "",
                quote: "",
              },
              {
                name: "",
                position: "",
                quote: "",
              },
              {
                name: "",
                position: "",
                quote: "",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-sm ${getAnimationClass(
                  "testimonials-section",
                  "fade-up"
                )}`}
                style={{ transitionDelay: `${200 * index}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full"></div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={callToActionRef} className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-3xl font-bold mb-6 ${getAnimationClass(
              "cta-section",
              "fade-up"
            )}`}
          >
            Vous avez une idée, un projet ou un besoin spécifique ?
          </h2>
          <p
            className={`text-gray-600 max-w-2xl mx-auto mb-8 ${getAnimationClass(
              "cta-section",
              "fade-up"
            )}`}
            style={{ transitionDelay: "200ms" }}
          >
            Discutons-en dès aujourd’hui et bâtissons ensemble la solution de
            demain.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${getAnimationClass(
              "cta-section",
              "fade-up"
            )}`}
            style={{ transitionDelay: "400ms" }}
          >
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6">
              Contactez CodeNexGen
            </Button>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6"
            >
              Voir les tarifs
            </Button>
          </div>
        </div>
      </section>

      <section ref={contactRef} id="contact" className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h2
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${getAnimationClass(
              "contact-section",
              "fade-up"
            )}`}
          >
            Contactez-nous
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className={getAnimationClass("contact-section", "fade-right")}>
              <h3 className="text-xl font-bold mb-4">
                Nos coordonnées à Madagascar
              </h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    📞
                  </span>
                  <span>+261 34 12 345 67</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    ✉️
                  </span>
                  <span>contact@codeNexGen.mg</span>
                </p>
              </div>
            </div>

            <div
              className={`bg-white p-6 rounded-lg shadow-sm ${getAnimationClass(
                "contact-section",
                "fade-left"
              )}`}
            >
              <h3 className="text-xl font-bold mb-4">
                Envoyez-nous un message
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-md h-32"></textarea>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full py-3">
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white text-purple-600 rounded-full p-2">
                  <Globe size={20} />
                </div>
                <span className="font-bold text-lg">CodeNexGen</span>
              </div>
              <p className="text-gray-300 text-sm">
                Propulsez vos idées dans le futur du numérique.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Button
                    variant="link"
                    className="text-gray-300 p-0 hover:text-white"
                    onClick={() => scrollToSection("hero")}
                  >
                    Accueil
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-300 p-0 hover:text-white"
                    onClick={() => scrollToSection("Nos services")}
                  >
                    Fonctionnalités
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-300 p-0 hover:text-white"
                    onClick={() => scrollToSection("avantages")}
                  >
                    Avantages
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-300 p-0 hover:text-white"
                    onClick={() => scrollToSection("temoignages")}
                  >
                    Témoignages
                  </Button>
                </li>
              </ul>
            </div>

            {/* <div>
              <h3 className="font-bold mb-4">Ressources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Centre d'aide</li>
                <li>Documentation</li>
                <li>Blog</li>
                <li>Webinaires</li>
              </ul>
            </div> */}

            <div>
              <h3 className="font-bold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Confidentialité</li>
                <li>Mentions légales</li>
                <li>CGU</li>
                <li>RGPD</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 CodeNecGen. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Parallax/Floating element */}
      <div
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-purple-700 transition-all"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
          opacity: scrollY > 300 ? 1 : 0,
          pointerEvents: scrollY > 300 ? "auto" : "none",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp size={24} />
      </div>

      {/* Animation decorative elements */}
      <div
        className="fixed top-1/3 left-0 w-8 h-8 bg-purple-500 rounded-full opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      ></div>
      <div
        className="fixed top-2/3 right-0 w-16 h-16 bg-purple-300 rounded-full opacity-20"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      ></div>
      <div
        className="fixed top-1/2 left-8 w-4 h-4 bg-purple-700 rounded-full opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      ></div>
    </div>
  );
}

export default App;

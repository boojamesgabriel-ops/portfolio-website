import Navbar from "@/components/Navbar";
import RubiksLoop from "../components/RubiksLoop";
import ConstructionCity from "@/components/ConstructionCity";
import ScrollExperience from "@/components/ScrollExperience";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="blueprint-background relative min-h-svh overflow-x-clip">
      <ScrollExperience />
      <Navbar className="Navbar"/>

      <div className="hero-transition-stage">
        <section className="hero-layout">
          <div className="hero-column hero-column--left">
            <div className="hero-meta hero-meta--left">
              <span>01.</span>
              <span>SOFTWARE ENGINEER</span>
            </div>

            <div className="hero-statement hero-statement--left">
              <span>SOLVING</span>
              <span>PROBLEMS</span>
            </div>

            <div className="hero-detail hero-detail--left">
              <span className="hero-detail__secondary">T: +63 9196165238</span>
              <span><b>03.</b> M: BOOJAMESGABRIEL@GMAIL.COM</span>
            </div>
          </div>

          <div className="rubiks-loop-position">
            <RubiksLoop />
          </div>

          <div className="hero-column hero-column--right">
            <div className="hero-meta hero-meta--right">
              <span>02.</span>
              <span>PHILIPPINES BASED</span>
            </div>

            <div className="hero-statement hero-statement--right">
              <span>CREATIVE</span>
              <span>SOLUTIONS</span>
            </div>

            <div className="hero-detail hero-detail--right">
              <span className="hero-detail__secondary">FLYRANK AI</span>
              <span><b>04.</b> FRONTEND AI ENGINEER INTERN</span>
            </div>
          </div>
        </section>

        <section className="hero-projects-transition">
          <div className="home-block">
            <div className="outer-block">
              <div className="inner-block" />
            </div>
          </div>

          <div className="line-block" />
          
          <div className="projects-block">
            <div className="outer-block">
              <div className="inner-block" />
            </div>
          </div>

        </section>
      </div>

      <section
        id="projects"
        className="projects-section"
        aria-labelledby="projects-title"
      >
        <div className="projects-entry-signal" aria-hidden="true">
          <span className="projects-entry-signal__line" />
          <span className="projects-entry-signal__label">PROJECTS</span>
        </div>

        <div className="projects-copy">
          <h2 id="projects-title" className="projects-title">
            <span className="projects-title-line">
              <span>Projects are</span>
            </span>
            <span className="projects-title-line">
              <span>still under</span>
            </span>
            <span className="projects-title-line">
              <span>development.</span>
            </span>
          </h2>

          <span className="projects-status">CURRENTLY BUILDING</span>
        </div>
        
        <div className="projects-city-slot">
          <ConstructionCity />
        </div>
      </section>

      <AboutSection />
      <ContactSection />
    </main>
  );
}

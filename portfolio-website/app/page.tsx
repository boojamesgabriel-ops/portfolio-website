import Navbar from "@/components/Navbar";
import RubiksLoop from "../components/RubiksLoop";

export default function Home() {
  return (
    <main className="blueprint-background relative min-h-svh overflow-x-hidden">
      <Navbar />

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
            <span>EFFICIENT</span>
            <span>SOLUTION</span>
          </div>

          <div className="hero-detail hero-detail--right">
            <span className="hero-detail__secondary">FLYRANK AI</span>
            <span><b>04.</b> FRONTEND AI ENGINEER INTERN</span>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        
      </section>
    </main>
  );
}

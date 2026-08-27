import Navbar from "@/components/Navbar";
import RubiksLoop from "../components/RubiksLoop";

export default function Home() {
  return (
    <main className="blueprint-background relative min-h-screen overflow-hidden">
      <Navbar />

      <section className="flex items-center justify-center gap-32">
        <div className="flex flex-col gap-35">
          <div className="flex items-center gap-5 text-[15px]">
            <span className="text-white/50">01.</span>
            <span className="text-white/60 custom-font font-medium">SOFTWARE ENGINEER</span>
          </div>
          <div className="flex flex-col items-end justify-center text-5xl gap-5">
            <span className="custom-font font-[200] text-white/80">SOLVING</span>
            <span className="custom-font font-[200] text-white/50">PROBLEMS</span>
          </div>

          <div className="flex flex-col items-start gap-1 text-[15px]">
            <div className="text-white/60 custom-font ml-11">
              <span>T: +63 9196165238</span>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-white/50">03.</span>
              <span className="text-white/60 custom-font font-medium"> M: BOOJAMESGABRIEL@GMAIL.COM</span>
            </div>
          </div>
        </div>
        
        <div className="rubiks-loop-position">
          <RubiksLoop />
        </div>

        <div className="flex items-end flex-col gap-35">
          <div className="flex gap-5 text-[15px]">
            <span className="text-white/50">02.</span>
            <span className="text-white/60 custom-font font-medium">PHILIPPINES BASED</span>
          </div>

          <div className="flex flex-col justify-center self-start text-5xl gap-5">
            <span className="custom-font font-[200] text-white/80">EFFICIENT</span>
            <span className="custom-font font-[200] text-white/50">SOLUTIONS</span>
          </div>

          <div className="flex flex-col items-end gap-1 text-[15px]">
            <div className="text-white/60 custom-font ml-11">
              <span>FLYRANK AI</span>
            </div>
            <div className="flex gap-5 text-[15px]">
              <span className="text-white/50">04.</span>
              <span className="text-white/60 custom-font font-medium">FRONTEND AI ENGINEER INTERN </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
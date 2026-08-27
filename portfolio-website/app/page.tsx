import Navbar from "@/components/Navbar";
import RubiksLoop from "../components/RubiksLoop";

export default function Home() {
  return (
    <main className="blueprint-background relative min-h-screen overflow-hidden">
      <Navbar />

      <section className="rubiks-loop-position">
        <RubiksLoop />
      </section>
    </main>
  );
}
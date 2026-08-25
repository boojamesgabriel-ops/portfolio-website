import PersonnelCard from "@/components/PersonnelCard";

export default function Home() {
  return (
    <main className="blueprint-background relative min-h-screen overflow-hidden">
      <PersonnelCard />

      <section className="blueprint-ruler pointer-events-none absolute bottom-8 left-0 h-16 w-full" />
    </main>
  );
}
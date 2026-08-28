import type { Metadata } from "next";
import CubeRenderer from "@/components/CubeRenderer";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function CubeRendererPage() {
  return (
    <main className="cube-render-page">
      <CubeRenderer />
    </main>
  );
}

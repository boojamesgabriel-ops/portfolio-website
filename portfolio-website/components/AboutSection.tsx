import Image from "next/image";
import portraitImage from "@/images/professional.jpg";
import type { IconType } from "react-icons";
import { BsOpenai } from "react-icons/bs";
import {
  SiCplusplus,
  SiCss,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiMediapipe,
  SiNextdotjs,
  SiNpm,
  SiOpenjdk,
  SiPhp,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import GitHubActivity from "@/components/GitHubActivity";

type Technology = {
  name: string;
  Icon: IconType;
};

const technologies: Technology[] = [
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "PHP", Icon: SiPhp },
  { name: "Python", Icon: SiPython },
  { name: "Jupyter", Icon: SiJupyter },
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "MediaPipe", Icon: SiMediapipe },
  { name: "C++", Icon: SiCplusplus },
  { name: "Java", Icon: SiOpenjdk },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "npm", Icon: SiNpm },
  { name: "Vercel", Icon: SiVercel },
  { name: "OpenAI", Icon: BsOpenai },
  { name: "GSAP", Icon: SiGreensock },
  { name: "React Three Fiber", Icon: SiThreedotjs },
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-header-wrapper">
        <div className="about-title-container">
          <span className="about-title-line" id="about-title">
            ABOUT
          </span>
          <span className="about-subheader-line">
            Driven by curiosity, defined by clarity
          </span>
        </div>

        <div className="connect-experiences-container">
          <a href="#contact" className="touch-link">
            Get In Touch
          </a>
          <div
            className="experiences-achievements-link"
          >
            <span>James Gabriel Boo</span>
          </div>
        </div>
      </div>

      <div className="about-middle-section-container">
        <section className="about-biography" aria-labelledby="about-message-title">
          <h3 id="about-message-title">
            I transform complex problems into intelligent, practical AI solutions.
          </h3>
          <p>
            I am a third-year Computer Science student at Far Eastern University -
            Institute of Technology and a Frontend AI Engineering Intern at Flyrank
            AI.
          </p>
          <p>
            I am learning to build intelligent AI systems and creative tools that transform complex challenges into practical solutions. I am especially interested in AI engineering, problem‑solving workflows, computer vision, and the architectures behind intelligent applications.
          </p>
        </section>

        <div className="about-portrait">
          <Image
            className="about-portrait__image"
            src={portraitImage}
            alt="Portrait of James Gabriel Boo"
            fill
            sizes="(max-width: 899px) 100vw, 30vw"
          />
        </div>

        <section className="about-tools-panel" aria-labelledby="tools-title">
          <div className="about-strip-heading">
            <span id="tools-title">LANGUAGES / TOOLS</span>
          </div>
          <div className="about-tools-marquee">
            <div className="about-tools-track">
              {[...technologies, ...technologies].map(({ name, Icon }, index) => {
                const isDuplicate = index >= technologies.length;

                return (
                  <span
                    className="about-tool-logo"
                    key={`${name}-${index}`}
                    role={isDuplicate ? undefined : "img"}
                    aria-label={isDuplicate ? undefined : name}
                    aria-hidden={isDuplicate || undefined}
                    title={name}
                  >
                    <Icon aria-hidden="true" focusable="false" />
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-github-panel" aria-labelledby="github-activity-title">
          <GitHubActivity />
        </section>
      </div>
    </section>
  );
}

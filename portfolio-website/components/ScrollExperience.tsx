"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function ScrollExperience() {
  const progressRef = useRef<HTMLSpanElement>(null);
  const sectionLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const progress = progressRef.current;
    const sectionLabel = sectionLabelRef.current;

    if (!progress || !sectionLabel) {
      return;
    }

    let refreshTimer: number | undefined;

    const refreshScrollMeasurements = () => {
      if (refreshTimer !== undefined) {
        window.clearTimeout(refreshTimer);
      }

      refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 260);
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        refreshScrollMeasurements();
      }
    };

    window.addEventListener("resize", refreshScrollMeasurements);
    window.addEventListener("orientationchange", refreshScrollMeasurements);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    const context = gsap.context(() => {
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.15,
        },
      });

      ScrollTrigger.create({
        trigger: ".projects-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          sectionLabel.textContent = "PROJECTS";
        },
        onEnterBack: () => {
          sectionLabel.textContent = "PROJECTS";
        },
        onLeaveBack: () => {
          sectionLabel.textContent = "HOME";
        },
      });

      const motion = gsap.matchMedia();

      motion.add(
        "(min-width: 1440px) and (min-height: 648px) and (prefers-reduced-motion: no-preference)",
        () => {
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero-layout",
              start: "top top",
              end: "+=90%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          heroTimeline
            .to(
              ".rubiks-frame",
              {
                yPercent: 50,
                opacity: 1,
                ease: "slow(0.7, 0.7, false)",
              },
              0.6,
            )
            .to(
              ".rubiks-loop-position",
              {
                yPercent: -50,
                opacity: 1,
                ease: "slow(0.7, 0.7, false)",
              },
              0.6,
            )
            .to(
              ".hero-column--left",
              { xPercent: -20, opacity: 0, ease: "slow(0.7, 0.7, false)" },
              0.2,
            )
            .to(
              ".hero-column--right",
              { xPercent: 20, opacity: 0, ease: "slow(0.7, 0.7, false)" },
              0.2,
            )
            .to(
              ".blueprint-nav",
              { yPercent: -20, opacity: 0, ease: "none" },
              0.01,
            )
            .to(".rubiks-shell", {
              "--rubiks-edge-size": "100%",
              ease: "none", }, 
              0.08,
            );
        },
      );

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".projects-section",
              start: "top 82%",
              end: "top 30%",
              scrub: 0.5,
            },
          })
          .fromTo(
            ".projects-entry-signal__line",
            { scaleY: 0 },
            { scaleY: 1, transformOrigin: "top center", ease: "none" },
          )
          .fromTo(
            ".projects-entry-signal__label",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, ease: "none" },
            0.35,
          );

        gsap.fromTo(
          ".projects-title-line > span",
          { yPercent: 112 },
          {
            yPercent: 0,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-copy",
              start: "top 78%",
              end: "top 40%",
              scrub: 0.55,
            },
          },
        );

        gsap.fromTo(
          [".projects-index", ".projects-status"],
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".projects-copy",
              start: "top 80%",
              end: "top 48%",
              scrub: 0.5,
            },
          },
        );
      });

      return () => motion.revert();
    });

    return () => {
      window.removeEventListener("resize", refreshScrollMeasurements);
      window.removeEventListener("orientationchange", refreshScrollMeasurements);
      document.removeEventListener("visibilitychange", refreshWhenVisible);

      if (refreshTimer !== undefined) {
        window.clearTimeout(refreshTimer);
      }

      context.revert();
    };
  }, []);

  return (
    <div className="scroll-ruler" aria-hidden="true">
      <span ref={sectionLabelRef} className="scroll-ruler__label">
         HOME
      </span>
      <span className="scroll-ruler__track">
        <span ref={progressRef} className="scroll-ruler__progress" />
      </span>
      <span className="scroll-ruler__end">SCROLL</span>
    </div>
  );
}

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
          const connectionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero-transition-stage",
              start: "top top",
              end: "+=220%",
              pin: true,
              pinSpacing: true,
              scrub: 1.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

            gsap.set([".home-block", ".projects-block"], {
              autoAlpha: 0,
              scale: 0.72,
            });

            gsap.set(".line-block", {
              scaleY: 0,
              transformOrigin: "top center",
            });

            connectionTimeline
              .to(".rubiks-shell", {
                "--rubiks-edge-progress": 1,
                duration: 0.55,
                ease: "none",
              })

              .to(".blueprint-nav", {
                yPercent: -20,
                autoAlpha: 0,
                duration: 0.45,
                ease: "none",
              })

              .to([".hero-column--left", ".hero-column--right"], {
                yPercent: -20,
                autoAlpha: 0,
                duration: 0.65,
                ease: "none",
              })

              .to(".rubiks-frame", {
                yPercent: 160,
                autoAlpha: 0,
                duration: 8,
                ease: "none",
              })

              .to(".home-block", {
                autoAlpha: 1,
                scale: 1,
                duration: 0.3,
                ease: "none",
              })

               .to(".line-block", {
                scaleY: 1,
                duration: 0.8,
                transformOrigin: "top center",
                ease: "none",
               })

               .to(".projects-block", {
                autoAlpha: 1,
                scale: 1,
                duration: 0.3,
                ease: "none",
               });


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

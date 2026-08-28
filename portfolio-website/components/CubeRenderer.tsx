"use client";

import { useEffect, useRef } from "react";
import type { TwistyPlayer as TwistyPlayerElement } from "cubing/twisty";

const SCRAMBLE = "R U R' U' F2 L D2 B' R2";
const START_DELAY_MS = 600;
const LOOP_DURATION_MS = 24000;

export default function CubeRenderer() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    let cancelled = false;
    let loopTimer: number | undefined;
    let player: TwistyPlayerElement | null = null;

    async function createPlayer(container: HTMLDivElement) {
      const [{ TwistyPlayer }, { Alg }] = await Promise.all([
        import("cubing/twisty"),
        import("cubing/alg"),
      ]);

      if (cancelled) {
        return;
      }

      const scramble = new Alg(SCRAMBLE);
      const cycleAlgorithm = `${scramble.toString()} ${scramble
        .invert()
        .toString()}`;

      const createdPlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: cycleAlgorithm,
        background: "none",
        controlPanel: "none",
        backView: "none",
        hintFacelets: "none",
        cameraDistance: 5.7,
      });

      player = createdPlayer;
      createdPlayer.classList.add("cube-render-player");
      container.replaceChildren(createdPlayer);

      const playCycle = () => {
        if (cancelled || player !== createdPlayer) {
          return;
        }

        createdPlayer.jumpToStart({ flash: false });
        createdPlayer.play();

        loopTimer = window.setTimeout(playCycle, LOOP_DURATION_MS);
      };

      loopTimer = window.setTimeout(playCycle, START_DELAY_MS);
    }

    void createPlayer(host).catch((error: unknown) => {
      console.error("CubeRenderer failed to initialize:", error);
    });

    return () => {
      cancelled = true;

      if (loopTimer !== undefined) {
        window.clearTimeout(loopTimer);
      }

      player?.pause();
      player?.remove();
    };
  }, []);

  return <div ref={hostRef} className="cube-render-player-host" />;
}

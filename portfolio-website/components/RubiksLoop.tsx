"use client";

import { useEffect, useRef } from "react";
import type { TwistyPlayer as TwistyPlayerElement } from "cubing/twisty";

const SCRAMBLE = "R U R' U' F2 L D2 B' R2";
const START_DELAY_MS = 600;
const LOOP_DURATION_MS = 24000;

export default function RubiksLoop() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = hostRef.current;

    if (container === null) {
      return;
    }

    let cancelled = false;
    let loopTimer: number | undefined;
    let player: TwistyPlayerElement | null = null;

    async function createPlayer(host: HTMLDivElement) {
      const [{ TwistyPlayer }, { Alg }] = await Promise.all([
        import("cubing/twisty"),
        import("cubing/alg"),
      ]);

      if (cancelled) {
        return;
      }

      const scramble = new Alg(SCRAMBLE);
      const solution = scramble.invert();

      const cycleAlgorithm =
        `${scramble.toString()} ${solution.toString()}`;

      const createdPlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: cycleAlgorithm,
        background: "none",
        controlPanel: "none",
      });

      player = createdPlayer;

      createdPlayer.classList.add("rubiks-player");

      createdPlayer.setAttribute(
        "aria-label",
        "A Rubik's Cube repeatedly scrambling and solving itself",
      );

      host.replaceChildren(createdPlayer);

      const playCycle = () => {
        if (cancelled || player === null) {
          return;
        }

        player.jumpToStart({ flash: false });
        player.play();

        loopTimer = window.setTimeout(
          playCycle,
          LOOP_DURATION_MS,
        );
      };

      loopTimer = window.setTimeout(
        playCycle,
        START_DELAY_MS,
      );
    }

    void createPlayer(container).catch((error: unknown) => {
      console.error(
        "RubiksLoop failed to initialize:",
        error,
      );

      if (!cancelled) {
        container.textContent = "Cube failed to load";
      }
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

  return (
    <div
      ref={hostRef}
      className="rubiks-shell"
      aria-live="off"
    />
  );
}
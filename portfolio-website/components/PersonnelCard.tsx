"use client";

import Image from "next/image";
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import gsap from "gsap";

function ProfilePhoto({ compact = false }: { compact?: boolean}) {
    return (
        <div className={`profile-photo relative overflow-hidden ${
            compact ? "aspect-[4/5]" : "min-h-[420px]"
        }`}
        >
            <span className="absolute inset-0 grid place-items-center font-mono text-xs text-black/60">
                PORTRAIT UNAVAILABLE
            </span>

            <Image
                src="images/profile.jpg"
                alt="Portrait of James Gabriel Boo"
                fill
                sizes={compact ? "112" : "(max-width: 768px) 100vw, 440px"}
                className="object-cover grayscale contrast-125"
                onError={(event) => {
                    event.currentTarget.style.display = "none";
                }}
            />
        </div>
    )
}
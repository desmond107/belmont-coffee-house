"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Full-bleed looping hero video that keeps playing.
 *
 * Browsers only autoplay muted, inline video, and can still pause it (iOS Low
 * Power Mode, background tabs, data saver, stalled network). So we:
 *  - force `muted` on the element (React doesn't reliably render the attribute),
 *  - retry play() on load, tab return, first user interaction and a watchdog,
 *  - restart manually if a browser fails to loop,
 *  - fall back to the poster image if the video can't play at all.
 * A pause button is provided for accessibility (WCAG 2.2.2), and a visitor's
 * choice to pause is respected.
 */
export function HeroVideo({ mp4, webm, poster, label, controlsId }: { mp4: string; webm?: string; poster: string; label: string; controlsId?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (controlsId) setSlot(document.getElementById(controlsId));
  }, [controlsId]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    const tryPlay = () => {
      if (userPaused.current || document.hidden) return;
      if (v.paused || v.ended) v.play().catch(() => {});
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => {
      setPlaying(false);
      if (!userPaused.current) setTimeout(tryPlay, 300);
    };
    const onEnded = () => {
      v.currentTime = 0;
      tryPlay();
    };
    const onVisible = () => !document.hidden && tryPlay();
    const onInteract = () => tryPlay();

    v.addEventListener("play", onPlay);
    v.addEventListener("playing", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("stalled", tryPlay);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onVisible);
    const opts = { passive: true } as const;
    ["touchstart", "pointerdown", "scroll", "keydown"].forEach((e) => window.addEventListener(e, onInteract, opts));

    tryPlay();
    const watchdog = window.setInterval(tryPlay, 2000);

    return () => {
      window.clearInterval(watchdog);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("playing", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("stalled", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onVisible);
      ["touchstart", "pointerdown", "scroll", "keydown"].forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <>
      {failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={ref}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          disablePictureInPicture
          disableRemotePlayback
          aria-label={label}
          onError={() => setFailed(true)}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
      {!failed &&
        slot &&
        createPortal(
          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/40 bg-espresso/40 text-cream backdrop-blur transition-colors hover:bg-espresso/70"
            aria-label={playing ? "Pause background video" : "Play background video"}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}
            </svg>
          </button>,
          slot,
        )}
    </>
  );
}

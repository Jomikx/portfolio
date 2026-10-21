"use client";

import { useEffect, useRef, useState } from "react";

// Unit directions for each photo. The photo closest to the pointer direction is shown.
const POS = {
  right: [1, 0],
  left: [-1, 0],
  up: [0, 1],
  down: [0, -1],
  "up-left": [-0.707, 0.707],
  "up-right": [0.707, 0.707],
  "down-left": [-0.707, -0.707],
  "down-right": [0.707, -0.707],
};
const ALL = ["center", ...Object.keys(POS)];
// Order used when nobody is touching the screen on a phone or tablet
const SWEEP = ["center", "right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"];

export default function HeadPhoto() {
  const [cur, setCur] = useState("center");
  const stage = useRef(null);
  const curRef = useRef("center");
  const last = useRef(0);

  function show(k) {
    if (k === curRef.current) return;
    curRef.current = k;
    setCur(k);
  }

  useEffect(() => {
    let queued = false;
    let px = 0;
    let py = 0;

    function score(k, nx, ny) {
      return POS[k][0] * nx + POS[k][1] * ny;
    }

    function update() {
      queued = false;
      const el = stage.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = r.top + r.height * 0.4 - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      const c = curRef.current;
      if (d < (c === "center" ? 70 : 50)) {
        show("center");
        return;
      }
      const nx = dx / d;
      const ny = dy / d;
      let best = "right";
      let bs = -2;
      Object.keys(POS).forEach((k) => {
        const s = score(k, nx, ny);
        if (s > bs) {
          bs = s;
          best = k;
        }
      });
      // stay on the current photo near a boundary so it does not flicker
      if (c !== "center" && score(c, nx, ny) >= bs - 0.12) return;
      show(best);
    }

    function onMove(e) {
      last.current = Date.now();
      px = e.clientX;
      py = e.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }

    function onLeave() {
      show("center");
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    document.addEventListener("pointerleave", onLeave);

    // Phones and tablets have no hover, so look around on its own until someone touches the screen
    let sweep = null;
    const noHover = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover && !reduce) {
      let i = 0;
      sweep = setInterval(() => {
        if (Date.now() - last.current < 3500) return;
        i = (i + 1) % SWEEP.length;
        show(SWEEP[i]);
      }, 1300);
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (sweep) clearInterval(sweep);
    };
  }, []);

  return (
    <div className="stage" ref={stage} role="img" aria-label="Photo of Aljo Tacud">
      {ALL.flatMap((k) =>
        ["d", "l"].map((t) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={k + t}
            src={`/head/${t}/${k}.png`}
            alt=""
            draggable={false}
            className={(k === cur ? "on " : "") + t}
            decoding="async"
          />
        ))
      )}
    </div>
  );
}

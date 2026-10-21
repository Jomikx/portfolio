"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { t: "name", text: "Hi! I'm Aljo, welcome to my portfolio." },
  { t: "facts", text: "My school, my OJT, and two school activities you can open." },
  { t: "nav-ba", text: "Here is how I built sites before AI, and how I build now." },
  { t: "nav-projects", text: "My school activities. Each one opens as its own page." },
  { t: "nav-workshop", text: "Hands-on IT work from my OJT at an ISP office." },
  { t: "nav-basics", text: "The fundamentals I still do by hand." },
  { t: "nav-stack", text: "The tools I build with." },
  { t: "nav-contact", text: "Email, GitHub or Facebook. No forms." },
  { t: "ask", text: "Ask me anything here. Alt + K on a keyboard." },
  { t: "theme", text: "Light, dark or auto. Your choice." },
  { t: "name", text: "That's the tour. Enjoy!" },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Tour() {
  const [running, setRunning] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100, flipX: false, flipY: false });
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const run = useRef(0);
  const on = useRef(false);
  const cur = useRef(null);
  const raf = useRef(0);

  // keep the head photo looking at the fake cursor
  useEffect(() => {
    if (!running) return;
    function loop() {
      const el = cur.current;
      if (el) {
        const r = el.getBoundingClientRect();
        window.dispatchEvent(new PointerEvent("pointermove", { clientX: r.left, clientY: r.top }));
      }
      raf.current = requestAnimationFrame(loop);
    }
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  function stop() {
    run.current++;
    on.current = false;
    setRunning(false);
    setShow(false);
    setText("");
  }

  async function start() {
    const id = ++run.current;
    on.current = true;
    setRunning(true);
    setShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    await wait(700);
    for (let i = 0; i < STEPS.length; i++) {
      if (run.current !== id) return;
      const el = document.querySelector(`[data-tour="${STEPS[i].t}"]`);
      if (!el) continue;
      let r = el.getBoundingClientRect();
      if (r.top < 70 || r.bottom > window.innerHeight - 90) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        await wait(800);
        r = el.getBoundingClientRect();
      }
      if (run.current !== id) return;
      const x = r.left + Math.min(r.width * 0.45, 140);
      const y = r.top + r.height * 0.55;
      const flipX = x > window.innerWidth - 300;
      const flipY = y > window.innerHeight - 140;
      setShow(false);
      setPos({ x, y, flipX, flipY });
      await wait(1300);
      if (run.current !== id) return;
      setShow(true);
      const msg = STEPS[i].text;
      for (let c = 1; c <= msg.length; c++) {
        if (run.current !== id) return;
        setText(msg.slice(0, c));
        await wait(32);
      }
      await wait(2000);
    }
    if (run.current !== id) return;
    setShow(false);
    await wait(500);
    if (run.current === id) stop();
  }

  // first visit on a desktop-sized screen: run once
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem("toured") === "1";
    } catch (e) {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce || window.innerWidth <= 900) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem("toured", "1");
      } catch (e) {}
      start();
    }, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("tour-state", { detail: running }));
  }, [running]);

  useEffect(() => {
    function toggle() {
      if (on.current) stop();
      else start();
    }
    window.addEventListener("tour-toggle", toggle);
    return () => window.removeEventListener("tour-toggle", toggle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && run.current) stop();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {running && (
        <div
          ref={cur}
          className="tc"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          aria-hidden="true"
        >
          <svg width="18" height="20" viewBox="0 0 18 20">
            <path d="M1 1l14 7-6 2-2 7z" fill="#fff" stroke="#111" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          <div className={"tb" + (show ? " on" : "") + (pos.flipX ? " fx" : "") + (pos.flipY ? " fy" : "")}>
            <span>Aljo</span>
            {text}
          </div>
        </div>
      )}
      {running && (
        <div className="tpill">
          <button type="button" onClick={stop}>skip tour</button>
        </div>
      )}
    </>
  );
}

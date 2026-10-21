"use client";

import { useEffect, useRef, useState } from "react";
import { site, sections } from "../lib/content";
import Ask from "./Ask";
import Tour from "./Tour";

export default function Shell({ children }) {
  const [theme, setTheme] = useState("dark");
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [touring, setTouring] = useState(false);
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const f = (e) => setTouring(!!e.detail);
    window.addEventListener("tour-state", f);
    return () => window.removeEventListener("tour-state", f);
  }, []);

  // saved theme
  useEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t === "light" || t === "dark" || t === "auto") setTheme(t);
    } catch (e) {}
  }, []);

  function chooseTheme(m) {
    setTheme(m);
    const root = document.documentElement;
    if (m === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", m);
    try {
      localStorage.setItem("theme", m);
    } catch (e) {}
  }

  // local time
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-PH", {
          timeZone: site.timeZone,
          hour: "numeric",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // highlight the section being read
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setCurrent(en.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // keyboard: Alt+K or Ctrl+K opens the jump menu, Esc closes it
  useEffect(() => {
    function onKey(e) {
      const mod = e.altKey || e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(false);
        setAskOpen(true);
      }
      if (mod && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setAskOpen(false);
        setOpen(true);
        setQuery("");
      }
      if (e.key === "Escape") {
        setMenu(false);
        setOpen(false);
        setAskOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);
    return () => document.body.classList.remove("menu-open");
  }, [menu]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const results = sections.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  function jump(id) {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="tn" href="#top" onClick={() => setMenu(false)}>{site.short}</a>
        <button
          className="burger"
          type="button"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu((v) => !v)}
        >
          <span aria-hidden="true">{menu ? "✕" : "☰"}</span>
        </button>
      </header>
      <aside className={menu ? "side menu" : "side"}>
        <div>
          <div className="nm">{site.short}</div>
          <div className="loc">
            {site.location} · <span>{time || "--:--"}</span>
          </div>
        </div>
        <hr />
        <nav aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-tour={`nav-${s.id}`}
              onClick={() => setMenu(false)}
              aria-current={current === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="grow" />
        <hr />
        <button className="keyrow tourrow" type="button" onClick={() => window.dispatchEvent(new Event("tour-toggle"))}>
          {touring ? "Skip the tour" : "Take the tour"} <kbd>↻</kbd>
        </button>
        <button className="keyrow" data-tour="ask" type="button" onClick={() => { setMenu(false); setAskOpen(true); }}>
          Ask anything <span className="kk"><kbd>Alt</kbd>+<kbd>K</kbd></span>
        </button>
        <button className="keyrow" type="button" onClick={() => { setMenu(false); setOpen(true); setQuery(""); }}>
          Jump to section <span className="kk"><kbd>Alt</kbd>+<kbd>J</kbd></span>
        </button>
        <hr />
        <div className="seg" data-tour="theme" role="group" aria-label="Theme">
          {["auto", "light", "dark"].map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={theme === m}
              onClick={() => chooseTheme(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <div>
          <p className="sm">
            For internships, projects and everything else, reach me at
          </p>
          <div className="mail">{site.email}</div>
        </div>
      </aside>

      <div className="wrap">{children}</div>

      <Tour />

      <Ask open={askOpen} onClose={() => setAskOpen(false)} />

      <div
        className={open ? "pal open" : "pal"}
        role="dialog"
        aria-label="Jump to a section"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="box">
          <input
            ref={inputRef}
            type="text"
            placeholder="jump to..."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) jump(results[0].id);
            }}
          />
          <ul>
            {results.map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => jump(s.id)}>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

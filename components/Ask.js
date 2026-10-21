"use client";

import { useEffect, useRef, useState } from "react";

function device() {
  const ua = navigator.userAgent || "";
  const p = (navigator.userAgentData && navigator.userAgentData.platform) || "";
  let os = p || "unknown";
  if (/Windows/i.test(ua)) os = "windows";
  else if (/Android/i.test(ua)) os = "android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "ios";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = "mac";
  else if (/Linux/i.test(ua)) os = "linux";
  const cores = navigator.hardwareConcurrency;
  const mem = navigator.deviceMemory;
  let s = `you are on a ${os.toLowerCase()} device`;
  if (cores) s += ` with ${cores} processor cores`;
  if (mem) s += ` and ${mem >= 8 ? "8gb or more" : mem + "gb"} of memory`;
  return s;
}

function buildLines(d) {
  const place = [d.city, d.region, d.country].filter(Boolean).join(", ");
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();
  const lines = ["here is what your browser already shared the moment you opened this site"];
  lines.push(d.ip ? `your public ip address is ${d.ip}` : "i could not read your public ip address");
  if (d.isp) lines.push(`you are connected through ${d.isp.toLowerCase()}`);
  if (place) lines.push(`you appear to be in ${place.toLowerCase()}`);
  if (d.lat && d.lon) lines.push(`your approximate coordinates are around ${Number(d.lat).toFixed(2)}, ${Number(d.lon).toFixed(2)}`);
  lines.push(device());
  lines.push(`your timezone is ${tz.toLowerCase()} and it is around ${time} where you are`);
  lines.push("none of this needed your permission");
  lines.push("your browser shares it with every website you open, automatically");
  lines.push("so be mindful of what you click, and who you trust online");
  lines.push("as for your question");
  lines.push("i don't want to waste tokens on that, search for it yourself :)");
  return lines;
}

export default function Ask({ open, onClose }) {
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState("");
  const [phase, setPhase] = useState("input"); // input | thinking | lines | done
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const run = useRef(0);

  useEffect(() => {
    run.current++;
    if (open) {
      setQ("");
      setAsked("");
      setText("");
      setPhase("input");
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
    }
  }, [open]);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function submit(e) {
    e.preventDefault();
    const question = q.trim();
    if (!question || phase !== "input") return;
    const id = ++run.current;
    setAsked(question);
    setPhase("thinking");
    let d = {};
    try {
      const r = await fetch("/api/ask", { method: "POST" });
      d = await r.json();
    } catch (err) {}
    await wait(900);
    if (run.current !== id) return;
    const lines = d.limited ? ["that is a lot of questions. try again in a minute"] : buildLines(d);
    setPhase("lines");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let c = 1; c <= line.length; c += 1) {
        if (run.current !== id) return;
        setText(line.slice(0, c));
        await wait(34);
      }
      setText(line);
      if (i < lines.length - 1) await wait(2400);
      if (run.current !== id) return;
    }
    setPhase("done");
  }

  function again() {
    run.current++;
    setQ("");
    setAsked("");
    setText("");
    setPhase("input");
    setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
  }

  return (
    <div
      className={open ? "ask open" : "ask"}
      role="dialog"
      aria-label="Ask anything"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="askbox">
        {phase === "input" && (
          <form onSubmit={submit}>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="what do you want to ask?"
              maxLength={200}
              autoComplete="off"
              aria-label="Your question"
            />
          </form>
        )}
        {phase === "thinking" && (
          <div>
            <div className="askq">{asked}</div>
            <p className="askthink"><span className="dots" aria-hidden="true" /> analyzing…</p>
          </div>
        )}
        {(phase === "lines" || phase === "done") && (
          <p className="askline" aria-live="polite">{text}</p>
        )}
        <div className="askhint">
          {phase === "done" ? (
            <button type="button" onClick={again}>ask something else</button>
          ) : (
            "Esc to close"
          )}
        </div>
      </div>
    </div>
  );
}

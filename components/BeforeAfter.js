"use client";

import { useState } from "react";

// The "before" side is a plain early-2020s site. The "after" side is the style of this portfolio.
export default function BeforeAfter() {
  const [p, setP] = useState(22);

  return (
    <div className="ba" style={{ "--p": `${p}%` }}>
      <span className="lab b">before ai</span>
      <span className="lab a">after ai</span>

      <div className="old" aria-hidden="true">
        <div className="nb">
          <b>Aljo&apos;s Website</b>
          <div>
            <span>Home</span>
            <span>About</span>
            <span>Projects</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="jb">
          <h4>Hi! My name is Aljo.</h4>
          <p>I am a Computer Science student.</p>
          <u>My Projects</u>
        </div>
        <div className="cols">
          <div><b>About</b>Student at PDM</div>
          <div><b>Projects</b>School activities</div>
          <div><b>Contact</b>Send me an email</div>
        </div>
      </div>

      <div className="new" aria-hidden="true">
        <div className="ns">
          <b>Aljo Tacud</b>
          <i>Projects</i>
          <i>Workshop</i>
          <i>Foundations</i>
          <i>Stack</i>
        </div>
        <div className="nm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pd" src="/head/d/center.png" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pl" src="/head/l/center.png" alt="" />
          <div className="nt">
            <div className="k">portfolio · now</div>
            <div className="t">
              Build fast.
              <br />
              Understand deeper.
            </div>
            <div className="c">
              <i>React</i>
              <i>Flutter</i>
              <i>TypeScript</i>
            </div>
          </div>
        </div>
      </div>

      <div className="h" />
      <input
        type="range"
        min="0"
        max="100"
        value={p}
        onChange={(e) => setP(Number(e.target.value))}
        aria-label="Before and after slider"
      />
    </div>
  );
}

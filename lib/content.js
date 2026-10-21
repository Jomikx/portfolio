// All the text on the site lives here. Edit this file to change your content.

export const site = {
  name: "Aljo M. Tacud",
  short: "Aljo Tacud",
  location: "Marilao, Bulacan",
  timeZone: "Asia/Manila",
  email: "tacudaljomantalaba@gmail.com",
  github: "https://github.com/Jomikx",
  facebook: "https://www.facebook.com/aljo.tacud/",
  intro:
    "I build with React and Flutter. I use AI to move fast, and my own fundamentals to know what it built.",
  school:
    "BS Computer Science student at Pambayang Dalubhasaan ng Marilao. Marilao, Bulacan.",
};

export const sections = [
  { id: "ba", label: "Before / After" },
  { id: "projects", label: "Projects" },
  { id: "workshop", label: "Workshop" },
  { id: "basics", label: "Foundations" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export const projects = [
  {
    id: "F3",
    title: "jQuery Activity",
    tags: "HTML · CSS · jQuery",
    desc: "A student profile page built with jQuery. Buttons change the title and hide or show the profile card, a dropdown reports the chosen course, and a student table can be striped by odd or even rows and shown or hidden.",
    href: "/projects/finals-activity-3/index.html",
    open: false,
  },
  {
    id: "F2",
    title: "JavaScript Demo",
    tags: "HTML · CSS · JavaScript",
    desc: 'A dashboard that loads Profile, Grades and Schedule with three Promises at 1, 2 and 3 seconds. Promise.all() waits for all of them, then shows "Dashboard Ready!"',
    href: "/projects/finals-activity-2/index.html",
  },
  {
    id: "F1",
    title: "DOM Activity",
    tags: "HTML · CSS · JavaScript",
    desc: "A form card with a nickname field, a year-level dropdown, and Click, DoubleClick and Press & Hold buttons. The page reacts to each mouse event and shows a status bar when the pointer enters or leaves the form.",
    href: "/projects/finals-activity-1/index.html",
  },
];

export const workshop = [
  { title: "Routers", text: "Hands-on router configuration" },
  { title: "Servers", text: "Day-to-day server work" },
  { title: "Monitoring", text: "Network and service monitoring" },
  { title: "Company website", text: "Helped develop their official website" },
  { title: "Laptop repair", text: "Hardware troubleshooting and repair" },
];

export const foundations = [
  { title: "Reading code", text: "Tracing what it really does" },
  { title: "Logic", text: "Steps that can be checked" },
  { title: "Schema design", text: "Tables that still make sense later" },
  { title: "Prompts", text: "Ask clearly, then verify" },
];

export const stack = [
  "Flutter",
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Laravel",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "PyTorch",
  "Claude Code",
  "HTML",
  "CSS",
];

export const facts = [
  { value: "BSCS", label: "Pambayang Dalubhasaan ng Marilao" },
  { value: "OJT", label: "RACITELCOM, Inc." },
  { value: "3", label: "Activities you can open" },
];

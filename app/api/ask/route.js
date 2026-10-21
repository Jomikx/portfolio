export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Shows each visitor what their own browser already shared with this site.
// Nothing is saved or logged. The IP is only held in memory for a minute to limit repeat questions.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 12;
}

const REGIONS = {
  sin1: "Singapore", hnd1: "Tokyo", icn1: "Seoul", bom1: "Mumbai", syd1: "Sydney",
  iad1: "Washington DC", sfo1: "San Francisco", cle1: "Cleveland", pdx1: "Portland",
  fra1: "Frankfurt", lhr1: "London", cdg1: "Paris", arn1: "Stockholm", dub1: "Dublin",
  gru1: "Sao Paulo", cpt1: "Cape Town", hkg1: "Hong Kong",
};

export async function POST(req) {
  const h = req.headers;
  const ip = (h.get("x-forwarded-for") || h.get("x-real-ip") || "").split(",")[0].trim();
  if (limited(ip || "local")) return Response.json({ limited: true });

  const isLocal = !ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("::ffff:127.");
  const out = {
    ip: isLocal ? "" : ip,
    isp: "",
    city: decodeURIComponent(h.get("x-vercel-ip-city") || ""),
    region: h.get("x-vercel-ip-country-region") || "",
    country: h.get("x-vercel-ip-country") || "",
    lat: h.get("x-vercel-ip-latitude") || "",
    lon: h.get("x-vercel-ip-longitude") || "",
    server: "",
  };
  const vr = process.env.VERCEL_REGION;
  out.server = vr ? `${REGIONS[vr] || vr} (${vr})` : "your own computer";

  // one lookup gives the provider name and a rough place for the IP; on localhost it uses the caller's own IP
  try {
    const r = await fetch(`https://ipwho.is/${isLocal ? "" : encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(3500),
      cache: "no-store",
    });
    const j = await r.json();
    if (j && j.success) {
      out.ip = out.ip || j.ip || "";
      out.isp = (j.connection && (j.connection.isp || j.connection.org)) || "";
      out.city = out.city || j.city || "";
      out.region = j.region || out.region;
      out.country = j.country || out.country;
      out.lat = out.lat || (j.latitude != null ? String(j.latitude) : "");
      out.lon = out.lon || (j.longitude != null ? String(j.longitude) : "");
    }
  } catch (e) {}
  return Response.json(out);
}

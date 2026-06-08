import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";

export const metadata = {
  title: "Supporters",
  robots: { index: false, follow: false },
};

// Always render fresh: this reads a cookie and live data, never cache it.
export const dynamic = "force-dynamic";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

type Supporter = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  help: string[];
  note?: string;
  source?: string;
  createdAt: number;
};

const HELP_LABELS: Record<string, string> = {
  petition: "Sign",
  gather: "Gather signatures",
  host: "Host / spread word",
  updates: "Keep posted",
};

// Calls the gated Convex query with the admin key. Returns null when the key is
// missing or rejected (Convex enforces it), so the page falls back to login.
async function fetchSupporters(key: string): Promise<Supporter[] | null> {
  if (!convexUrl) return null;
  try {
    const res = await fetch(`${convexUrl}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "recall:list", args: { key }, format: "json" }),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as { status?: string; value?: unknown };
    if (data.status !== "success" || data.value == null) return null;
    return data.value as Supporter[];
  } catch {
    return null;
  }
}

function fmtDate(ms: number): string {
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Denver",
  });
}

export default async function SupportersPage() {
  const key = (await cookies()).get("admin_key")?.value;
  const rows = key ? await fetchSupporters(key) : null;

  if (!rows) {
    return (
      <article className="shell-narrow" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>Campaign dashboard</p>
        <h1 className="font-display" style={{ fontWeight: 560, fontSize: "1.8rem", margin: "0 0 1rem" }}>
          Supporters
        </h1>
        <AdminLogin failed={!!key} />
      </article>
    );
  }

  const withPhone = rows.filter((r) => r.phone).length;
  const emails = rows.map((r) => r.email).join(", ");

  return (
    <article className="shell-wide" style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}>
      <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Campaign dashboard</p>
      <h1 className="font-display" style={{ fontWeight: 560, fontSize: "1.8rem", margin: "0 0 0.4rem" }}>
        Supporters
      </h1>
      <p className="byline" style={{ marginBottom: "1.4rem" }}>
        {rows.length} total · {withPhone} with a phone number
      </p>

      {rows.length === 0 ? (
        <p className="prose">No signups yet. They will show up here the moment someone joins.</p>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Wants to</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r._id}>
                    <td style={{ whiteSpace: "nowrap" }}>{fmtDate(r.createdAt)}</td>
                    <td>{r.name}</td>
                    <td><a href={`mailto:${r.email}`}>{r.email}</a></td>
                    <td style={{ whiteSpace: "nowrap" }}>{r.phone ?? "—"}</td>
                    <td>{r.help.map((h) => HELP_LABELS[h] ?? h).join(", ") || "—"}</td>
                    <td>{r.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <details style={{ marginTop: "1.6rem" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>Copy all emails</summary>
            <textarea
              readOnly
              rows={3}
              defaultValue={emails}
              style={{ width: "100%", marginTop: "0.6rem", fontFamily: "var(--mono, monospace)", fontSize: "0.85rem" }}
            />
          </details>
        </>
      )}
    </article>
  );
}

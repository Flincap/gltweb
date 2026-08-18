import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Mail,
  Phone,
  Trash2,
  Download,
  RefreshCw,
  LogOut,
  Lock,
  Inbox,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { Eyebrow } from "../shared";

type Message = {
  id: string;
  ts: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  location: string;
  message: string;
  read: boolean;
  delivered: boolean;
};

type LoadResult =
  | { kind: "ok"; messages: Message[]; note: string }
  | { kind: "error"; error: string }
  | { kind: "signedOut" };

const api = (path: string, init?: RequestInit) =>
  fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    ...init,
  });

function formatDate(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ------------------------------- LOGIN ------------------------------- */

function SignIn({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await api("/api/admin-session", {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) onDone();
      else setError(data.error || "Could not sign in.");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
      setPassword("");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-5">
      <div className="card-line w-full p-8">
        <Lock size={24} style={{ color: "var(--glt-green)" }} aria-hidden />
        <h1 className="font-display mt-4 text-3xl">Message inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--glt-ink-soft)]">
          This area is for the GLT office team. Enter the admin password to
          continue.
        </p>
        <form onSubmit={submit} className="mt-6">
          <label className="flabel" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            className="field"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-solid mt-5 w-full"
            disabled={busy}
          >
            {busy ? "Checking…" : "Sign in"}
          </button>
          {error && (
            <p className="mt-3 text-sm font-semibold text-[#a11b1b]" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ------------------------------- INBOX ------------------------------- */

export default function Admin() {
  const [state, setState] = useState<"loading" | "out" | "in">("loading");
  const [messages, setMessages] = useState<Message[]>([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState("All");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Message inbox | GLT Church";
    // Keep this page out of search results whatever robots.txt says.
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, nofollow";
    document.head.appendChild(tag);
    return () => {
      tag.remove();
    };
  }, []);

  /** Pure fetch: touches no state, so it is safe to call from an effect. */
  const fetchMessages = useCallback(async (): Promise<LoadResult> => {
    try {
      const res = await api("/api/messages");
      if (res.status === 401) return { kind: "signedOut" };
      const data = await res.json();
      if (!res.ok) {
        return { kind: "error", error: data.error || "Could not load messages." };
      }
      return {
        kind: "ok",
        messages: (data.messages || []) as Message[],
        note: data.note || "",
      };
    } catch {
      return { kind: "error", error: "Could not reach the server." };
    }
  }, []);

  const apply = useCallback((result: LoadResult) => {
    if (result.kind === "signedOut") {
      setState("out");
      return;
    }
    if (result.kind === "error") {
      setError(result.error);
      setState("in");
      return;
    }
    setMessages(result.messages);
    setNote(result.note);
    setError("");
    setState("in");
  }, []);

  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    apply(await fetchMessages());
    setBusy(false);
  }, [apply, fetchMessages]);

  // Every setState here runs after an await, never in the effect body.
  useEffect(() => {
    let alive = true;
    void (async () => {
      const result = await fetchMessages();
      if (alive) apply(result);
    })();
    return () => {
      alive = false;
    };
  }, [apply, fetchMessages]);

  const signOut = async () => {
    await api("/api/admin-session", { method: "DELETE" });
    setMessages([]);
    setState("out");
  };

  const toggleRead = async (m: Message) => {
    setMessages((list) =>
      list.map((x) => (x.id === m.id ? { ...x, read: !x.read } : x))
    );
    await api("/api/messages", {
      method: "PATCH",
      body: JSON.stringify({ id: m.id, read: !m.read }),
    }).catch(() => undefined);
  };

  const remove = async (m: Message) => {
    if (!window.confirm(`Delete the message from ${m.name}? This cannot be undone.`))
      return;
    setMessages((list) => list.filter((x) => x.id !== m.id));
    await api(`/api/messages?id=${encodeURIComponent(m.id)}`, {
      method: "DELETE",
    }).catch(() => undefined);
  };

  const places = useMemo(() => {
    const set = new Set(messages.map((m) => m.location).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [messages]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return messages.filter((m) => {
      if (onlyUnread && m.read) return false;
      if (place !== "All" && m.location !== place) return false;
      if (!q) return true;
      return [m.name, m.email, m.phone, m.subject, m.location, m.message]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [messages, query, place, onlyUnread]);

  const unread = messages.filter((m) => !m.read).length;

  const exportCsv = () => {
    const cell = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [
      ["Date", "Name", "Email", "Phone", "Extension", "Subject", "Message"].join(","),
      ...shown.map((m) =>
        [
          cell(new Date(m.ts).toISOString()),
          cell(m.name),
          cell(m.email),
          cell(m.phone),
          cell(m.location),
          cell(m.subject),
          cell(m.message),
        ].join(",")
      ),
    ].join("\n");
    // BOM keeps Excel happy with accented names.
    const blob = new Blob(["\uFEFF" + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `glt-messages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (state === "loading") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="eyebrow text-[var(--glt-ink-soft)]">Loading…</p>
      </div>
    );
  }

  if (state === "out") return <SignIn onDone={() => void load()} />;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Office</Eyebrow>
          <h1 className="font-display text-[clamp(2rem,4.4vw,3.2rem)]">
            Message inbox
          </h1>
          <p className="mt-2 text-sm text-[var(--glt-ink-soft)]">
            {messages.length} message{messages.length === 1 ? "" : "s"}
            {unread > 0 && (
              <>
                {" · "}
                <strong style={{ color: "var(--glt-green-deep)" }}>
                  {unread} unread
                </strong>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => void load()}
            className="btn btn-outline-ink px-4 py-2.5 text-[0.72rem]"
            disabled={busy}
          >
            <RefreshCw size={14} aria-hidden /> Refresh
          </button>
          <button
            onClick={exportCsv}
            className="btn btn-outline-ink px-4 py-2.5 text-[0.72rem]"
            disabled={!shown.length}
          >
            <Download size={14} aria-hidden /> Export CSV
          </button>
          <button
            onClick={() => void signOut()}
            className="btn btn-ink px-4 py-2.5 text-[0.72rem]"
          >
            <LogOut size={14} aria-hidden /> Sign out
          </button>
        </div>
      </div>

      {note && (
        <div className="card-line mt-8 flex gap-3 p-5">
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--glt-green)" }}
            aria-hidden
          />
          <p className="text-sm leading-relaxed text-[var(--glt-ink-soft)]">{note}</p>
        </div>
      )}
      {error && (
        <p className="mt-6 text-sm font-semibold text-[#a11b1b]" role="alert">
          {error}
        </p>
      )}

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search messages</span>
          <Search
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--glt-ink-soft)]"
            aria-hidden
          />
          <input
            className="field pl-11"
            placeholder="Search name, email, or message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="md:w-64">
          <span className="sr-only">Filter by extension</span>
          <select
            className="field"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          >
            {places.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <button
          onClick={() => setOnlyUnread((v) => !v)}
          aria-pressed={onlyUnread}
          className="px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] transition"
          style={
            onlyUnread
              ? { background: "var(--glt-ink)", color: "#fff" }
              : {
                  background: "#fff",
                  color: "var(--glt-ink)",
                  boxShadow: "inset 0 0 0 1px var(--glt-line)",
                }
          }
        >
          Unread only
        </button>
      </div>

      {/* List */}
      {shown.length === 0 ? (
        <div className="card-line mt-8 p-12 text-center">
          <Inbox
            size={30}
            className="mx-auto"
            style={{ color: "var(--glt-green)" }}
            aria-hidden
          />
          <p className="font-display mt-4 text-2xl">Nothing here</p>
          <p className="mt-2 text-sm text-[var(--glt-ink-soft)]">
            {messages.length
              ? "No message matches those filters."
              : "New messages from the contact form will appear here."}
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {shown.map((m) => {
            const open = openId === m.id;
            return (
              <li
                key={m.id}
                className="card-line"
                style={
                  m.read
                    ? undefined
                    : { boxShadow: "inset 3px 0 0 0 var(--glt-green)" }
                }
              >
                <button
                  onClick={() => {
                    setOpenId(open ? null : m.id);
                    if (!open && !m.read) void toggleRead(m);
                  }}
                  aria-expanded={open}
                  className="flex w-full flex-col items-start gap-1 p-5 text-left"
                >
                  <div className="flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-display text-xl">{m.name}</span>
                    <span className="text-[13px] text-[var(--glt-ink-soft)]">
                      {formatDate(m.ts)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--glt-ink-soft)]">
                    <span
                      className="eyebrow text-[0.6rem]"
                      style={{ color: "var(--glt-green)" }}
                    >
                      {m.subject}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} aria-hidden /> {m.location}
                    </span>
                    {!m.delivered && (
                      <span
                        className="eyebrow text-[0.58rem]"
                        style={{ color: "#a11b1b" }}
                        title="Saved here, but the email did not go out"
                      >
                        Email not delivered
                      </span>
                    )}
                  </div>
                  {!open && (
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--glt-ink-soft)]">
                      {m.message}
                    </p>
                  )}
                </button>

                {open && (
                  <div className="border-t border-[var(--glt-line)] px-5 pb-5 pt-4">
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                      {m.message}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--glt-line)] pt-4 text-[13px] font-semibold">
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent(
                          `Re: ${m.subject}`
                        )}`}
                        className="inline-flex items-center gap-1.5 uppercase tracking-[0.08em]"
                        style={{ color: "var(--glt-green-deep)" }}
                      >
                        <Mail size={14} aria-hidden /> Reply
                      </a>
                      <span className="inline-flex items-center gap-1.5 break-all text-[var(--glt-ink-soft)]">
                        {m.email}
                      </span>
                      {m.phone && (
                        <a
                          href={`tel:${m.phone.replace(/[^+\d]/g, "")}`}
                          className="inline-flex items-center gap-1.5 text-[var(--glt-ink)] hover:underline"
                        >
                          <Phone size={14} aria-hidden /> {m.phone}
                        </a>
                      )}
                      <button
                        onClick={() => void toggleRead(m)}
                        className="ml-auto text-[var(--glt-ink-soft)] hover:underline"
                      >
                        Mark {m.read ? "unread" : "read"}
                      </button>
                      <button
                        onClick={() => void remove(m)}
                        className="inline-flex items-center gap-1.5 text-[#a11b1b] hover:underline"
                      >
                        <Trash2 size={14} aria-hidden /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

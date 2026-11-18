import React from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Trash2 } from "lucide-react";
import {
  applyToJob,
  createJob,
  createService,
  deleteJob,
  deleteService,
  fetchJobs,
  fetchMyApplications,
  fetchMyJobs,
  fetchServices,
  setApplicationStatus,
  type ApplicationStatus,
  type Job,
  type MyApplication,
  type Service,
} from "@/services/marketplace";
import { AppContext } from "@/Context/AppContext";
import { apiErrorMessage, formatNaira, formatRelativeTime } from "@/lib/influencer";
import { Modal, ghostBtn, inputCls, primaryBtn } from "@/components/community/Modal";
import { UserAvatar } from "@/components/community/UserAvatar";
import { displayName } from "@/components/community/displayName";

type Tab = "jobs" | "services" | "my-jobs" | "my-applications";
const TABS: Array<{ id: Tab; label: string }> = [
  { id: "jobs", label: "Find work" },
  { id: "services", label: "Services" },
  { id: "my-jobs", label: "My jobs" },
  { id: "my-applications", label: "My applications" },
];

const STATUS_STYLE: Record<ApplicationStatus | Job["status"], string> = {
  PENDING: "bg-[#A67102]/20 text-[#f5b640]",
  ACCEPTED: "bg-green-500/15 text-green-400",
  REJECTED: "bg-red-500/15 text-red-400",
  OPEN: "bg-green-500/15 text-green-400",
  CLOSED: "bg-gray-700/40 text-gray-300",
  COMPLETED: "bg-gray-700/40 text-gray-300",
};

const Badge = ({ status }: { status: keyof typeof STATUS_STYLE }) => (
  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${STATUS_STYLE[status]}`}>
    {status.charAt(0) + status.slice(1).toLowerCase()}
  </span>
);

const amount = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
};

// --- Forms ---

function PostJobModal({ onClose, onCreated }: { onClose: () => void; onCreated: (j: Job) => void }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const b = amount(budget);
    if (!title.trim() || !description.trim()) return setError("Add a title and a description.");
    if (b === null) return setError("Enter a budget greater than 0.");
    try {
      setBusy(true);
      setError(null);
      onCreated(await createJob({ title: title.trim(), description: description.trim(), budget: b }));
    } catch (err) {
      setError(apiErrorMessage(err, "Could not post the job"));
      setBusy(false);
    }
  };

  return (
    <Modal title="Post a job" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="job-title" className="text-sm text-gray-300 block mb-1">Title</label>
          <input id="job-title" maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Mixing engineer for a 4-track EP" className={inputCls} />
        </div>
        <div>
          <label htmlFor="job-desc" className="text-sm text-gray-300 block mb-1">Description</label>
          <textarea id="job-desc" rows={5} maxLength={4000} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What you need, genre, references, deadline" className={inputCls} />
        </div>
        <div>
          <label htmlFor="job-budget" className="text-sm text-gray-300 block mb-1">Budget (₦)</label>
          <input id="job-budget" type="number" inputMode="numeric" min={1} value={budget} onChange={(e) => setBudget(e.target.value)} className={inputCls} />
        </div>
        {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
        <p className="text-xs text-gray-500">Payment is agreed directly with the person you hire; Audora doesn't hold job payments.</p>
        <div className="flex gap-3 pt-1">
          <button disabled={busy} className={`${primaryBtn} flex-1`}>{busy ? "Posting..." : "Post job"}</button>
          <button type="button" onClick={onClose} className={`${ghostBtn} flex-1`}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

function ApplyModal({ job, onClose, onApplied }: { job: Job; onClose: () => void; onApplied: () => void }) {
  const [coverLetter, setCoverLetter] = React.useState("");
  const [bid, setBid] = React.useState(String(job.budget));
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const b = amount(bid);
    if (!coverLetter.trim()) return setError("Tell them why you're a good fit.");
    if (b === null) return setError("Enter a bid greater than 0.");
    try {
      setBusy(true);
      setError(null);
      await applyToJob(job.id, { coverLetter: coverLetter.trim(), bidAmount: b });
      onApplied();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not send your application"));
      setBusy(false);
    }
  };

  return (
    <Modal title={`Apply: ${job.title}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <p className="text-sm text-gray-400">Budget {formatNaira(job.budget)}</p>
        <div>
          <label htmlFor="cover" className="text-sm text-gray-300 block mb-1">Cover letter</label>
          <textarea id="cover" rows={6} maxLength={4000} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Relevant work, links to past projects, how you'd approach it" className={inputCls} />
        </div>
        <div>
          <label htmlFor="bid" className="text-sm text-gray-300 block mb-1">Your bid (₦)</label>
          <input id="bid" type="number" inputMode="numeric" min={1} value={bid} onChange={(e) => setBid(e.target.value)} className={inputCls} />
        </div>
        {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
        <div className="flex gap-3 pt-1">
          <button disabled={busy} className={`${primaryBtn} flex-1`}>{busy ? "Sending..." : "Send application"}</button>
          <button type="button" onClick={onClose} className={`${ghostBtn} flex-1`}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

function OfferServiceModal({ onClose, onCreated }: { onClose: () => void; onCreated: (s: Service) => void }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = amount(price);
    if (!title.trim() || !description.trim()) return setError("Add a title and a description.");
    if (p === null) return setError("Enter a price greater than 0.");
    try {
      setBusy(true);
      setError(null);
      onCreated(await createService({ title: title.trim(), description: description.trim(), price: p, ...(category.trim() ? { category: category.trim() } : {}) }));
    } catch (err) {
      setError(apiErrorMessage(err, "Could not list the service"));
      setBusy(false);
    }
  };

  return (
    <Modal title="Offer a service" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="svc-title" className="text-sm text-gray-300 block mb-1">Title</label>
          <input id="svc-title" maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Mixing & mastering" className={inputCls} />
        </div>
        <div>
          <label htmlFor="svc-cat" className="text-sm text-gray-300 block mb-1">Category (optional)</label>
          <input id="svc-cat" maxLength={60} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Mixing, Vocals, Beats" className={inputCls} />
        </div>
        <div>
          <label htmlFor="svc-desc" className="text-sm text-gray-300 block mb-1">Description</label>
          <textarea id="svc-desc" rows={5} maxLength={4000} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="svc-price" className="text-sm text-gray-300 block mb-1">Starting price (₦)</label>
          <input id="svc-price" type="number" inputMode="numeric" min={1} value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls} />
        </div>
        {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
        <div className="flex gap-3 pt-1">
          <button disabled={busy} className={`${primaryBtn} flex-1`}>{busy ? "Saving..." : "List service"}</button>
          <button type="button" onClick={onClose} className={`${ghostBtn} flex-1`}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

// --- Tabs ---

function useSearch() {
  const [input, setInput] = React.useState("");
  const [query, setQuery] = React.useState("");
  React.useEffect(() => {
    const t = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(t);
  }, [input]);
  return { input, setInput, query };
}

function SearchBox({ id, value, onChange, placeholder }: { id: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${inputCls} pl-9`} />
    </div>
  );
}

function FindWork({ onPostJob }: { onPostJob: () => void }) {
  const { input, setInput, query } = useSearch();
  const [jobs, setJobs] = React.useState<Job[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [applying, setApplying] = React.useState<Job | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    fetchJobs({ search: query })
      .then((r) => { setJobs(r.data); setError(null); })
      .catch((err) => setError(apiErrorMessage(err, "Could not load jobs")));
  }, [query]);
  React.useEffect(load, [load]);

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-5">
        <SearchBox id="job-search" value={input} onChange={setInput} placeholder="Search jobs" />
        <button onClick={onPostJob} className={`${primaryBtn} inline-flex items-center gap-2`}><Plus size={16} /> Post a job</button>
      </div>
      {notice && <p className="text-green-400 text-sm mb-4" role="status">{notice}</p>}
      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
      {jobs === null && !error && <p className="text-gray-400">Loading...</p>}
      {jobs?.length === 0 && <p className="text-gray-400">No open jobs{query ? ` matching "${query}"` : ""}.</p>}
      <div className="space-y-4">
        {jobs?.map((job) => (
          <article key={job.id} className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5">
            <div className="flex justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h3 className="text-white font-medium">{job.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {job.user && (
                    <Link to={`/dashboard/people/${job.user.id}`} className="hover:underline">{displayName(job.user)}</Link>
                  )}{" "}
                  &bull; {formatRelativeTime(job.createdAt)} &bull; {job._count.applications} applicant{job._count.applications === 1 ? "" : "s"}
                </p>
              </div>
              <p className="text-[#f5b640] font-semibold">{formatNaira(job.budget)}</p>
            </div>
            <p className="text-gray-300 text-sm mt-3 whitespace-pre-wrap line-clamp-6">{job.description}</p>
            <div className="mt-4">
              {job.isMine ? (
                <span className="text-xs text-gray-500">Your job. Manage it in My jobs.</span>
              ) : job.myApplication ? (
                <span className="inline-flex items-center gap-2 text-xs text-gray-400">Applied <Badge status={job.myApplication.status} /></span>
              ) : (
                <button onClick={() => setApplying(job)} className={primaryBtn}>Apply</button>
              )}
            </div>
          </article>
        ))}
      </div>
      {applying && (
        <ApplyModal
          job={applying}
          onClose={() => setApplying(null)}
          onApplied={() => {
            setNotice(`Application sent for "${applying.title}".`);
            setApplying(null);
            load();
          }}
        />
      )}
    </>
  );
}

function Services() {
  const ctx = React.useContext(AppContext);
  const { input, setInput, query } = useSearch();
  const [services, setServices] = React.useState<Service[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [offering, setOffering] = React.useState(false);

  React.useEffect(() => {
    fetchServices({ search: query })
      .then((r) => { setServices(r.data); setError(null); })
      .catch((err) => setError(apiErrorMessage(err, "Could not load services")));
  }, [query]);

  const remove = async (id: string) => {
    if (!window.confirm("Remove this service?")) return;
    try {
      await deleteService(id);
      setServices((prev) => prev?.filter((s) => s.id !== id) ?? null);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not remove the service"));
    }
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-5">
        <SearchBox id="svc-search" value={input} onChange={setInput} placeholder="Search services" />
        <button onClick={() => setOffering(true)} className={`${primaryBtn} inline-flex items-center gap-2`}><Plus size={16} /> Offer a service</button>
      </div>
      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
      {services === null && !error && <p className="text-gray-400">Loading...</p>}
      {services?.length === 0 && <p className="text-gray-400">No services listed{query ? ` matching "${query}"` : ""}.</p>}
      <div className="grid md:grid-cols-2 gap-4">
        {services?.map((s) => (
          <article key={s.id} className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 flex flex-col">
            <div className="flex justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-white font-medium">{s.title}</h3>
                {s.category && <p className="text-xs text-gray-500 mt-0.5">{s.category}</p>}
              </div>
              <p className="text-[#f5b640] font-semibold whitespace-nowrap">from {formatNaira(s.price)}</p>
            </div>
            <p className="text-gray-300 text-sm mt-3 whitespace-pre-wrap line-clamp-5 flex-1">{s.description}</p>
            <div className="flex items-center justify-between mt-4">
              <Link to={`/dashboard/people/${s.user.id}`} className="flex items-center gap-2 group min-w-0">
                <UserAvatar user={s.user} size="sm" />
                <span className="text-sm text-gray-300 truncate group-hover:underline">{displayName(s.user)}</span>
              </Link>
              {ctx?.user?.id === s.userId && (
                <button onClick={() => remove(s.id)} className="text-gray-500 hover:text-red-400 p-1" aria-label={`Remove ${s.title}`}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {offering && (
        <OfferServiceModal
          onClose={() => setOffering(false)}
          onCreated={(s) => {
            setServices((prev) => [s, ...(prev ?? [])]);
            setOffering(false);
          }}
        />
      )}
    </>
  );
}

function MyJobs({ onPostJob, version }: { onPostJob: () => void; version: number }) {
  const [jobs, setJobs] = React.useState<Job[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [acting, setActing] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    fetchMyJobs()
      .then((j) => { setJobs(j); setError(null); })
      .catch((err) => setError(apiErrorMessage(err, "Could not load your jobs")));
  }, []);
  React.useEffect(load, [load, version]);

  const decide = async (applicationId: string, status: "ACCEPTED" | "REJECTED", name: string) => {
    if (status === "ACCEPTED" && !window.confirm(`Hire ${name}? The job will close and other applicants will be declined.`)) return;
    try {
      setActing(applicationId);
      await setApplicationStatus(applicationId, status);
      load();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not update the application"));
    } finally {
      setActing(null);
    }
  };

  const remove = async (job: Job) => {
    if (!window.confirm(`Delete "${job.title}"? Its applications are removed too.`)) return;
    try {
      await deleteJob(job.id);
      setJobs((prev) => prev?.filter((j) => j.id !== job.id) ?? null);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not delete the job"));
    }
  };

  return (
    <>
      <div className="flex justify-end mb-5">
        <button onClick={onPostJob} className={`${primaryBtn} inline-flex items-center gap-2`}><Plus size={16} /> Post a job</button>
      </div>
      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
      {jobs === null && !error && <p className="text-gray-400">Loading...</p>}
      {jobs?.length === 0 && <p className="text-gray-400">You haven't posted any jobs yet.</p>}
      <div className="space-y-4">
        {jobs?.map((job) => (
          <article key={job.id} className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5">
            <div className="flex justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h3 className="text-white font-medium flex items-center gap-2 flex-wrap">{job.title} <Badge status={job.status} /></h3>
                <p className="text-xs text-gray-500 mt-1">{formatNaira(job.budget)} &bull; posted {formatRelativeTime(job.createdAt)}</p>
              </div>
              <button onClick={() => remove(job)} className="text-gray-500 hover:text-red-400 p-1 self-start" aria-label={`Delete ${job.title}`}>
                <Trash2 size={16} />
              </button>
            </div>
            <h4 className="text-sm text-gray-400 mt-4 mb-2">Applications ({job.applications?.length ?? 0})</h4>
            {job.applications?.length === 0 && <p className="text-gray-500 text-sm">No applications yet.</p>}
            <ul className="space-y-3">
              {job.applications?.map((a) => (
                <li key={a.id} className="bg-[#1a1a1a] rounded-lg p-4">
                  <div className="flex justify-between gap-3 flex-wrap">
                    {a.applicant && (
                      <Link to={`/dashboard/people/${a.applicant.id}`} className="flex items-center gap-2 group">
                        <UserAvatar user={a.applicant} size="sm" />
                        <span className="text-sm text-white group-hover:underline">{displayName(a.applicant)}</span>
                      </Link>
                    )}
                    <span className="flex items-center gap-2 text-sm">
                      <span className="text-[#f5b640]">{formatNaira(a.bidAmount)}</span>
                      <Badge status={a.status} />
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">{a.coverLetter}</p>
                  {a.status === "PENDING" && job.status === "OPEN" && (
                    <div className="flex gap-2 mt-3">
                      <button disabled={acting === a.id} onClick={() => decide(a.id, "ACCEPTED", a.applicant ? displayName(a.applicant) : "this applicant")} className={primaryBtn}>Hire</button>
                      <button disabled={acting === a.id} onClick={() => decide(a.id, "REJECTED", "")} className={ghostBtn}>Decline</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

function MyApplications() {
  const [apps, setApps] = React.useState<MyApplication[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchMyApplications()
      .then(setApps)
      .catch((err) => setError(apiErrorMessage(err, "Could not load your applications")));
  }, []);

  return (
    <>
      {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
      {apps === null && !error && <p className="text-gray-400">Loading...</p>}
      {apps?.length === 0 && <p className="text-gray-400">You haven't applied to any jobs yet.</p>}
      <div className="space-y-4">
        {apps?.map((a) => (
          <article key={a.id} className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5">
            <div className="flex justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h3 className="text-white font-medium">{a.job.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  <Link to={`/dashboard/people/${a.job.user.id}`} className="hover:underline">{displayName(a.job.user)}</Link>{" "}
                  &bull; applied {formatRelativeTime(a.createdAt)}
                </p>
              </div>
              <span className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Your bid <span className="text-[#f5b640]">{formatNaira(a.bidAmount)}</span></span>
                <Badge status={a.status} />
              </span>
            </div>
            {a.status === "ACCEPTED" && (
              <p className="text-green-400 text-sm mt-3">You were hired. Reach out to {displayName(a.job.user)} to get started.</p>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

export default function MarketplacePage() {
  const [tab, setTab] = React.useState<Tab>("jobs");
  const [posting, setPosting] = React.useState(false);
  const [version, setVersion] = React.useState(0);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">MARKETPLACE</h1>
        <p className="text-gray-400 text-sm mb-6">Hire producers, engineers and vocalists, or find your next gig.</p>

        <div className="flex gap-2 flex-wrap border-b border-gray-800 mb-6" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium -mb-px ${tab === t.id ? "text-white border-b-2 border-[#A67102]" : "text-gray-400 hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "jobs" && <FindWork onPostJob={() => setPosting(true)} />}
        {tab === "services" && <Services />}
        {tab === "my-jobs" && <MyJobs onPostJob={() => setPosting(true)} version={version} />}
        {tab === "my-applications" && <MyApplications />}

        {posting && (
          <PostJobModal
            onClose={() => setPosting(false)}
            onCreated={() => {
              setPosting(false);
              setVersion((v) => v + 1);
              setTab("my-jobs");
            }}
          />
        )}
      </div>
    </div>
  );
}

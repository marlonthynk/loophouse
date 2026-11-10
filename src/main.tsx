import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  House,
  ClipboardList,
  ChevronRight,
  ArrowLeft,
  MapPin,
  CalendarDays,
  Search,
  Camera,
  Download,
  Check,
  RotateCcw,
  FileText,
} from 'lucide-react';
import {
  sections,
  conditions,
  blankInspection,
  validate,
  status,
  isAppointmentToday,
  isAppointmentThisWeek,
  type Job,
  type Inspection,
  type Photo,
} from './model';

import * as store from './storage';
import { downloadReport } from './pdf';
import './style.css';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [page, setPage] = useState<'dashboard' | 'details' | 'form' | 'report'>('dashboard');
  const [job, setJob] = useState<Job>();
  const [draft, setDraft] = useState<Inspection>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week'>('all');
  const [saving, setSaving] = useState('Saved');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const queue = useRef(Promise.resolve());

  async function refresh() {
    await store.initialize();
    setJobs(await store.allJobs());
    setInspections(await store.allInspections());
  }

  useEffect(() => {
    refresh().catch(() =>
      setError('Could not open local storage. Please check your browser settings.'),
    );
  }, []);

  function save(next: Inspection) {
    setDraft(next);
    setSaving('Saving…');
    queue.current = queue.current
      .catch(() => {})
      .then(() => store.saveInspection(next))
      .then(() => {
        setSaving('Saved');
        setInspections((old) => [...old.filter((x) => x.jobId !== next.jobId), next]);
      })
      .catch(() => {
        setSaving('Save failed');
        setError('Could not save your changes. Check browser storage and try again.');
        throw new Error('Save failed');
      });
    queue.current.catch(() => {});
    return queue.current;
  }

  function open(j: Job) {
    setJob(j);
    setDraft(inspections.find((x) => x.jobId === j.id));
    setPage('details');
    setError('');
  }

  async function start() {
    if (!job) {
      return;
    }
    const i = draft || blankInspection(job.id);
    try {
      await save(i);
      setPage('form');
    } catch {}
  }

  function update(p: Partial<Inspection>) {
    if (draft) {
      void save({ ...draft, ...p, updated: new Date().toISOString() }).catch(() => {});
    }
  }

  async function review() {
    if (!draft) {
      return;
    }
    const e = validate(draft);
    setErrors(e);
    if (e.length) {
      document.getElementById('validation')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    try {
      await queue.current;
      setPage('report');
    } catch {
      setError('Save your changes before reviewing the report.');
    }
  }

  async function complete() {
    if (!draft) {
      return;
    }
    try {
      await save({
        ...draft,
        completed: new Date().toISOString(),
        updated: new Date().toISOString(),
      });
      setPage('report');
    } catch {}
  }

  async function photo(file: File, s: string) {
    if (!draft) {
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please choose a JPEG, PNG or WebP image.');
      return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      const ratio = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width * ratio;
      canvas.height = bitmap.height * ratio;
      canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error())), 'image/jpeg', 0.8),
      );
      const p: Photo = {
        id: crypto.randomUUID(),
        section: s,
        blob,
        caption: '',
      };
      update({ photos: [...draft.photos, p] });
      setError('');
    } catch {
      setError('Could not process this photo. Please try another image.');
    }
  }

  const filtered = jobs.filter(
    (j) =>
      (j.address + ' ' + j.city).toLowerCase().includes(query.toLowerCase()) &&
      (filter === 'All' || status(inspections.find((i) => i.jobId === j.id)) === filter) &&
      (dateFilter === 'all' ||
        (dateFilter === 'today' && isAppointmentToday(j.date)) ||
        (dateFilter === 'week' && isAppointmentThisWeek(j.date))),
  );

  const counts = ['Scheduled', 'In progress', 'Completed'].map((s) =>
    inspections
      ? jobs.filter((j) => status(inspections.find((i) => i.jobId === j.id)) === s).length
      : 0,
  );

  return (
    <>
      <header>
        <div className="top">
          <button className="brand" onClick={() => setPage('dashboard')}>
            <span className="brand-icon">
              <House size={21} />
            </span>{' '}
            loop<span>house</span>
            <small>INSPECTOR</small>
          </button>
          <div className="profile">
            <span className="avatar">AM</span>
            <span>
              <b>Alex Morgan</b>
              <small>Property inspector</small>
            </span>
          </div>
        </div>
      </header>
      <main>
        {page === 'dashboard' ? (
          <>
            <div className="heading">
              <div>
                <div className="eyebrow">YOUR WORKSPACE</div>
                <h1>
                  Good morning, Alex <span>✳</span>
                </h1>
                <p>Here's what's happening with your inspections.</p>
              </div>
              <button
                className="reset"
                onClick={async () => {
                  if (
                    window.confirm(
                      'Reset all demo data? Your inspections and photos will be deleted.',
                    )
                  ) {
                    try {
                      await store.reset();
                      await refresh();
                      setError('');
                    } catch {
                      setError('Could not reset demo data.');
                    }
                  }
                }}
              >
                <RotateCcw size={16} /> Reset demo
              </button>
            </div>
            <div className="stats">
              {['Scheduled', 'In progress', 'Completed'].map((s, k) => (
                <div className="stat" key={s}>
                  <div className={'stat-icon i' + k}>
                    {k === 0 ? <CalendarDays /> : k === 1 ? <ClipboardList /> : <Check />}
                  </div>
                  <div>
                    <span>{s}</span>
                    <strong>{counts[k]}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="list-head">
              <div>
                <h2>Your inspections</h2>
                <p>All your upcoming and completed jobs in one place.</p>
              </div>
              <div className="list-actions">
                <span className="count">{filtered.length} jobs</span>
                <button
                  className={'date-toggle' + (dateFilter === 'today' ? ' active' : '')}
                  type="button"
                  aria-pressed={dateFilter === 'today'}
                  onClick={() =>
                    setDateFilter((current) => (current === 'today' ? 'all' : 'today'))
                  }
                >
                  <CalendarDays size={15} /> Today
                </button>
                <button
                  className={'date-toggle' + (dateFilter === 'week' ? ' active' : '')}
                  type="button"
                  aria-pressed={dateFilter === 'week'}
                  onClick={() => setDateFilter((current) => (current === 'week' ? 'all' : 'week'))}
                >
                  <CalendarDays size={15} /> This week
                </button>
              </div>
            </div>
            <div className="toolbar">
              <label className="search">
                <Search size={18} />
                <input
                  aria-label="Search by address"
                  placeholder="Search by address..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <select
                aria-label="Filter by status"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {['All', 'Scheduled', 'In progress', 'Completed'].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
            <div className="jobs">
              {filtered.map((j) => {
                const st = status(inspections.find((i) => i.jobId === j.id));

                return (
                  <button className="job" key={j.id} onClick={() => open(j)}>
                    <div className="house">
                      <House size={22} />
                    </div>
                    <div className="job-main">
                      <strong>{j.address}</strong>
                      <span>
                        <MapPin size={14} />
                        {j.city}
                      </span>
                    </div>
                    <div className="job-date">
                      <small>APPOINTMENT</small>
                      <b>{formatDate(j.date)}</b>
                    </div>
                    <div className="job-type">
                      <small>PROPERTY TYPE</small>
                      <b>{j.type}</b>
                    </div>
                    <span className={'badge ' + st.replace(' ', '').toLowerCase()}>{st}</span>
                    <ChevronRight size={18} />
                  </button>
                );
              })}
              {!filtered.length && <p className="empty">No appointments to show</p>}
            </div>
            <div className="footnote">
              ✦ &nbsp; A little organisation goes a long way. You've got this.
            </div>
          </>
        ) : null}
        {page !== 'dashboard' && job && (
          <>
            <button
              className="back"
              onClick={() =>
                setPage(
                  page === 'details'
                    ? 'dashboard'
                    : page === 'form'
                      ? 'details'
                      : draft?.completed
                        ? 'details'
                        : 'form',
                )
              }
            >
              <ArrowLeft size={16} />{' '}
              {page === 'details'
                ? 'All inspections'
                : page === 'form'
                  ? 'Job details'
                  : draft?.completed
                    ? 'Job details'
                    : 'Back to inspection'}
            </button>
            {page === 'details' && (
              <>
                <div className="eyebrow">INSPECTION DETAILS</div>
                <h1>{job.address}</h1>
                <p className="subtitle">
                  <MapPin size={16} />
                  {job.city}{' '}
                  <span className={'badge ' + status(draft).replace(' ', '').toLowerCase()}>
                    {status(draft)}
                  </span>
                </p>
                <div className="detail-grid">
                  <div className="card">
                    <h2>Property details</h2>
                    <div className="detail">
                      <span>Property type</span>
                      <b>{job.type}</b>
                    </div>
                    <div className="detail">
                      <span>Appointment</span>
                      <b>{formatDate(job.date)}</b>
                    </div>
                    <div className="detail">
                      <span>Inspector</span>
                      <b>Alex Morgan</b>
                    </div>
                    <div className="detail">
                      <span>Contact</span>
                      <b>{job.contact}</b>
                    </div>
                    <div className="detail">
                      <span>Access notes</span>
                      <b>{job.access}</b>
                    </div>
                  </div>
                  <div className="card action-card">
                    <div className="big-icon">
                      <ClipboardList />
                    </div>
                    <h2>Ready to inspect?</h2>
                    <p>Work through the property, add your observations and create a report.</p>
                    <button
                      className="primary"
                      onClick={() => (draft?.completed ? setPage('report') : void start())}
                    >
                      {draft?.completed
                        ? 'View report'
                        : draft
                          ? 'Resume inspection'
                          : 'Start inspection'}{' '}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
            {page === 'form' && draft && (
              <>
                <div className="form-top">
                  <div>
                    <div className="eyebrow">INSPECTION IN PROGRESS</div>
                    <h1>Let's take a look</h1>
                    <p>
                      {job.address} · {job.city}
                    </p>
                  </div>
                  <div className="save-state">● {saving}</div>
                </div>
                <div id="validation">
                  {errors.length > 0 && (
                    <div className="error">
                      <b>A few things need your attention</b>
                      <ul>
                        {errors.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="form-layout">
                  <div>
                    {sections.map((s, index) => (
                      <section className="card section" key={s}>
                        <div className="section-head">
                          <span className="number">{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <h2>{s}</h2>
                            <p>Record the condition and any observations.</p>
                          </div>
                        </div>
                        <label className="field-label" htmlFor={'condition' + index}>
                          Condition <em>*</em>
                        </label>
                        <select
                          id={'condition' + index}
                          value={draft.answers[s].condition}
                          onChange={(e) =>
                            update({
                              answers: {
                                ...draft.answers,
                                [s]: {
                                  ...draft.answers[s],
                                  condition: e.target
                                    .value as (typeof draft.answers)[string]['condition'],
                                },
                              },
                            })
                          }
                        >
                          <option value="">Select condition</option>
                          {conditions.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                        <label className="field-label" htmlFor={'notes' + index}>
                          Notes
                        </label>
                        <textarea
                          id={'notes' + index}
                          placeholder="Add your observations..."
                          value={draft.answers[s].notes}
                          onChange={(e) =>
                            update({
                              answers: {
                                ...draft.answers,
                                [s]: { ...draft.answers[s], notes: e.target.value },
                              },
                            })
                          }
                        />
                        <div className="field-label">
                          Photos <span className="optional">optional</span>
                        </div>
                        <div className="photos">
                          {draft.photos
                            .filter((p) => p.section === s)
                            .map((p) => (
                              <PhotoCard
                                key={p.id}
                                photo={p}
                                onCaption={(caption) =>
                                  update({
                                    photos: draft.photos.map((x) =>
                                      x.id === p.id ? { ...x, caption } : x,
                                    ),
                                  })
                                }
                                onRemove={() =>
                                  update({ photos: draft.photos.filter((x) => x.id !== p.id) })
                                }
                              />
                            ))}
                          <label className="upload">
                            <Camera size={22} />
                            <span>Add photo</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              capture="environment"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  void photo(f, s);
                                }
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </div>
                      </section>
                    ))}
                    <section className="card section">
                      <h2>Final thoughts</h2>
                      <label className="field-label" htmlFor="summary">
                        Overall summary
                      </label>
                      <textarea
                        id="summary"
                        value={draft.summary}
                        onChange={(e) => update({ summary: e.target.value })}
                        placeholder="Summarise the inspection..."
                      />
                      <label className="field-label" htmlFor="followup">
                        Recommended follow-up
                      </label>
                      <textarea
                        id="followup"
                        value={draft.followup}
                        onChange={(e) => update({ followup: e.target.value })}
                        placeholder="What happens next?"
                      />
                    </section>
                    <button className="primary next" onClick={() => void review()}>
                      Review report <ChevronRight size={18} />
                    </button>
                  </div>
                  <aside className="card sticky">
                    <h3>Inspection progress</h3>
                    <p>
                      {Object.values(draft.answers).filter((a) => a.condition).length} of{' '}
                      {sections.length} sections assessed
                    </p>
                    <div className="progress">
                      <i
                        style={{
                          width: `${(Object.values(draft.answers).filter((a) => a.condition).length / sections.length) * 100}%`,
                        }}
                      />
                    </div>
                    {sections.map((s) => (
                      <div className="progress-item" key={s}>
                        <span>{draft.answers[s].condition ? '✓' : '○'}</span>
                        {s}
                      </div>
                    ))}
                    <p className="hint">Your changes are saved on this device.</p>
                  </aside>
                </div>
              </>
            )}
            {page === 'report' && draft && (
              <>
                <div className="form-top">
                  <div>
                    <div className="eyebrow">
                      {draft.completed ? 'COMPLETED INSPECTION' : 'ALMOST THERE'}
                    </div>
                    <h1>{draft.completed ? 'Inspection report' : 'Review your report'}</h1>
                    <p>
                      {job.address} · {job.city}
                    </p>
                  </div>
                  <span className={'badge ' + (draft.completed ? 'completed' : 'inprogress')}>
                    {draft.completed ? 'Completed' : 'Draft'}
                  </span>
                </div>
                <div className="report card">
                  <div className="report-title">
                    <div>
                      <div className="eyebrow">LOOPHOUSE / PROPERTY REPORT</div>
                      <h2>{job.address}</h2>
                      <p>
                        {job.city} · {job.type}
                      </p>
                    </div>
                    <FileText size={32} />
                  </div>
                  <div className="detail">
                    <span>Inspector</span>
                    <b>{draft.inspector}</b>
                  </div>
                  <div className="detail">
                    <span>Appointment</span>
                    <b>{formatDate(job.date)}</b>
                  </div>
                  {sections.map((s) => (
                    <div className="report-section" key={s}>
                      <h3>
                        {s} <span className="condition">{draft.answers[s].condition}</span>
                      </h3>
                      <p>{draft.answers[s].notes || 'No notes added.'}</p>
                      <div className="photos">
                        {draft.photos
                          .filter((p) => p.section === s)
                          .map((p) => (
                            <PhotoCard key={p.id} photo={p} />
                          ))}
                      </div>
                    </div>
                  ))}
                  <div className="report-section">
                    <h3>Overall summary</h3>
                    <p>{draft.summary || 'No summary provided.'}</p>
                    <h3>Recommended follow-up</h3>
                    <p>{draft.followup || 'None provided.'}</p>
                  </div>
                </div>
                <div className="report-actions">
                  {!draft.completed ? (
                    <>
                      <button className="secondary" onClick={() => setPage('form')}>
                        Edit inspection
                      </button>
                      <button className="primary" onClick={() => void complete()}>
                        Complete inspection <Check size={17} />
                      </button>
                    </>
                  ) : (
                    <button
                      className="primary"
                      onClick={() =>
                        downloadReport(job, draft).catch(() =>
                          setError('Could not generate the PDF. Please try again.'),
                        )
                      }
                    >
                      <Download size={17} /> Download PDF
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
        {error && (
          <div className="toast" role="alert">
            {error}
            <button aria-label="Dismiss error" onClick={() => setError('')}>
              ×
            </button>
          </div>
        )}
      </main>
      <footer>
        LoopHouse <span>·</span> Made for the details that matter.
      </footer>
    </>
  );
}

function PhotoCard({
  photo,
  onCaption,
  onRemove,
}: {
  photo: Photo;
  onCaption?: (v: string) => void;
  onRemove?: () => void;
}) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const u = URL.createObjectURL(photo.blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [photo.blob]);

  return (
    <div className="photo-card">
      <img src={url} alt={photo.caption || 'Inspection photo'} />
      {onCaption ? (
        <>
          <input
            aria-label="Photo caption"
            placeholder="Add a caption"
            value={photo.caption}
            onChange={(e) => onCaption(e.target.value)}
          />
          <button onClick={onRemove}>Remove</button>
        </>
      ) : (
        <small>{photo.caption}</small>
      )}
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

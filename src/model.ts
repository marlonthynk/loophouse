export const sections = [
  'Exterior',
  'Living areas',
  'Kitchen',
  'Bathroom',
  'Bedrooms',
  'Safety observations',
] as const;

export const conditions = ['Good', 'Needs attention', 'Urgent', 'Not applicable'] as const;

export type Condition = (typeof conditions)[number] | '';

export type Photo = {
  id: string;
  section: string;
  blob: Blob;
  caption: string;
};

export type Inspection = {
  jobId: string;
  inspector: string;
  started: string;
  updated: string;
  completed?: string;
  answers: Record<
    string,
    {
      condition: Condition;
      notes: string;
    }
  >;
  summary: string;
  followup: string;
  photos: Photo[];
};

export type Job = {
  id: string;
  address: string;
  city: string;
  date: string;
  type: string;
  contact: string;
  access: string;
};

export const jobs: Job[] = [
  [
    '1',
    '24 Lavender Row',
    'London, SW4 8JT',
    '2026-11-12T09:00',
    'Terraced house',
    'Sophie Bennett',
    'Ring the bell; keys held by resident.',
  ],
  [
    '2',
    '8 Willow Court',
    'London, SE1 4PQ',
    '2026-11-12T11:30',
    'Apartment',
    'Oliver Grant',
    'Concierge has a spare key.',
  ],
  [
    '3',
    '15 Ash Grove',
    'London, N1 6AB',
    '2026-11-13T10:00',
    'Semi-detached house',
    'Amelia Clark',
    'Side gate is open.',
  ],
  [
    '4',
    '42 Rosebery Gardens',
    'London, W2 3PN',
    '2026-11-14T13:00',
    'Apartment',
    'Noah Taylor',
    'Use entry phone 42.',
  ],
  [
    '5',
    '6 Cedar Mews',
    'London, SW11 2DT',
    '2026-11-16T09:30',
    'Townhouse',
    'Mia Wilson',
    'Call upon arrival.',
  ],
  [
    '6',
    '91 Park View',
    'London, E2 9LX',
    '2026-11-17T14:00',
    'Detached house',
    'James Cooper',
    'Access via front entrance.',
  ],
].map(([id, address, city, date, type, contact, access]) => ({
  id,
  address,
  city,
  date,
  type,
  contact,
  access,
}));

export function blankInspection(jobId: string): Inspection {
  const now = new Date().toISOString();
  return {
    jobId,
    inspector: 'Alex Morgan',
    started: now,
    updated: now,
    answers: Object.fromEntries(sections.map((s) => [s, { condition: '', notes: '' }])),
    summary: '',
    followup: '',
    photos: [],
  };
}

export function validate(i: Inspection): string[] {
  return sections.flatMap((s) => {
    const a = i.answers[s];
    if (!a?.condition) {
      return [`${s}: choose a condition`];
    }

    if (['Needs attention', 'Urgent'].includes(a.condition) && !a.notes.trim()) {
      return [`${s}: add a note explaining the issue`];
    }

    return [];
  });
}

export function status(i?: Inspection) {
  return i?.completed ? 'Completed' : i ? 'In progress' : 'Scheduled';
}

export function isAppointmentToday(date: string, today = new Date()): boolean {
  return date.slice(0, 10) === localCalendarDate(today);
}

export function isAppointmentThisWeek(date: string, today = new Date()): boolean {
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  monday.setDate(monday.getDate() - daysSinceMonday);

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  const appointmentDate = date.slice(0, 10);

  return (
    appointmentDate >= localCalendarDate(monday) && appointmentDate <= localCalendarDate(sunday)
  );
}

function localCalendarDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

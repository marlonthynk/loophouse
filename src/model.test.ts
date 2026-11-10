import { describe, it, expect } from 'vitest';
import {
  blankInspection,
  sections,
  validate,
  status,
  isAppointmentToday,
  isAppointmentThisWeek,
} from './model';

describe('inspection rules', () => {
  it('requires a condition for each section and notes for issues', () => {
    const i = blankInspection('1');

    expect(validate(i)).toHaveLength(6);
    sections.forEach((s) => {
      i.answers[s].condition = 'Good';
    });
    i.answers.Kitchen.condition = 'Urgent';

    expect(validate(i)).toEqual(['Kitchen: add a note explaining the issue']);
    i.answers.Kitchen.notes = 'Leak';

    expect(validate(i)).toEqual([]);
  });

  it('derives the lifecycle from the inspection', () => {
    const i = blankInspection('1');
    expect(status()).toBe('Scheduled');
    expect(status(i)).toBe('In progress');
    i.completed = '2026-11-10';
    expect(status(i)).toBe('Completed');
  });

  it('matches appointments against the current local calendar date', () => {
    const today = new Date(2026, 10, 10, 23, 30);

    expect(isAppointmentToday('2026-11-10T09:00', today)).toBe(true);
    expect(isAppointmentToday('2026-11-11T09:00', today)).toBe(false);
  });

  it('matches appointments from Monday through Sunday of the current local week', () => {
    const tuesday = new Date(2026, 10, 10, 23, 30);

    expect(isAppointmentThisWeek('2026-11-09T09:00', tuesday)).toBe(true);
    expect(isAppointmentThisWeek('2026-11-15T18:00', tuesday)).toBe(true);
    expect(isAppointmentThisWeek('2026-11-08T18:00', tuesday)).toBe(false);
    expect(isAppointmentThisWeek('2026-11-16T09:00', tuesday)).toBe(false);
  });

  it('treats Sunday as the final day of its week', () => {
    const sunday = new Date(2026, 10, 15, 12);

    expect(isAppointmentThisWeek('2026-11-09T09:00', sunday)).toBe(true);
    expect(isAppointmentThisWeek('2026-11-15T18:00', sunday)).toBe(true);
    expect(isAppointmentThisWeek('2026-11-16T09:00', sunday)).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import { blankInspection, sections, validate, status } from './model';

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
});

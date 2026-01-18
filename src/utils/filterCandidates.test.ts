import { describe, it, expect } from 'vitest';
import { filterCandidates, type Candidate, type FilterState } from './filterCandidates';

const CANDIDATES: Candidate[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@test.com', position: 'Frontend Developer', status: 'New', experience: 1 },
  { id: 2, name: 'Bob Smith', email: 'bob@test.com', position: 'Backend Developer', status: 'Interview', experience: 3 },
  { id: 3, name: 'Charlie Green', email: 'charlie@test.com', position: 'Designer', status: 'Rejected', experience: 5 },
  { id: 4, name: 'Alicia Stone', email: 'alicia@test.com', position: 'Frontend Developer', status: 'Hired', experience: 4 },
];

const emptyFilters: FilterState = { name: '', position: '', status: '', experience: '' };

// Unit tests validate filtering rules: partial name match, exact filters, AND combinations and edge cases.
describe('filterCandidates', () => {
  it('returns all candidates when filters are empty', () => {
    const result = filterCandidates(CANDIDATES, emptyFilters);
    expect(result).toHaveLength(4);
  });

  it('filters by name (case-insensitive, partial match)', () => {
    const result = filterCandidates(CANDIDATES, { ...emptyFilters, name: 'ali' });
    expect(result.map((c) => c.id)).toEqual([1, 4]);
  });

  it('filters by position when provided', () => {
    const result = filterCandidates(CANDIDATES, { ...emptyFilters, position: 'Backend Developer' });
    expect(result.map((c) => c.id)).toEqual([2]);
  });

  it('filters by status when provided', () => {
    const result = filterCandidates(CANDIDATES, { ...emptyFilters, status: 'Rejected' });
    expect(result.map((c) => c.id)).toEqual([3]);
  });

  it('filters by exact experience (number)', () => {
    const result = filterCandidates(CANDIDATES, { ...emptyFilters, experience: '4' });
    expect(result.map((c) => c.id)).toEqual([4]);
  });

  it('ignores invalid experience input (NaN)', () => {
    const result = filterCandidates(CANDIDATES, { ...emptyFilters, experience: 'abc' });
    expect(result).toHaveLength(4);
  });

  it('combines multiple filters with AND', () => {
    const result = filterCandidates(CANDIDATES, {
      name: 'ali',
      position: 'Frontend Developer',
      status: 'Hired',
      experience: '4',
    });
    expect(result.map((c) => c.id)).toEqual([4]);
  });

  it('trims name input', () => {
    const result = filterCandidates(CANDIDATES, { ...emptyFilters, name: '  bob  ' });
    expect(result.map((c) => c.id)).toEqual([2]);
  });
});

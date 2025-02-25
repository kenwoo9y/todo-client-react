import { describe, it, expect } from 'vitest';
import { formatDateTime } from './dateUtils';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const originalDateTime = '2021-01-01T00:00:00.000Z';
    const formattedDate = formatDateTime(originalDateTime);
    expect(formattedDate).toBe('2021-01-01 09:00');
  });

  it('should return empty string if originalDateTime is null', () => {
    const formattedDate = formatDateTime(null);
    expect(formattedDate).toBe('');
  });

  it('should return empty string if originalDateTime is undefined', () => {
    const formattedDate = formatDateTime(undefined);
    expect(formattedDate).toBe('');
  });

  it('should return empty string if originalDateTime is empty string', () => {
    const formattedDate = formatDateTime('');
    expect(formattedDate).toBe('');
  });
});

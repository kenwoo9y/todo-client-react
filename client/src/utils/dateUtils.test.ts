import { describe, it, expect } from 'vitest';
import { formatDateTime } from './dateUtils';

describe('formatDateTime', () => {
  it('should format date correctly', () => {
    const originalDateTime = '2021-01-01T00:00:00.000';
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

  it('should handle date crossing midnight in JST', () => {
    const originalDateTime = '2021-01-01T14:59:00.000'; // UTC 14:59 = JST 23:59
    const formattedDate = formatDateTime(originalDateTime);
    expect(formattedDate).toBe('2021-01-01 23:59');

    const crossingDateTime = '2021-01-01T15:00:00.000'; // UTC 15:00 = JST 00:00 (next day)
    const crossingFormattedDate = formatDateTime(crossingDateTime);
    expect(crossingFormattedDate).toBe('2021-01-02 00:00');
  });
});

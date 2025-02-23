import { describe, it, expect } from 'vitest';
import { fetchTasksSelector } from './selector';

describe('fetchTasksSelector', () => {
  it('レスポンスデータをそのまま返すこと', () => {
    const mockData = [
      {
        id: 1,
        title: 'テストタスク1',
        description: 'テストの説明1',
        due_date: '2024-03-20',
        status: 'Doing',
        owner_id: 1,
        created_at: '2024-03-19T10:00:00Z',
        updated_at: '2024-03-19T10:00:00Z',
      },
      {
        id: 2,
        title: 'テストタスク2',
        description: 'テストの説明2',
        due_date: '2024-03-21',
        status: 'Done',
        owner_id: 2,
        created_at: '2024-03-19T10:00:00Z',
        updated_at: '2024-03-19T10:00:00Z',
      },
    ];

    const result = fetchTasksSelector(mockData);

    expect(result).toEqual(mockData);
  });
});

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

"use client"

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    // Use useState to ensure the client is only created once per component lifecycle
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
                refetchOnWindowFocus: false, // Optional: disable refetching on window focus
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
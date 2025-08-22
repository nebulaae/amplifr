import { api } from '@/lib/axios';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

export interface Vacancy {
    id: number;
    channel: string;
    text: string;
    url: string;
    position?: string;
    employmentType?: string;
    salary?: string;
    sphere?: string;
    createdAt: string;
}

export interface VacancyFilters {
    type?: string[];
    experience?: string[];
    sphere?: string[];
    search?: string;
    salary?: string[];      // 👈 added
    freshness?: string[];   // 👈 added
}

export interface VacancyResponse {
    vacancies: Vacancy[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalVacancies: number;
        hasMore: boolean;
    };
}

export function useVacancies(filters: VacancyFilters) {
    return useInfiniteQuery({
        queryKey: ['vacancies', filters],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams();
            params.append('page', pageParam.toString());
            params.append('limit', '20');

            if (filters.search) params.append('search', filters.search);

            if (filters.type) filters.type.forEach(v => params.append('type', v));
            if (filters.experience) filters.experience.forEach(v => params.append('experience', v));
            if (filters.sphere) filters.sphere.forEach(v => params.append('sphere', v));

            // 👇 add missing salary + freshness
            if (filters.salary) filters.salary.forEach(v => params.append('salary', v));
            if (filters.freshness) filters.freshness.forEach(v => params.append('freshness', v));

            const res = await api.get<VacancyResponse>('/', { params });
            return res.data;
        },
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasMore
                ? lastPage.pagination.currentPage + 1
                : undefined;
        },
        initialPageParam: 1,
    });
}

export function useParseVacancies() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const res = await api.post('/parse');
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vacancies'] });
        },
    });
}
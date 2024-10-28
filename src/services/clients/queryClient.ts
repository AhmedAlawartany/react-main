import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import { RetryOptions, StaleTime } from '@/enums/clientEnum';

const defaultQueryFnOptions: DefaultOptions = {
    queries: {
        retry: (failureCount: number, error: any): boolean => {
            if (error.response?.status === 404) return false;
            return failureCount < RetryOptions.TWICE;
        },
        staleTime: StaleTime.SHORT,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: false,
    },
    mutations: {
        retry: (failureCount: number, error: any): boolean => {
            if (error.response?.status === 409) return false;
            return failureCount < RetryOptions.ONCE;
        },
    },
};

const queryClient = new QueryClient({ defaultOptions: defaultQueryFnOptions });

export default queryClient;

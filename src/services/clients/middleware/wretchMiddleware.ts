import { FetchLike, WretchOptions, WretchResponse } from 'wretch';
import useAuthStore from '@/store/authStore';

const wretchAuthMiddleware = (next: FetchLike) => {
    return async (url: string, opts: WretchOptions): Promise<WretchResponse> => {
        const { accessToken } = useAuthStore.getState();

        if (accessToken) {
            opts.headers = {
                ...opts.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        const result = await next(url, opts);
        return result;
    };
};

export default wretchAuthMiddleware;

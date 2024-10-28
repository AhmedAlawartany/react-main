import wretch, { WretchError } from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import wretchAuthMiddleware from './middleware/wretchMiddleware';

const baseUrl = import.meta.env.VITE_APP_BACKEND_API_ENDPOINT || '';

const api = wretch()
    .url(baseUrl)
    .addon(QueryStringAddon)
    .middlewares([wretchAuthMiddleware])
    .catcher(404, async () => {
        return Promise.reject({
            message: 'Resource not found',
            status: 404,
        });
    })
    .catcher(500, async () => {
        return Promise.reject({
            message: 'Internal server error',
            status: 500,
        });
    })

    .catcherFallback(async (err: WretchError) => {
        try {
            const parsedError = JSON.parse(err.message);
            const errorMessage = parsedError.error || 'An unexpected error occurred';

            return Promise.reject({
                message: errorMessage,
                status: err.status || 'Unknown Status',
            });
        } catch (jsonError) {
            return Promise.reject({
                message: 'An unexpected error occurred',
                status: err.status || 'Unknown Status',
            });
        }
    });

export default api;

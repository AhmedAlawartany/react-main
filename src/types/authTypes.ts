import { RouteNames } from '@/enums/routesEnum';

export type DoneFunction = (
    error?: any,
    redirect?: { name: RouteNames; params?: any; path?: string; meta?: any },
) => void;

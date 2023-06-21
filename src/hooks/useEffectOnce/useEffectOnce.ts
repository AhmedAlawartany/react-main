import { useEffect } from 'react';

export const useEffectOnce = (cb: any) => {
    useEffect(cb, []);
};

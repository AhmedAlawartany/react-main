import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export const ScrollTop = () => {
    const { scrollTopTrigger } = useSelector((state: any) => state.scrollTop);
    const ref = useRef<any>();
    useEffect(() => {
        if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [scrollTopTrigger]);

    return <div ref={ref}></div>;
};

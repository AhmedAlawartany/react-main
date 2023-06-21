import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

interface useSearchProps {
    action: any;
    wait?: number;
}

export const useSearch = ({ action, wait = 1000 }: useSearchProps) => {
    const dispatch = useDispatch();
    const searchAction = useCallback(
        debounce((...rest) => action.bind(this, ...rest)(), wait),
        [],
    );
    const searchDispatchAction = useCallback(
        debounce((rest) => dispatch(action().bind(this, { ...rest })()), 500),
        [],
    );

    return { searchAction, searchDispatchAction };
};

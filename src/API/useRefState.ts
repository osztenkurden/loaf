import React, { useCallback, useRef, useState } from 'react';

const useStateRef = <T>(defaultValue: T): [T, (value: T) => void, React.MutableRefObject<T>] => {
    const [ state, setState ] = useState<T>(defaultValue);
    const ref = useRef(state);

    const dispatch = useCallback((value: T) => {
        ref.current = typeof value === "function" ? value(ref.current) : value;

        setState(ref.current);
    }, []);

    return [ state, dispatch, ref ];
}

export default useStateRef;
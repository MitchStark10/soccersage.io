import React, { useEffect } from 'react';

import { store } from 'src/store';
import { uiReducerSlice } from 'src/store/reducers/uiReducer';

export type ClickOutsideRef = React.RefObject<HTMLElement | SVGSVGElement>;

export const useClickOutside = (
    refs: Array<ClickOutsideRef>,
    handler: (e: MouseEvent) => void
) => {
    useEffect(() => {
        store.dispatch(uiReducerSlice.actions.setOverlay(true));
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            let isOutside = true;

            refs.forEach((ref) => {
                if (ref.current && ref.current.contains(event.target)) {
                    isOutside = false;
                }
            });

            if (isOutside) {
                store.dispatch(uiReducerSlice.actions.setOverlay(false));
                handler(event);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            store.dispatch(uiReducerSlice.actions.setOverlay(false));
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, handler]);
};

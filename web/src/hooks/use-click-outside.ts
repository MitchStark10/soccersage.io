import React, { useEffect } from 'react';

export type ClickOutsideRef = React.RefObject<HTMLElement | SVGSVGElement>;

export const useClickOutside = (
    refs: Array<ClickOutsideRef>,
    handler: (e: MouseEvent) => void
) => {
    useEffect(() => {
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
                handler(event);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, handler]);
};

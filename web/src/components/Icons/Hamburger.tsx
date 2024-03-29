import { forwardRef } from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
    width?: string;
    height?: string;
    className?: string;
};

export const Hamburger = forwardRef<SVGSVGElement, Props>(
    ({ className, ...rest }, ref) => {
        return (
            <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className={className}
                ref={ref}
                {...rest}
            >
                <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z" />
            </svg>
        );
    }
);

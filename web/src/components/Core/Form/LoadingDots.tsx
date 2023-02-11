import React from 'react';

import { ClassNameProps } from 'types/class-name-props';

const LoadingDots: React.VFC<ClassNameProps> = ({ className = 'bg-white' }) => {
    return (
        <div className="bouncing-loader">
            {Array(3)
                .fill('')
                .map((_, index) => (
                    <div key={index} className={className}></div>
                ))}
        </div>
    );
};

export default LoadingDots;

import classNames from 'classnames';

import { Text } from 'src/components/Core/Text/Text';

export interface PillProps {
    children: React.ReactNode;
    variant: 'success' | 'failure' | 'info';
    className?: string;
}

// TODO: Add tests to ensure that the correct colors are applied to each variant
export const Pill: React.FC<PillProps> = ({ children, variant, className }) => {
    return (
        <Text
            className={classNames(
                'rounded-full w-fit px-2 border font-bold',
                {
                    'border-success-dark text-success-dark bg-success-background':
                        variant === 'success',
                    'border-info-dark text-info-dark bg-info-background':
                        variant === 'info',
                    // TODO: Add the failure variant
                    'border-error-red text-error-red bg-white':
                        variant === 'failure',
                },
                className
            )}
            textAlign="center"
            variant="caption"
        >
            {children}
        </Text>
    );
};
